import React from 'react';
import styles from './AchievedGoal.module.css';

const AchievedGoal = (props) => {
  return (
    <li className={styles['achieved-goal-items']}>
      <span className={styles['achieved-goal-items__title']}>
        {props.title}
      </span>
      <span className={styles['achieved-goal-items__date']}>
        Completed on <strong>{props.date}</strong>
      </span>
    </li>
  );
};

export default AchievedGoal;
