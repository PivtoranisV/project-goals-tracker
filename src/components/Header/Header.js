import React from 'react';
import styles from './Header.module.css';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Goals Tracker</h1>
      <Navigation />
    </header>
  );
};

export default Header;
