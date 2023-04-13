import React from 'react';

import UserInputForm from './UserInputForm';

const URL =
  'https://goals-tracker-25f88-default-rtdb.firebaseio.com/activeGoals.json';

const UserInput = (props) => {
  const enterGoalHandler = async (
    enteredTitle,
    enteredCategory,
    enteredTime
  ) => {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        title: enteredTitle,
        category: enteredCategory,
        time: new Date(enteredTime).getTime(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const generatedId = data.name;
    const newGoal = {
      id: generatedId,
      title: enteredTitle,
      category: enteredCategory,
      time: new Date(enteredTime).getTime(),
    };

    props.onAddGoal(newGoal);
  };

  return (
    <React.Fragment>
      <UserInputForm onEnterGoal={enterGoalHandler} />
    </React.Fragment>
  );
};

export default UserInput;
