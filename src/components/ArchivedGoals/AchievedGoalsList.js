import React from 'react';
import Card from '../UI/Card';
import AchievedGoal from './AchievedGoal';

const AchievedGoalsList = (props) => {
  return (
    <Card>
      {props.achievedGoals.map((achievedGoal) => (
        <AchievedGoal title={achievedGoal.title} key={achievedGoal.id} />
      ))}
    </Card>
  );
};

export default AchievedGoalsList;
