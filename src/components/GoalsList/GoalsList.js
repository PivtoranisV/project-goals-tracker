import React, { useState } from 'react';
import Filter from '../Filter/Filter';
import Card from '../UI/Card';
import Goal from './Goal';
import styles from './GoalList.module.css';

import useHttp from '../../hooks/use-http';

const completedUrl =
  'https://goals-tracker-25f88-default-rtdb.firebaseio.com/completedGoals.json';
const failedUrl =
  'https://goals-tracker-25f88-default-rtdb.firebaseio.com/failedGoals.json';

const GoalsList = (props) => {
  const [filterSelection, setFilterSelection] = useState('');

  const {
    isLoading: completedLoading,
    error: completedError,
    sendRequest: sendCompletedGoal,
  } = useHttp();

  const { sendRequest: sendFailedGoal } = useHttp();

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
        url: completedUrl,
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

  const failedGoalHandler = (title, id) => {
    const createFailedGoal = () => {
      const newFailedGoal = {
        id: id,
        title: title,
        date: new Date().toDateString(),
      };
      props.onFailedGoal(newFailedGoal);
    };

    sendFailedGoal(
      {
        url: failedUrl,
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
      createFailedGoal
    );
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
          loading={completedLoading}
          error={completedError}
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
