import React from 'react';
import styles from './FailedGoal.module.css';

const FailedGoal = (props) => {
  return (
    <li className={styles['goal-items']}>
      <span className={styles['goal-items__title']}>{props.title}</span>
    </li>
  );
};

export default FailedGoal;
