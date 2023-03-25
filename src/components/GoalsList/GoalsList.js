import React, { useState } from 'react';
import Filter from '../Filter/Filter';
import Card from '../UI/Card';
import Goal from './Goal';
import styles from './GoalList.module.css';

const GoalsList = (props) => {
  const [filterSelection, setFilterSelection] = useState('');

  const clickedGoal = (title, id) => {
    props.onCompleteGoal({ competedGoal: title, completedId: id });
  };

  const filterHandler = (filterSelection) => {
    setFilterSelection(filterSelection);
  };

  const filteredList = props.goals.filter((goal) => {
    if (filterSelection === '' || filterSelection === 'All') {
      return true;
    } else {
      return goal.category === filterSelection;
    }
  });

  return (
    <Card>
      <Filter onFilter={filterHandler} />
      <ul className={styles['goal-list']}>
        {filteredList.map((goal) => (
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
