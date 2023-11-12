import React from 'react';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

import PriceSort from './PriceSort';
import ExpenseData from '../data/ExpenseData';

import styles from '../../styles/Expenses.module.css';

function Expenses() {
  const [data, setData] = useState(ExpenseData);

  var total = 0;
  for (let element in data) {
    total += element.price;
  }

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

  return (
    <React.Fragment>
      <PriceSort
        sortDateMostRecent={sortDateMostRecent}
        sortDateOldest={sortDateOldest}
        sortPriceHighest={sortPriceHighest}
        sortPriceLowest={sortPriceLowest}
      />
      <div className={styles['table-container']}>
        <Table>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Date</th>
              <th>Price</th>
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
