import React, { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './UserInput.module.css';

const UserInput = (props) => {
  const [showInput, setShowInput] = useState(false);
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
    if (enteredTitle.trim().length === 0 || enteredTime.trim().length === 0) {
      console.log('empty value');
      return;
    }
    const currentTime = new Date().getTime();
    const inputTime = new Date(enteredTime).getTime();
    if (inputTime < currentTime) {
      console.log('Please enter a future date');
      return;
    }
    props.onAddGoal(enteredTitle, enteredTime);
    setEnteredTitle('');
    setEnteredTime('');
    setShowInput(false);
  };

  const clickHandler = () => {
    setShowInput(true);
  };

  return (
    <div>
      {!showInput && (
        <Card>
          <div className={styles.starter}>
            <h2>
              Start building your foundation today by setting a small goals and
              taking the first step towards something great!
            </h2>
            <Button onClick={clickHandler}>Enter Goal</Button>
          </div>
        </Card>
      )}
      {showInput && (
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
      )}
    </div>
  );
};

export default UserInput;
