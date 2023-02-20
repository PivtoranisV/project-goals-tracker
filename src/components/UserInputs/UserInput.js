import React from 'react';
import styles from './UserInput.module.css';

const UserInput = () => {
  return (
    <div>
      <form className={styles.form}>
        <div className={styles['form-inputs']}>
          <div className={styles['form-input']}>
            <label>Goal</label>
            <input type="text" />
          </div>
          <div className={styles['form-input']}>
            <label>Deadline</label>
            <input type="datetime-local" />
          </div>
        </div>
        <button className={styles.button} type="submit">
          Add Goal
        </button>
      </form>
    </div>
  );
};

export default UserInput;
