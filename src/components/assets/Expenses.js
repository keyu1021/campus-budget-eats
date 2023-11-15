import React from 'react';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { GrAddCircle } from 'react-icons/gr';

import PriceSort from './PriceSort';
import ExpenseData from '../data/ExpenseData';
import NewExpense from './NewExpense';

import styles from '../../styles/Expenses.module.css';

function Expenses(props) {
  // Data management
  const [data, setData] = useState(ExpenseData);

  // Sorting
  const sortDateMostRecent = () => {
    setData(
      [...data].sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
    );
  };

  const sortDateOldest = () => {
    setData(
      [...data].sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      })
    );
  };

  const sortPriceHighest = () => {
    setData(
      [...data].sort(function (a, b) {
        return b.price - a.price;
      })
    );
  };

  const sortPriceLowest = () => {
    setData(
      [...data].sort(function (a, b) {
        return a.price - b.price;
      })
    );
  };

  // Adding new expense
  const addNewExpense = (newName, newDate, newPrice) => {
    const newExpense = {
      name: newName,
      date: newDate,
      price: newPrice,
    };

    setData((prevData) => [...prevData, newExpense]); // Use the previous state to calculate the new state
    handleClose();

    var calcTotal = 0;
    data.forEach((element, index, array) => {
      calcTotal += element.price;
    });
    props.updateTotal(calcTotal);
  };

  useEffect(() => {
    // Calculate the total based on the updated data
    var calcTotal = 0;
    data.forEach((element, index, array) => {
      calcTotal += element.price;
    });
    props.updateTotal(calcTotal);
  }, [data, props]);

  // Modal management
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <PriceSort
        sortDateMostRecent={sortDateMostRecent}
        sortDateOldest={sortDateOldest}
        sortPriceHighest={sortPriceHighest}
        sortPriceLowest={sortPriceLowest}
      />
      <GrAddCircle onClick={handleShow} />
      <NewExpense
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        addNewExpense={addNewExpense}
      />
      <div className={styles['table-container']}>
        <Table>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Date</th>
              <th>Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.name}</td>
                  <td>{val.date}</td>
                  <td>{val.price}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
}

export default Expenses;
