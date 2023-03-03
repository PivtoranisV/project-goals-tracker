import React from 'react';
import styles from './Countdown.module.css';

const Countdown = (props) => {
  const currentTime = new Date().getTime();
  const remaining = props.deadline - currentTime;

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

  const timeClass =
    remaining <= 1000 * 60 * 60
      ? styles['goal-items__time-low']
      : styles['goal-items__time'];

  return (
    <span className={timeClass}>
      <span>
        <strong>{days}</strong> days <strong>{hours}</strong> hours
      </span>
      <span>
        <strong>{minutes}</strong> minutes
      </span>
    </span>
  );
};

export default Countdown;
