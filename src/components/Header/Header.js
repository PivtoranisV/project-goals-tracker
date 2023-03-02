import React from 'react';
import styles from './Header.module.css';
import Navigation from './Navigation';

const Header = (props) => {
  return (
    <header className={styles.header}>
      <h1>Goals Tracker</h1>
      <Navigation loginStatus={props.loginStatus} onLogout={props.onLogout} />
    </header>
  );
};

export default Header;
