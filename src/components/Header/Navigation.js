import React from 'react';
import Button from '../UI/Button';
import styles from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <nav className={styles.nav}>
      <ul>
        {props.loginStatus && (
          <li>
            <a href="/">Achieved Goals</a>
          </li>
        )}
        {props.loginStatus && (
          <li>
            <a href="/">Failed Goals</a>
          </li>
        )}
        {props.loginStatus && (
          <li>
            <Button onClick={props.onLogout}>Logout</Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
