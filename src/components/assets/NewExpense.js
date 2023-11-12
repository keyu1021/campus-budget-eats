import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function NewExpense(props) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');

  const addExpense = () => {
    setName('')
    setDate('')
    setPrice('')
    props.addNewExpense(name, date, parseInt(price))
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className='mb-3' controlId='formExpenseName'>
            <Form.Label column sm='2'>
              Name
            </Form.Label>
            <Col sm='10'>
              <Form.Control value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Expense name' />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3' controlId='formDate'>
            <Form.Label column sm='2'>
              Date
            </Form.Label>
            <Col sm='10'>
              <Form.Control value={date} onChange={(e) => setDate(e.target.value)} type='date' placeholder='Date' />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3' controlId='formPrice'>
            <Form.Label column sm='2'>
              Price
            </Form.Label>
            <Col sm='10'>
              <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} type='number' placeholder='Price ($)' />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={addExpense}>
          Add expense
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewExpense;
