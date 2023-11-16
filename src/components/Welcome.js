import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import styles from './../styles/Welcome.module.css';

function Welcome() {
  return (
    <Container
      className='d-flex flex-column justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <h1>Student Budgeting for balanced meals</h1>
      <h3>Welcome !</h3>
      <div className='d-flex'>
        <LinkContainer to='/register'>
          <Button variant='primary' className="me-2">
            Register
          </Button>
        </LinkContainer>
        <LinkContainer to='/login'>
          <Button variant='secondary'>
            Log In
          </Button>
        </LinkContainer>
      </div>
    </Container>
  );
}

export default Welcome;
