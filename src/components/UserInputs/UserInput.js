import React from 'react';
import Card from '../UI/Card';
import styles from './UserInput.module.css';

const UserInput = () => {
  return (
    <Card>
      <form className={styles.form}>
        <div className={styles['form-inputs']}>
          <div className={styles['form-input']}>
            <label htmlFor="title">Goal</label>
            <input id="title" type="text" />
          </div>
          <div className={styles['form-input']}>
            <label htmlFor="deadline">Deadline</label>
            <input id="deadline" type="datetime-local" />
          </div>
        </div>
        <button className={styles.button} type="submit">
          Add Goal
        </button>
      </form>
    </Card>
  );
};

export default UserInput;
