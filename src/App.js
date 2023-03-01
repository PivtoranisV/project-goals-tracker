import React, { useState } from 'react';

import GoalsList from './components/GoalsList/GoalsList';
import Card from './components/UI/Card';
import UserInput from './components/UserInputs/UserInput';
import AchievedGoalsList from './components/ArchivedGoals/AchievedGoalsList';
import FailedGoalsList from './components/ArchivedGoals/FailedGoalsList';
import Login from './components/Login/Login';

import styles from './App.module.css';
import Header from './components/Header/Header';

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
  const [achievedGoals, setAchievedGoals] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    setAchievedGoals((prevAchievedGoals) => {
      return [
        ...prevAchievedGoals,
        {
          title: goal.competedGoal,
          id: goal.completedId,
          date: new Date().toDateString(),
        },
      ];
    });
    setEnteredInfo((prevInfo) => {
      return prevInfo.filter((el) => el.id !== goal.completedId);
    });
  };

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <React.Fragment>
      <Header />
      <main>
        <UserInput onAddGoal={addGoalHandler} />
        {enteredInfo.length !== 0 ? (
          <GoalsList goals={enteredInfo} onCompleteGoal={competeGoalHandler} />
        ) : (
          <Card>
            <div className={styles.starter}>
              <h3>
                Every big achievement started with a small goal, but you do not
                have one, <strong>please add!</strong>
              </h3>
            </div>
          </Card>
        )}
        <AchievedGoalsList achievedGoals={achievedGoals} />
        <FailedGoalsList />
      </main>
    </React.Fragment>
  );
}

export default App;
