import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Navigation from './assets/Navigation';
import Form from 'react-bootstrap/Form';
import Expenses from './assets/Expenses';
import styles from '../styles/Home.module.css';
import ExpenseData from './data/ExpenseData';

function Home() {
  var calcTotal = 0;
  ExpenseData.forEach((element, index, array) => {
    calcTotal += element.price;
  });

  const [total, setTotal] = useState(calcTotal);

  const [budget, setBudget] = useState(350);
  const [remaining, setRemaining] = useState(budget - total);
  const [percentage, setPercentage] = useState(
    Math.round(((budget - remaining) / budget) * 100)
  );

  const updateTotal = (newTotal) => {
    setTotal(newTotal)
  }

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
  };

  useEffect(() => {
    setRemaining(budget - total)
  }, [total, budget]

  )

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
          <Expenses updateTotal={updateTotal}/>
          <h3>Total: {total}$</h3>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
