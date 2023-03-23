import React, { useState, useEffect } from 'react';
import LoginContext from './login-context';

const LoginProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const loginFromStorage = localStorage.getItem('loggedIn');
    setIsLoggedIn(loginFromStorage === 'Yes' ? true : false);
  }, []);

  const loginHandler = () => {
    localStorage.setItem('loggedIn', 'Yes');
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
  };

  const loginContext = {
    loginStatus: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <LoginContext.Provider value={loginContext}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
