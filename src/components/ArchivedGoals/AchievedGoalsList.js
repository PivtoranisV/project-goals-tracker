import React, { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import AchievedGoal from './AchievedGoal';
import styles from './AchievedGoalsList.module.css';

const AchievedGoalsList = (props) => {
  const [showAchievedGoals, setShowAchievedGoals] = useState(false);

  const clickHandler = () => {
    setShowAchievedGoals(true);
  };

  const handleOk = () => {
    setShowAchievedGoals(false);
  };

  return (
    <>
      {!showAchievedGoals && (
        <Card>
          <div className={styles.starter}>
            <h2>
              Check out your successes so far! It is very motivating to see how
              close you are to your Dream!
            </h2>
            <Button onClick={clickHandler}>Achieved Goals</Button>
          </div>
        </Card>
      )}
      {showAchievedGoals && (
        <Card>
          <ul className={styles['achieved-goal-list']}>
            {props.achievedGoals.map((achievedGoal) => (
              <AchievedGoal
                title={achievedGoal.title}
                key={achievedGoal.id}
                date={achievedGoal.date}
              />
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

export default AchievedGoalsList;
