import React from 'react';

const Goal = (props) => {
  return (
    <li>
      <span>{props.title}</span>
      <span>{props.time}</span>
    </li>
  );
};

export default Goal;
