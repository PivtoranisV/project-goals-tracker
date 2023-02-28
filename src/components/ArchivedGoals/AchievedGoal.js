import React from 'react';

const AchievedGoal = (props) => {
  return (
    <li>
      {props.title} {props.date}
    </li>
  );
};

export default AchievedGoal;
