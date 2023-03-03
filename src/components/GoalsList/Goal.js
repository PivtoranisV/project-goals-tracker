import React from 'react';
import Countdown from './Countdown';
import styles from './Goal.module.css';

const Goal = (props) => {
  const deleteHandler = () => {
    props.onClickGoal(props.title, props.id);
  };

  return (
    <li className={styles['goal-items']} onClick={deleteHandler}>
      <span className={styles['goal-items__title']}>{props.title}</span>
      <span>
        <Countdown deadline={props.time} />
      </span>
    </li>
  );
};

export default Goal;
