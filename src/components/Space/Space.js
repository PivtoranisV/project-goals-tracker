import React, { useState, useEffect, useRef } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { fetchData } from './fetch-data';
import styles from './Space.module.css';
import SpaceStarter from './SpaceStarter';

const Space = () => {
  const [showStarter, setShowStarter] = useState(false);
  const [spaceInfo, setSpaceInfo] = useState({});

  const dateRef = useRef();

  const showStarterHandler = () => {
    setShowStarter(true);
  };

  useEffect(() => {
    fetchData().then((data) => {
      setSpaceInfo(data);
    });
  }, []);

  const newImgHandler = (event) => {
    event.preventDefault();
    const newDate = `&date=${dateRef.current.value}`;
    fetchData(newDate).then((data) => {
      setSpaceInfo(data);
    });
    dateRef.current.value = '';
  };

  const year = new Date(spaceInfo.date).getFullYear();
  const month = new Date(spaceInfo.date).toLocaleString('en-GB', {
    month: 'long',
  });
  const day = new Date(spaceInfo.date).getDate();

  return (
    <React.Fragment>
      {!showStarter && <SpaceStarter onShowStarter={showStarterHandler} />}
      {showStarter && (
        <Card>
          <div className={styles.title}>
            <h1>{spaceInfo.title}</h1>
            <h3>Space fact of the day from {`${month} ${day}, ${year}`}</h3>
          </div>
          <div>
            <img src={spaceInfo.url} alt={spaceInfo.title} />
          </div>
          <div className={styles.explanation}>
            <p>{spaceInfo.explanation}</p>
          </div>
          <div>
            <form onSubmit={newImgHandler} className={styles.form}>
              <div className={styles['form-input']}>
                <label htmlFor="date">
                  If you missed the space fact of the day, don't worry - just
                  select any data that took place after June 16, 1995, and press
                  the button!
                </label>
                <input type="date" id="date" ref={dateRef} />
              </div>
              <Button>New Fact</Button>
            </form>
          </div>
        </Card>
      )}
    </React.Fragment>
  );
};

export default Space;
