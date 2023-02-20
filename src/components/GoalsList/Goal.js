import React from 'react';
import Countdown from './Countdown';
import styles from './Goal.module.css';

const Goal = (props) => {
  return (
    <li className={styles['goal-items']}>
      <span className={styles['goal-items__title']}>{props.title}</span>
      <span className={styles['goal-items__time']}>
        <Countdown deadline={props.time} />
      </span>
    </li>
  );
};

export default Goal;
