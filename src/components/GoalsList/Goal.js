import React from 'react';
import Countdown from './Countdown';
import styles from './Goal.module.css';

const Goal = (props) => {
  const deleteHandler = () => {
    props.onClickGoal(props.title, props.id);
  };

  const failedGoalHandler = (id) => {
    props.onFailedGoal(id);
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
