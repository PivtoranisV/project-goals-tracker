import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import { fetchData } from './fetch-data';

import styles from './SpaceFact.module.css';

const SpaceFact = () => {
  const [spaceInfo, setSpaceInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dateRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    fetchData()
      .then((data) => {
        setSpaceInfo(data);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  const newImgHandler = (event) => {
    event.preventDefault();
    const newDate = `&date=${dateRef.current.value}`;
    setIsLoading(true);
    fetchData(newDate)
      .then((data) => {
        setSpaceInfo(data);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
    dateRef.current.value = '';
  };

  const year = new Date(spaceInfo.date).getFullYear();
  const month = new Date(spaceInfo.date).toLocaleString('en-GB', {
    month: 'long',
  });
  const day = new Date(spaceInfo.date).getDate();

  return (
    <Card>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {!isLoading && !error && (
        <>
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
                  select any date that took place after June 16, 1995, and press
                  the button!
                </label>
                <input type="date" id="date" ref={dateRef} />
              </div>
              <Button>Get New Fact</Button>
            </form>
          </div>
        </>
      )}
    </Card>
  );
};

export default SpaceFact;
