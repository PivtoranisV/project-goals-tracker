import React from 'react';
import Button from '../UI/Button';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="/">Achieved Goals</a>
        </li>
        <li>
          <a href="/">Failed Goals</a>
        </li>
        <li>
          <Button>Logout</Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
