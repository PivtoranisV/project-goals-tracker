import React, { useState, useContext, useEffect, useCallback } from 'react';

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
  const competedUrl =
    'https://goals-tracker-25f88-default-rtdb.firebaseio.com/completedGoals.json';

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

  const transformCompletedGoals = (goal) => {
    const loadedCompletedGoals = [];
    for (const key in goal) {
      loadedCompletedGoals.push({
        id: goal[key].id,
        title: goal[key].title,
        date: goal[key].date,
      });
    }

    setAchievedGoals(loadedCompletedGoals);
  };

  const {
    isLoading: activeLoading,
    error: activeError,
    sendRequest: fetchActiveGoals,
  } = useHttp();

  const {
    isLoading: completedLoading,
    error: completedError,
    sendRequest: fetchCompletedGoals,
  } = useHttp();

  const { sendRequest: sendDeleteRequest } = useHttp();

  const deleteActiveGoal = useCallback(
    (goalId) => {
      sendDeleteRequest({
        url: `https://goals-tracker-25f88-default-rtdb.firebaseio.com/activeGoals/${goalId}.json`,
        method: 'DELETE',
      });
    },
    [sendDeleteRequest]
  );

  useEffect(() => {
    fetchActiveGoals({ url: activeUrl }, transformActiveGoals);
    fetchCompletedGoals({ url: competedUrl }, transformCompletedGoals);
  }, [fetchActiveGoals, fetchCompletedGoals]);

  const addGoalHandler = (goal) => {
    setActiveGoals((prevGoals) => prevGoals.concat(goal));
  };

  const completeGoalHandler = (goal) => {
    setAchievedGoals((prevAchievedGoals) => prevAchievedGoals.concat(goal));
    setActiveGoals((prevInfo) => {
      return prevInfo.filter((el) => el.id !== goal.id);
    });
    deleteActiveGoal(goal.id);
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
            error={activeError}
            loading={activeLoading}
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
        <AchievedGoalsList
          achievedGoals={achievedGoals}
          loading={completedLoading}
          error={completedError}
        />
        <FailedGoalsList failedGoals={failedGoals} />
        <Space />
      </main>
    </React.Fragment>
  );
};

export default App;
