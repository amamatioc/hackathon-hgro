function Validation(values){
    let errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (!values.email) {
        errors.email = "Field can't be empty!";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Incorrect email!";
    }

    if (!values.password) {
        errors.password = "Field can't be empty!";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Email and/or password is incorrect!";
    }
    return errors;
}

export default Validation;
