import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Validation from './LoginValidation';

import emailIcon from './Assets/email.png';
import passwordIcon from './Assets/password.png';
import viewIcon from './Assets/view.png';
import hideIcon from './Assets/hide.png';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (Object.keys(Validation(values)).length === 0) {
      setAuthenticated(true);
      axios.post('http://localhost:3001/login', values)
        .then(res => {
          if (res.data === "Success") {
            navigate('/home');
          } else {
            alert("Profile not found");
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='page'>
      <div className="title">PlanPal</div>
      <div className='container'>
        <div className='head'>
          <div className='text'>Login</div>
          <div className='underline'></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='inputs'>
            <div className='input'>
              <img src={emailIcon} alt='' />
              <input type='email' placeholder='Email' name='email' onChange={handleInput} />
            </div>
            {errors.email && <span className='error'>{errors.email}</span>}
            <div className='input'>
              <img src={passwordIcon} alt='' />
              <input type={passwordVisible ? 'text' : 'password'} placeholder='Password' name='password' onChange={handleInput} />
              <button type="button" className="visibility-btn" onClick={togglePasswordVisibility}>
                <img src={passwordVisible ? viewIcon : hideIcon} alt='Toggle Visibility' />
              </button>
            </div>
            {errors.password && <span className='error'>{errors.password}</span>}
          </div>
          <p></p>
          <button type="submit" className='button'>Login</button>
        </form> 
        
        <Link to="/register">
          <span className="register-link">
            Don't have an account? Click here to create one!
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
