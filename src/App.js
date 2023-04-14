import React, { useState, useContext, useEffect } from 'react';

import GoalsList from './components/GoalsList/GoalsList';
import Card from './components/UI/Card';
import UserInput from './components/UserInputs/UserInput';
import AchievedGoalsList from './components/ArchivedGoals/AchievedGoalsList';
import FailedGoalsList from './components/ArchivedGoals/FailedGoalsList';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Space from './components/Space/Space';

import LoginContext from './store/login-context';
import useHttp from './hooks/use-http';

import styles from './App.module.css';

const App = () => {
  const [activeGoals, setActiveGoals] = useState([]);
  const [achievedGoals, setAchievedGoals] = useState([]);
  const [failedGoals, setFailedGoals] = useState([]);

  const ctx = useContext(LoginContext);

  const activeUrl =
    'https://goals-tracker-25f88-default-rtdb.firebaseio.com/activeGoals.json';

  const transformActiveGoals = (goal) => {
    const loadedGoals = [];
    for (const key in goal) {
      loadedGoals.push({
        id: key,
        title: goal[key].title,
        category: goal[key].category,
        time: goal[key].time,
      });
    }

    setActiveGoals(loadedGoals);
  };

  const { isLoading, error, sendRequest: fetchActiveGoals } = useHttp();

  useEffect(() => {
    fetchActiveGoals({ url: activeUrl }, transformActiveGoals);
  }, [fetchActiveGoals]);

  const addGoalHandler = (goal) => {
    setActiveGoals((prevGoals) => prevGoals.concat(goal));
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
            error={error}
            loading={isLoading}
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
