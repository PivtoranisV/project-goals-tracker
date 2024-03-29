import React from 'react';
import Countdown from './Countdown';
import styles from './Goal.module.css';

const Goal = (props) => {
  const deleteHandler = () => {
    props.onClickGoal(props.title, props.id);
  };

  const failedGoalHandler = (title, id) => {
    props.onFailedGoal(title, id);
  };

  return (
    <li className={styles['goal-items']} onClick={deleteHandler}>
      <span className={styles['goal-items__category']}>
        {props.category} Goal
      </span>
      <div>
        <span className={styles['goal-items__title']}>{props.title}</span>
        <span>
          <Countdown
            title={props.title}
            deadline={props.time}
            id={props.id}
            onFailedGoal={failedGoalHandler}
          />
        </span>
      </div>
    </li>
  );
};

export default Goal;
