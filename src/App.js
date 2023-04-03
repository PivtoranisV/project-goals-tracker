import React, { useState, useContext } from 'react';

import GoalsList from './components/GoalsList/GoalsList';
import Card from './components/UI/Card';
import UserInput from './components/UserInputs/UserInput';
import AchievedGoalsList from './components/ArchivedGoals/AchievedGoalsList';
import FailedGoalsList from './components/ArchivedGoals/FailedGoalsList';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import LoginContext from './store/login-context';
import styles from './App.module.css';
import Space from './components/Space/Space';

const DUMMY_GOALS = [
  {
    id: 1,
    title: 'Complete 10 lectures from the course',
    category: 'Personal',
    time: new Date('April 30, 2023 13:00:00').getTime(),
  },
  {
    id: 2,
    title: 'Write LinkedIn post',
    category: 'Work',
    time: new Date('April 25, 2023 15:00:00').getTime(),
  },
];

const App = () => {
  const [activeGoals, setActiveGoals] = useState(DUMMY_GOALS);
  const [achievedGoals, setAchievedGoals] = useState([]);
  const [failedGoals, setFailedGoals] = useState([]);

  const ctx = useContext(LoginContext);

  const addGoalHandler = (goal, category, time) => {
    setActiveGoals((prevInfo) => {
      return [
        ...prevInfo,
        {
          id: Math.random().toString(),
          title: goal,
          category: category,
          time: new Date(time).getTime(),
        },
      ];
    });
  };

  const completeGoalHandler = (goal) => {
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
    setActiveGoals((prevInfo) => {
      return prevInfo.filter((el) => el.id !== goal.completedId);
    });
  };

  const failedGoalHandler = (id) => {
    const goalToRemove = activeGoals.find((goal) => goal.id === id);
    setActiveGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    setFailedGoals((prevFailedGoals) => [...prevFailedGoals, goalToRemove]);
  };

  if (!ctx.loginStatus) {
    return <Login />;
  }

  return (
    <React.Fragment>
      <Header />
      <main>
        <UserInput onAddGoal={addGoalHandler} />
        {activeGoals.length !== 0 ? (
          <GoalsList
            goals={activeGoals}
            onCompleteGoal={completeGoalHandler}
            onFailedGoal={failedGoalHandler}
          />
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
        <FailedGoalsList failedGoals={failedGoals} />
        <Space />
      </main>
    </React.Fragment>
  );
};

export default App;
