import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Navigation from './assets/Navigation';
import Form from 'react-bootstrap/Form';
import Expenses from './assets/Expenses';
import styles from '../styles/Home.module.css';
import ExpenseData from './data/ExpenseData';

function Home() {
  const [total, setTotal] = useState(0);
  const [budget, setBudget] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    //Load the budget from localstorage
    setBudget(localStorage.getItem('budget'));

    //Calculate initial total
    var calcTotal = 0;
    ExpenseData.forEach((element, index, array) => {
      calcTotal += element.price;
    });

    //Set initial values
    setRemaining(budget - total);
    setPercentage(((budget - remaining) / budget) * 100);

  }, []);

  const updateTotal = (newTotal) => {
    setTotal(newTotal);
  };

  // State to store the debounced value of the budget
  const [debouncedBudget, setDebouncedBudget] = useState(budget);

  useEffect(() => {
    // Update the percentage when debouncedBudget changes
    setPercentage(Math.round(((budget - remaining) / budget) * 100));
  }, [debouncedBudget, remaining, budget]);

  // Debounce function to delay the update of the budget
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Debounce the handleBudgetChange function with a delay of 500 milliseconds
  const debouncedHandleBudgetChange = debounce((value) => {
    setDebouncedBudget(value);
  }, 500);

  const handleBudgetChange = (event) => {
    const value = event.target.value;
    setBudget(value);
    debouncedHandleBudgetChange(value);
    localStorage.setItem('budget', value)
  };

  useEffect(() => {
    setRemaining(budget - total);
  }, [total, budget]);

  return (
    <React.Fragment>
      <Navigation />
      <div className={styles['flex-container']}>
        <div className={styles['item-container-center']}>
          <h3>October's food budget : </h3>
          <Form.Control
            type='number'
            className='w-25'
            value={budget}
            onChange={handleBudgetChange}
          />
          <div className={styles['progress-container']}>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>
          <h3>
            {remaining}$ of {budget}$ remaining
          </h3>
        </div>
        <div className={styles['item-container-left']}>
          <h3>Monthly expenses</h3>
          <Expenses updateTotal={updateTotal} />
          <h3>Total: {total}$</h3>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
