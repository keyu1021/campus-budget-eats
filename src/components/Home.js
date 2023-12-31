import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Row, Col } from 'react-bootstrap';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { GrFormEdit } from 'react-icons/gr';
import { RiCheckboxCircleLine } from 'react-icons/ri';

import Navigation from './assets/Navigation';
import Form from 'react-bootstrap/Form';
import Expenses from './assets/Expenses';
import styles from '../styles/Home.module.css';
import { db } from '../firebase';
import { IconContext } from 'react-icons';

function Home() {
  const [document, setDocument] = useState(localStorage.getItem('userID'));
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [budget, setBudget] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [month, setMonth] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    //Load the budget and expenses from the database
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'users', document);
        const docSnap = await getDoc(docRef);
        setBudget(docSnap.data().budget);

        const docRefExpenses = doc(db, 'userExpenses', document);
        const docSnapExpenses = await getDoc(docRefExpenses);

        const keys = Object.keys(docSnapExpenses.data());
        const dataArray = [];
        for (let i = 0; i < keys.length; i++) {
          dataArray.push(docSnapExpenses.data()[keys[i]]);
        }
        setExpenses(dataArray);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    //Calculate initial total
    var calcTotal = 0;
    expenses.forEach((element, index, array) => {
      calcTotal += element.price;
    });

    //Set initial values
    setRemaining(budget - total);
    setPercentage(((budget - remaining) / budget) * 100);

    //Set the current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    setMonth(monthNames[currentMonth]);
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

  const handleBudgetChange = async (event) => {
    const value = event.target.value;
    setBudget(value);
    debouncedHandleBudgetChange(value);

    //Set the value in the database
    const updateField = 'budget';
    const newValue = event.target.value;
    try {
      const docRef = doc(db, 'users', document);
      await updateDoc(docRef, { [updateField]: newValue });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRemaining(budget - total);
  }, [total, budget]);

  const handleEditCLick = () => {
    setEdit(true);
  };

  const handleSaveClick = () => {
    setEdit(false);
  };

  return (
    <React.Fragment>
      <Navigation />

      <div className={styles['flex-container']}>
        <div className={styles['item-container-center']}>
          <Row className='mb-3 justify-content-center'>
            <Col md={7} lg={8} className='text-center'>
              <h3>{month}'s food budget : </h3>
            </Col>
            <Col xs={3} md={4} lg={3} className='text-center'>
              {!edit && (
                <Form.Control
                  type='number'
                  value={budget}
                  onChange={handleBudgetChange}
                  disabled
                  size='sm'
                />
              )}
              {edit && (
                <Form.Control
                  type='number'
                  value={budget}
                  onChange={handleBudgetChange}
                  size='sm'
                />
              )}
            </Col>
            <Col lg={1}>
              {!edit && (
                <IconContext.Provider value={{ style: { cursor: 'pointer' } }}>
                  <GrFormEdit onClick={handleEditCLick} />
                </IconContext.Provider>
              )}
              {edit && (
                <IconContext.Provider value={{ style: { cursor: 'pointer' } }}>
                  <RiCheckboxCircleLine onClick={handleSaveClick}/>
                </IconContext.Provider>
              )}
            </Col>
          </Row>

          <div className={styles['progress-container']}>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>

          <h3 className='mt-3'>
            {remaining.toFixed(2)}$ of {budget}$ remaining
          </h3>
        </div>

        <div className={styles['item-container-left']}>
          <Expenses updateTotal={updateTotal} />
          <h3 className='mt-2'>Total: {total.toFixed(2)}$</h3>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
