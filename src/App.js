import React, { useState, useEffect, useContext } from 'react';

import GoalsList from './components/GoalsList/GoalsList';
import Card from './components/UI/Card';
import UserInput from './components/UserInputs/UserInput';
import AchievedGoalsList from './components/ArchivedGoals/AchievedGoalsList';
import FailedGoalsList from './components/ArchivedGoals/FailedGoalsList';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import LoginContext from './store/login-context';
import styles from './App.module.css';

const DUMMY_GOALS = [
  {
    id: 1,
    title: 'Complete 10 lectures from the course',
    time: new Date('March 30, 2023 13:00:00').getTime(),
  },
  {
    id: 2,
    title: 'Write LinkedIn post',
    time: new Date('March 25, 2023 15:00:00').getTime(),
  },
];

const App = () => {
  const [enteredInfo, setEnteredInfo] = useState(DUMMY_GOALS);
  const [achievedGoals, setAchievedGoals] = useState([]);
  const [failedGoals, setFailedGoals] = useState([]);

  const ctx = useContext(LoginContext);

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

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const failed = enteredInfo.filter((goal) => goal.time <= now);

      setEnteredInfo((prevGoals) => {
        return prevGoals.filter((goal) => goal.time > now);
      });

      setFailedGoals((prevFailedGoals) => [...prevFailedGoals, ...failed]);
    }, 10000);
    return () => clearInterval(interval);
  }, [enteredInfo]);

  if (!ctx.loginStatus) {
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
        <FailedGoalsList failedGoals={failedGoals} />
      </main>
    </React.Fragment>
  );
};

export default App;
