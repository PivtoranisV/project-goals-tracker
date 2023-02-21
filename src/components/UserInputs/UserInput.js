import React from 'react';
import Button from '../UI/Button';
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
        <Button type="submit">Add Goal</Button>
      </form>
    </Card>
  );
};

export default UserInput;
