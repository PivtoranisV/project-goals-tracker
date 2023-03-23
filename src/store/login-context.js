import React from 'react';

const LoginContext = React.createContext({
  loginStatus: null,
  login: () => {},
  logout: () => {},
});

export default LoginContext;
