import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Validation from './RegisterValidation';
import axios from 'axios';

import viewIcon from './Assets/view.png';
import hideIcon from './Assets/hide.png';
import userIcon from './Assets/person.png';
import emailIcon from './Assets/email.png';
import passwordIcon from './Assets/password.png';

function Register() {

  const [values, setValues] =useState({
    name: '',
    email:'',
    password:'',
  });

  const navigate=useNavigate();
  const [errors, setErrors] =useState({});
  const [authenticated, setAuthenticated] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInput = (event) =>{
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  };

  const handleSubmit=(event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (Object.keys(Validation(values)).length===0){
        setAuthenticated(true);
        axios.post('http://localhost:3001/register', values)
        .then (res => {
          navigate('/login');
        })
        .catch(err => console.log(err));
    }
};
  return (
    <div className='page'>
         <div className="title">PlanPal</div>
    <div className='container'>
      <div className='head'>
        <div className='text'>Register</div>
        <div className='underline'></div>
      </div>
      <form action='' onSubmit={handleSubmit} >
      <div className='inputs'>
        <div className='input'>
            <img src={userIcon} alt=''/>
            <input type='text' placeholder='Name'name='name' onChange={handleInput}/>
        </div>
        {errors.name && <span className='error'> {errors.name}</span>}
        <div className='input'>
          <img src={emailIcon} alt=''/>
          <input type='email' placeholder='Email' name='email' onChange={handleInput}/>
        </div>
        {errors.email && <span className='error'> {errors.email}</span>}
        <div className='input'>
          <img src={passwordIcon} alt=''/>
            <input type={passwordVisible ? 'text' : 'password'} placeholder='Password' name='password' onChange={handleInput} />
              <button type="button" className="visibility-btn" onClick={togglePasswordVisibility}>
                <img src={passwordVisible ? viewIcon : hideIcon} alt='Toggle Visibility' />
              </button>
        </div>
        {errors.password && <span className='error'> {errors.password}</span>}

      </div>
      <p></p>
      <button type="submit" className='button'>Submit</button>
      </form>
      <p></p>
    </div>
    </div>
  );
}

export default Register