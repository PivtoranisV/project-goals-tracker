import React, { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

const Countdown = (props) => {
  const [animationIsShown, setAnimationIsShown] = useState(false);
  const [remaining, setRemaining] = useState(
    props.deadline - new Date().getTime()
  );

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  const timeClass =
    remaining <= 1000 * 60 * 60
      ? styles['goal-items__time-low']
      : styles['goal-items__time'];

  const countdownClasses = `${timeClass} ${
    animationIsShown ? styles.wiggle : ''
  }`;

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(props.deadline - new Date().getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [props.deadline]);

  useEffect(() => {
    if (remaining <= 0) {
      props.onFailedGoal(props.id);
    }
  }, [remaining, props]);

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
    <div className={countdownClasses}>
      <strong> {days} </strong> days, <strong> {hours} </strong> hours and{' '}
      <strong>{minutes}</strong> minutes <strong>{seconds}</strong> seconds
    </div>
  );
};

export default Countdown;
