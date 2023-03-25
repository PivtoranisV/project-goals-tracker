import React, { useState } from 'react';
import Button from '../UI/Button';
import styles from './Filter.module.css';

const Filter = (props) => {
  const [filter, setFilter] = useState('');

  const filterChangeHandler = (event) => {
    setFilter(event.target.value);
  };

  const filterHandler = (event) => {
    event.preventDefault();
    props.onFilter(filter);
  };

  return (
    <form className={styles.form} onSubmit={filterHandler}>
      <Button>Filter</Button>
      <div className={styles['form-inputs']}>
        <div className={styles['form-input']}>
          <input
            type="radio"
            id="all"
            name="filter"
            value="All"
            onChange={filterChangeHandler}
          />
          <label htmlFor="all">All</label>
        </div>
        <div className={styles['form-input']}>
          <input
            type="radio"
            id="personal"
            name="filter"
            value="Personal"
            onChange={filterChangeHandler}
          />
          <label htmlFor="personal">Personal</label>
        </div>
        <div className={styles['form-input']}>
          <input
            type="radio"
            id="work"
            name="filter"
            value="Work"
            onChange={filterChangeHandler}
          />
          <label htmlFor="work">Work</label>
        </div>
        <div className={styles['form-input']}>
          <input
            type="radio"
            id="education"
            name="filter"
            value="Education"
            onChange={filterChangeHandler}
          />
          <label htmlFor="education">Education</label>
        </div>
        <div className={styles['form-input']}>
          <input
            type="radio"
            id="health"
            name="filter"
            value="Health"
            onChange={filterChangeHandler}
          />
          <label htmlFor="health">Health</label>
        </div>
      </div>
    </form>
  );
};

export default Filter;
