import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import styles from './Space.module.css';

const Space = () => {
  const [showSpace, setShowSpace] = useState(false);

  const clickHandler = () => {
    setShowSpace(true);
  };

  return (
    <React.Fragment>
      {!showSpace && (
        <Card>
          <div className={styles.text}>
            <h3>Take a Brake jump into Space!</h3>
            <p>
              When you're working towards achieving your goals or completing
              tasks, it's important to take regular breaks to prevent burnout
              and keep your mind fresh.
            </p>
            <p>
              One effective way to relax your brain during breaks is to discover
              Space. Whether it's a stunning image of a galaxy, a fascinating
              fact about a planet, or a thought-provoking quote from an
              astronaut, space content can provide a welcome distraction and
              inspiration that can help you recharge and refocus. So the next
              time you need to take a break, consider exploring the wonders of
              space to give your brain a much-needed rest.
            </p>
            <p>Come back here every day to discover new picture of the day!</p>
            <Button onClick={clickHandler}>Jump into Space</Button>
          </div>
        </Card>
      )}
      <Card>
        <div>
          <h1>Moon</h1>
        </div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <p>
            One effective way to relax your brain during breaks is to discover
            Space. Whether it's a stunning image of a galaxy, a fascinating fact
            about a planet, or a thought-provoking quote from an astronaut,
            space content can provide a welcome distraction and inspiration that
            can help you recharge and refocus. So the next time you need to take
            a break, consider exploring the wonders of space to give your brain
            a much-needed rest.
          </p>
        </div>
        <form>
          <label>Date</label>
          <input type="date" />
          <Button>New Picture</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Space;
