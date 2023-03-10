import React from 'react';
import styles from './Header.module.css';
import Navigation from './Navigation';
import goalImage from '../../assets/goal-ladder-4.png';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Goals Tracker</h1>
        <Navigation onLogout={props.onLogout} />
      </header>
      <div className={styles['main-image']}>
        <img src={goalImage} alt="Climbing to achieve a goal" />
      </div>
    </React.Fragment>
  );
};

export default Header;
