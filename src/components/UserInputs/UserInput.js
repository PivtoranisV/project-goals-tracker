import React, { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import styles from './UserInput.module.css';

const UserInput = (props) => {
  const [showInput, setShowInput] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredTime, setEnteredTime] = useState('');
  const [enteredCategory, setEnteredCategory] = useState('');

  const [error, setError] = useState();

  const titleHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const timeHandler = (event) => {
    setEnteredTime(event.target.value);
  };

  const categoryHandler = (event) => {
    setEnteredCategory(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      enteredTitle.trim().length === 0 ||
      enteredTime.trim().length === 0 ||
      enteredCategory.trim().length === 0
    ) {
      setError({
        title: 'Invalid Input',
        message: 'Please, enter your Goal, Category and Deadline',
      });
      return;
    }
    const currentTime = new Date().getTime();
    const inputTime = new Date(enteredTime).getTime();
    if (inputTime < currentTime) {
      setError({
        title: 'Invalid Deadline',
        message: 'Please, enter future date',
      });
      return;
    }
    props.onAddGoal(enteredTitle, enteredCategory, enteredTime);
    setEnteredTitle('');
    setEnteredTime('');
    setEnteredCategory('');
    setShowInput(false);
  };

  const clickHandler = () => {
    setShowInput(true);
  };

  const handleConfirm = () => {
    setError();
  };

  return (
    <div>
      {error && (
        <Modal
          title={error.title}
          message={error.message}
          onConfirm={handleConfirm}
        />
      )}
      {!showInput && (
        <Card>
          <div className={styles.starter}>
            <h3>
              Start building your foundation today by setting a small goals and
              taking the first step towards something great!
            </h3>
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
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={enteredCategory}
                  onChange={categoryHandler}
                >
                  <option value="">Select a category</option>
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                </select>
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
