import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Navigation from './Navigation';

const Header = () => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>
          <Link to="/">Goals Tracker</Link>
        </h1>
        <Navigation />
      </header>
    </React.Fragment>
  );
};

export default Header;
