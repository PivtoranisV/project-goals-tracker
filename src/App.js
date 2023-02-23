import React, { useState } from 'react';

import ArchivedGoals from './components/ArchivedGoals/ArchivedGoals';
import GoalsList from './components/GoalsList/GoalsList';
import UserInput from './components/UserInputs/UserInput';

const DUMMY_GOALS = [
  {
    id: 1,
    title: 'Complete 10 lectures from the course',
    time: new Date('March 10, 2023 13:00:00').getTime(),
  },
  {
    id: 2,
    title: 'Write LinkedIn post',
    time: new Date('March 15, 2023 15:00:00').getTime(),
  },
];

function App() {
  const [enteredInfo, setEnteredInfo] = useState(DUMMY_GOALS);

  const addGoalHandler = (goal, time) => {
    setEnteredInfo((prevInfo) => {
      return [
        ...prevInfo,
        {
          id: Math.random().toString(),
          title: goal,
          time: new Date(time).getTime(),
        },
      ];
    });
  };

  const competeGoalHandler = (goal) => {
    setEnteredInfo((prevInfo) => {
      return prevInfo.filter((el) => el.id !== goal.completedId);
    });
  };

  return (
    <div>
      <UserInput onAddGoal={addGoalHandler} />
      <GoalsList goals={enteredInfo} onCompleteGoal={competeGoalHandler} />
      <ArchivedGoals />
    </div>
  );
}

export default App;
