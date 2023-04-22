import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="/achieved">Achieved Goals</Link>
          </li>
        )}
        {ctx.loginStatus && (
          <li>
            <Link to="/failed">Failed Goals</Link>
          </li>
        )}
        {ctx.loginStatus && (
          <li>
            <Link to="/space">Take a Brake</Link>
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
