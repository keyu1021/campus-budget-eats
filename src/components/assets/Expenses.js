import React from 'react';
import Table from 'react-bootstrap/Table';
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { IconContext } from 'react-icons';
import { GrSubtractCircle } from 'react-icons/gr';
import { doc, getDoc, updateDoc, deleteField } from '@firebase/firestore';

import PriceSort from './PriceSort';
import NewExpense from './NewExpense';
import { db } from '../../firebase';

import styles from '../../styles/Expenses.module.css';

function Expenses(props) {
  const [document, setDocument] = useState(localStorage.getItem('userID'));
  const [data, setData] = useState([]);

  //Initialize expenses
  useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); 
      try {
        const docRefExpenses = doc(db, 'userExpenses', document);
        const docSnapExpenses = await getDoc(docRefExpenses);

        const keys = Object.keys(docSnapExpenses.data());
        const dataArray = [];
        keys.forEach((k) => {
          const expenseData = docSnapExpenses.data()[k];
          expenseData.id = k;
          
          const dateObject = new Date(expenseData.date);
          if (dateObject.getMonth() === currentMonth){
            dataArray.push(expenseData);
          }
        });
        setData(dataArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
  const addNewExpense = async (newName, newDate, newPrice) => {
    const newExpense = {
      name: newName,
      date: newDate,
      price: newPrice,
    };

    setData((prevData) => [...prevData, newExpense]);

    //Get the last expense id
    var lastExpenseID = -1;
    try {
      const docRef = doc(db, 'users', document);
      const docSnap = await getDoc(docRef);
      lastExpenseID = docSnap.data().lastExpense;
    } catch (error) {
      console.log(error);
    }

    if (lastExpenseID !== -1) {
      const updateField = lastExpenseID + 1;
      const newValue = { name: newName, date: newDate, price: newPrice };
      const updateFieldLast = 'lastExpense';
      const newValueLast = lastExpenseID + 1;
      try {
        //Add next expense
        const docRefExpenses = doc(db, 'userExpenses', document);
        await updateDoc(docRefExpenses, { [updateField]: newValue });

        //Update last expense id
        const docRef = doc(db, 'users', document);
        await updateDoc(docRef, { [updateFieldLast]: newValueLast });
      } catch (error) {
        console.log(error);
      }
    }

    handleClose();

    var calcTotal = 0;
    data.forEach((element, index, array) => {
      calcTotal += element.price;
    });
    props.updateTotal(calcTotal);
  };

  const deleteExpense = async (id) => {
    //Delete from database
    try {
      const docRefExpenses = doc(db, 'userExpenses', document);
      await updateDoc(docRefExpenses, { [id]: deleteField() });
    } catch (error) {
      console.log(error);
    }

    //Update state
    setData((prevData) => prevData.filter((expense) => expense.id !== id));
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
      <Row className='d-flex align-items-center mb-3'>
        <Col>
          <h3>Monthly expenses</h3>
        </Col>
        <Col lg={2}>
          <PriceSort
            sortDateMostRecent={sortDateMostRecent}
            sortDateOldest={sortDateOldest}
            sortPriceHighest={sortPriceHighest}
            sortPriceLowest={sortPriceLowest}
          />
        </Col>
        <Col lg={1}>
          <IconContext.Provider value={{ style: { cursor: 'pointer' } }}>
            <GrAddCircle onClick={handleShow} />
          </IconContext.Provider>
        </Col>
        <NewExpense
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          addNewExpense={addNewExpense}
        />
      </Row>

      <div className={styles['table-container']}>
        <Table className='mt-1' bordered>
          <thead>
            <tr>
              <th></th>
              <th>Expense</th>
              <th>Date</th>
              <th>Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>
                    <IconContext.Provider
                      value={{
                        style: {
                          cursor: 'pointer',
                          marginLeft: '5px',
                        },
                      }}
                    >
                      <GrSubtractCircle
                        onClick={() => {
                          deleteExpense(val.id);
                        }}
                      />
                    </IconContext.Provider>
                  </td>
                  <td>{val.name}</td>
                  <td>{val.date}</td>
                  <td>{val.price.toFixed(2)} </td>
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
