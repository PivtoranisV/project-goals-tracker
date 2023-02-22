import React, { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './UserInput.module.css';

const UserInput = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredTime, setEnteredTime] = useState('');

  const titleHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const timeHandler = (event) => {
    setEnteredTime(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddGoal(enteredTitle, enteredTime);
    setEnteredTitle('');
    setEnteredTime('');
  };

  return (
    <Card>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles['form-inputs']}>
          <div className={styles['form-input']}>
            <label htmlFor="title">Goal</label>
            <input
              id="title"
              type="text"
              value={enteredTitle}
              onChange={titleHandler}
            />
          </div>
          <div className={styles['form-input']}>
            <label htmlFor="deadline">Deadline</label>
            <input
              id="deadline"
              type="datetime-local"
              value={enteredTime}
              onChange={timeHandler}
            />
          </div>
        </div>
        <Button type="submit">Add Goal</Button>
      </form>
    </Card>
  );
};

export default UserInput;
