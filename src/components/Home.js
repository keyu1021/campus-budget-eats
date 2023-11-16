import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Row, Col } from 'react-bootstrap';

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
    localStorage.setItem('budget', value);
  };

  useEffect(() => {
    setRemaining(budget - total);
  }, [total, budget]);

  return (
    <React.Fragment>
      <Navigation />
      <div className={styles['flex-container']}>
        <div className={styles['item-container-center']}>
          <Row className='mb-3 justify-content-center'>
            <Col lg={7} className="text-center">
              <h3>October's food budget : </h3>
            </Col>
            <Col lg={3} className="text-center">
              <Form.Control
                type='number'
                value={budget}
                onChange={handleBudgetChange}
              />
            </Col>
          </Row>

          <div className={styles['progress-container']}>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>

          <h3 className='mt-3'>
            {remaining}$ of {budget}$ remaining
          </h3>
        </div>

        <div className={styles['item-container-left']}>
          <Expenses updateTotal={updateTotal} />
          <h3 className='mt-2'>Total: {total}$</h3>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
