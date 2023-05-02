import React, { useState, useContext, useEffect, useCallback } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GoalsList from './components/GoalsList/GoalsList';
import Card from './components/UI/Card';
import UserInput from './components/UserInputs/UserInput';
import AchievedGoalsList from './components/ArchivedGoals/AchievedGoalsList';
import FailedGoalsList from './components/ArchivedGoals/FailedGoalsList';
import Login from './components/Login/Login';
import Space from './components/Space/Space';

import LoginContext from './store/login-context';
import useHttp from './hooks/use-http';
import { urls } from './urls/urls';

import styles from './App.module.css';
import RootLayout from './pages/RootLayout';

const App = () => {
  const [activeGoals, setActiveGoals] = useState([]);
  const [achievedGoals, setAchievedGoals] = useState([]);
  const [failedGoals, setFailedGoals] = useState([]);

  const ctx = useContext(LoginContext);

  const { activeUrl, completedUrl, failedUrl } = urls;

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

  const transformFailedGoals = (goal) => {
    const loadedFailedGoals = [];
    for (const key in goal) {
      loadedFailedGoals.push({
        id: goal[key].id,
        title: goal[key].title,
        date: goal[key].date,
      });
    }

    setFailedGoals(loadedFailedGoals);
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

  const {
    isLoading: failedLoading,
    error: failedError,
    sendRequest: fetchFailedGoals,
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
    fetchCompletedGoals({ url: completedUrl }, transformCompletedGoals);
    fetchFailedGoals({ url: failedUrl }, transformFailedGoals);
  }, [
    activeUrl,
    completedUrl,
    failedUrl,
    fetchActiveGoals,
    fetchCompletedGoals,
    fetchFailedGoals,
  ]);

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

  const failedGoalHandler = (goal) => {
    setFailedGoals((prevFailedGoals) => prevFailedGoals.concat(goal));
    setActiveGoals((prevInfo) => {
      return prevInfo.filter((el) => el.id !== goal.id);
    });
    deleteActiveGoal(goal.id);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: (
            <>
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
                      Every big achievement started with a small goal, but you
                      do not have one, <strong>please add!</strong>
                    </h3>
                  </div>
                </Card>
              )}
            </>
          ),
        },
        {
          path: 'achieved',
          element: (
            <AchievedGoalsList
              achievedGoals={achievedGoals}
              loading={completedLoading}
              error={completedError}
            />
          ),
        },
        {
          path: 'failed',
          element: (
            <FailedGoalsList
              failedGoals={failedGoals}
              loading={failedLoading}
              error={failedError}
            />
          ),
        },
        {
          path: 'space',
          element: <Space />,
        },
      ],
    },
  ]);

  if (!ctx.loginStatus) {
    return <Login />;
  }

  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
