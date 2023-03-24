import React from 'react';
import Button from '../UI/Button';
import styles from './Filter.module.css';

const Filter = () => {
  return (
    <form className={styles.form}>
      <Button>Filter</Button>
      <div className={styles['form-inputs']}>
        <div className={styles['form-input']}>
          <input type="radio" id="all" name="filter" />
          <label htmlFor="all">All</label>
        </div>
        <div className={styles['form-input']}>
          <input type="radio" id="personal" name="filter" />
          <label htmlFor="personal">Personal</label>
        </div>
        <div className={styles['form-input']}>
          <input type="radio" id="work" name="filter" />
          <label htmlFor="work">Work</label>
        </div>
        <div className={styles['form-input']}>
          <input type="radio" id="education" name="filter" />
          <label htmlFor="education">Education</label>
        </div>
        <div className={styles['form-input']}>
          <input type="radio" id="health" name="filter" />
          <label htmlFor="health">Health</label>
        </div>
      </div>
    </form>
  );
};

export default Filter;
