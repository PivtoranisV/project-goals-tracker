import React from 'react';

import UserInputForm from './UserInputForm';
import useHttp from '../../hooks/use-http';
import { urls } from '../../urls/urls';

const { activeUrl } = urls;

const UserInput = (props) => {
  const { isLoading, error, sendRequest: sendNewGoal } = useHttp();

  const enterGoalHandler = async (
    enteredTitle,
    enteredCategory,
    enteredTime
  ) => {
    const createGoal = (goalData) => {
      const generatedId = goalData.name;
      const newGoal = {
        id: generatedId,
        title: enteredTitle,
        category: enteredCategory,
        time: new Date(enteredTime).getTime(),
      };

      props.onAddGoal(newGoal);
    };

    sendNewGoal(
      {
        url: activeUrl,
        method: 'POST',
        body: {
          title: enteredTitle,
          category: enteredCategory,
          time: new Date(enteredTime).getTime(),
        },
        headers: {
          'Content-Type': 'application/json',
        },
      },
      createGoal
    );
  };

  return (
    <React.Fragment>
      <UserInputForm
        onEnterGoal={enterGoalHandler}
        loading={isLoading}
        error={error}
      />
    </React.Fragment>
  );
};

export default UserInput;
