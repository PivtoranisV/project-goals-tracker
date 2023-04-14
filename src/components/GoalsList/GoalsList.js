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

  const failedGoalHandler = (id) => {
    props.onFailedGoal(id);
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

  let content = (
    <ul className={styles['goal-list']}>
      {filteredList.map((goal) => (
        <Goal
          title={goal.title}
          time={goal.time}
          category={goal.category}
          key={goal.id}
          id={goal.id}
          onClickGoal={clickedGoal}
          onFailedGoal={failedGoalHandler}
        />
      ))}
    </ul>
  );
  if (props.loading) {
    content = <h2>Loading Goals...</h2>;
  }
  if (props.error) {
    content = <h2>{props.error}</h2>;
  }

  return (
    <Card>
      <Filter onFilter={filterHandler} />
      {content}
    </Card>
  );
};

export default GoalsList;
