import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import styles from './FailedGoalsList.module.css';

const FailedGoalsList = () => {
  const [showFailedGoals, setShowFailedGoals] = useState(false);

  const clickHandler = () => {
    setShowFailedGoals(true);
  };

  return (
    <>
      {!showFailedGoals && (
        <Card>
          <div className={styles.starter}>
            <h2>
              Just keep trying, don't give up and you will achieve your goal!
              Try Again!
            </h2>
            <Button onClick={clickHandler}>Failed Goals</Button>
          </div>
        </Card>
      )}
      {showFailedGoals && <Card>Failed Goals</Card>}
    </>
  );
};

export default FailedGoalsList;
