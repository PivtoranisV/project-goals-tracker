import React from 'react';
import Filter from '../Filter/Filter';
import Card from '../UI/Card';
import Goal from './Goal';
import styles from './GoalList.module.css';

const GoalsList = (props) => {
  const clickedGoal = (title, id) => {
    props.onCompleteGoal({ competedGoal: title, completedId: id });
  };

  return (
    <Card>
      <Filter />
      <ul className={styles['goal-list']}>
        {props.goals.map((goal) => (
          <Goal
            title={goal.title}
            time={goal.time}
            category={goal.category}
            key={goal.id}
            id={goal.id}
            onClickGoal={clickedGoal}
          />
        ))}
      </ul>
    </Card>
  );
};

export default GoalsList;
