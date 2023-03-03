import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import FailedGoal from './FailedGoal';

import styles from './FailedGoalsList.module.css';

const FailedGoalsList = (props) => {
  const [showFailedGoals, setShowFailedGoals] = useState(false);

  const clickHandler = () => {
    setShowFailedGoals(true);
  };

  const handleOk = () => {
    setShowFailedGoals(false);
  };

  return (
    <>
      {!showFailedGoals && (
        <Card>
          <div className={styles.starter}>
            <h3>
              Just keep trying, don't give up and you will achieve your goal!
              Try Again!
            </h3>
            <Button onClick={clickHandler}>Failed Goals</Button>
          </div>
        </Card>
      )}
      {showFailedGoals && (
        <Card>
          <ul className={styles['failed-goal-list']}>
            {props.failedGoals.map((failedGoal) => (
              <FailedGoal title={failedGoal.title} key={failedGoal.id} />
            ))}
          </ul>
          <div className={styles.ok}>
            <Button onClick={handleOk}>Ok</Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default FailedGoalsList;
