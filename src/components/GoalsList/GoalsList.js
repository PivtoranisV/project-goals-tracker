import React, { useState } from 'react';
import Filter from '../Filter/Filter';
import Card from '../UI/Card';
import Goal from './Goal';
import styles from './GoalList.module.css';

import useHttp from '../../hooks/use-http';

const URL =
  'https://goals-tracker-25f88-default-rtdb.firebaseio.com/completedGoals.json';

const GoalsList = (props) => {
  const [filterSelection, setFilterSelection] = useState('');

  const { isLoading, error, sendRequest: sendCompletedGoal } = useHttp();

  const clickedGoal = (title, id) => {
    const createCompletedGoal = () => {
      const newCompletedGoal = {
        id: id,
        title: title,
        date: new Date().toDateString(),
      };
      props.onCompleteGoal(newCompletedGoal);
    };

    sendCompletedGoal(
      {
        url: URL,
        method: 'POST',
        body: {
          id: id,
          title: title,
          date: new Date().toDateString(),
        },
        headers: {
          'Content-Type': 'application/json',
        },
      },
      createCompletedGoal
    );
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
          loading={isLoading}
          error={error}
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
