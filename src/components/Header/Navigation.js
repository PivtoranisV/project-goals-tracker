import React, { useContext } from 'react';
import LoginContext from '../../store/login-context';
import Button from '../UI/Button';
import styles from './Navigation.module.css';

const Navigation = (props) => {
  const ctx = useContext(LoginContext);

  return (
    <nav className={styles.nav}>
      <ul>
        {ctx.loginStatus && (
          <li>
            <a href="/">Achieved Goals</a>
          </li>
        )}
        {ctx.loginStatus && (
          <li>
            <a href="/">Failed Goals</a>
          </li>
        )}
        {ctx.loginStatus && (
          <li>
            <a href="/">Take a Brake</a>
          </li>
        )}
        {ctx.loginStatus && (
          <li>
            <Button onClick={ctx.logout}>Logout</Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
