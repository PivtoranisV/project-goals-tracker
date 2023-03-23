import React, { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

const Countdown = (props) => {
  const [animationIsShown, setAnimationIsShown] = useState(false);

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

  const countdownClasses = `${timeClass} ${
    animationIsShown ? styles.wiggle : ''
  }`;

  useEffect(() => {
    if (minutes === 0) {
      return;
    }

    setAnimationIsShown(true);

    const timer = setTimeout(() => {
      setAnimationIsShown(false);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [minutes]);

  return (
    <div key={minutes} className={countdownClasses}>
      <strong> {days} </strong> days, <strong> {hours} </strong> hours and{' '}
      <strong>{minutes}</strong> minutes
    </div>
  );
};

export default Countdown;
