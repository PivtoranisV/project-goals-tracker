import React, { useState } from 'react';
import Header from '../Header/Header';
import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './Login.module.css';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  return (
    <React.Fragment>
      <Header />
      <Card>
        <form onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={enteredEmail}
              onChange={emailHandler}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={enteredPassword}
              onChange={passwordHandler}
            />
          </div>
          <div className={styles.actions}>
            <Button>Log In</Button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Login;
