import React from 'react';
import styles from './FailedGoal.module.css';

const FailedGoal = (props) => {
  return <li className={styles['goal-items']}>{props.title}</li>;
};

export default FailedGoal;
