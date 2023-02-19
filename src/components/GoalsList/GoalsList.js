import React from 'react';
import Goal from './Goal';
import styles from './GoalList.module.css';

const GoalsList = (props) => {
  return (
    <ul className={styles['goal-list']}>
      {props.goals.map((goal) => (
        <Goal title={goal.title} time={goal.time} key={goal.id} />
      ))}
    </ul>
  );
};

export default GoalsList;
