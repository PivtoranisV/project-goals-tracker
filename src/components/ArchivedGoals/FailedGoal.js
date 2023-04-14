import React from 'react';
import styles from './FailedGoal.module.css';

const FailedGoal = (props) => {
  return (
    <li className={styles['failed-goal-items']}>
      <span className={styles['failed-goal-items__title']}>{props.title}</span>
      <span className={styles['failed-goal-items__date']}>
        Failed on <strong>{props.date}</strong>
      </span>
    </li>
  );
};

export default FailedGoal;
