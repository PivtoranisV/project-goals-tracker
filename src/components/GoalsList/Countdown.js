import React from 'react';

const Countdown = (props) => {
  const currentTime = new Date().getTime();
  const remaining = props.deadline - currentTime;

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
  return (
    <>
      <span>
        {days}d {hours}h
      </span>
      <span>
        {minutes}m {seconds}s
      </span>
    </>
  );
};

export default Countdown;
