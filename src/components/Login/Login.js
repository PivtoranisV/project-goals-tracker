import React, { useState, useEffect, useReducer, useContext } from 'react';
import LoginContext from '../../store/login-context';
import Header from '../Header/Header';
import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './Login.module.css';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length >= 7 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length >= 7 };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const ctx = useContext(LoginContext);

  useEffect(() => {
    setFormIsValid(emailState.isValid && passwordState.isValid);
  }, [emailState.isValid, passwordState.isValid]);

  const emailHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const emailValidation = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const passwordHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordValidation = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.login(emailState.value, passwordState.value);
  };

  return (
    <React.Fragment>
      <Header />
      <Card>
        <form onSubmit={submitHandler}>
          <div
            className={`${styles.control} ${
              emailState.isValid === false ? styles.invalid : ''
            }`}
          >
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={emailState.value}
              onChange={emailHandler}
              onBlur={emailValidation}
            />
          </div>
          <div
            className={`${styles.control} ${
              passwordState.isValid === false ? styles.invalid : ''
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={passwordState.value}
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
