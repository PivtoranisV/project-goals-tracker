import React, { useState } from 'react';
import Header from '../Header/Header';
import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './Login.module.css';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length >= 7
    );
  };

  const emailValidation = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length >= 7 && enteredEmail.includes('@')
    );
  };

  const passwordValidation = () => {
    setPasswordIsValid(enteredPassword.length >= 7);
  };

  return (
    <React.Fragment>
      <Header />
      <Card>
        <form onSubmit={submitHandler}>
          <div
            className={`${styles.control} ${
              emailIsValid === false ? styles.invalid : ''
            }`}
          >
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={enteredEmail}
              onChange={emailHandler}
              onBlur={emailValidation}
            />
          </div>
          <div
            className={`${styles.control} ${
              passwordIsValid === false ? styles.invalid : ''
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={enteredPassword}
              onChange={passwordHandler}
              onBlur={passwordValidation}
            />
          </div>
          <div className={styles.actions}>
            <Button
              type="submit"
              disabled={!formIsValid}
              className={styles.btn}
            >
              Log In
            </Button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Login;
