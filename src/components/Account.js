import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import Navigation from './assets/Navigation';
import accountLogo from '../images/account-logo.png';

function Account() {
  const [username, setUsername] = useState('');
  const [groceryStore, setGroceryStore] = useState('');
  const [otherRestrictions, setOtherRestrictions] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isPescatarian, setIsPescatarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isKeto, setIsKeto] = useState(false);
  const [isKosher, setIsKosher] = useState(false);
  const [isHalal, setIsHalal] = useState(false);

  useEffect(() => {
    // Load data from local storage
    setUsername(localStorage.getItem('username'));
    setGroceryStore(localStorage.getItem('groceryStore'));
    setOtherRestrictions(localStorage.getItem('otherRestrictions'));
    setIsVegetarian(localStorage.getItem('isVegetarian') === 'true');
    setIsPescatarian(localStorage.getItem('isPescatarian') === 'true');
    setIsVegan(localStorage.getItem('isVegan') === 'true');
    setIsGlutenFree(localStorage.getItem('isGlutenFree') === 'true');
    setIsLactoseFree(localStorage.getItem('isLactoseFree') === 'true');
    setIsKeto(localStorage.getItem('isKeto') === 'true');
    setIsKosher(localStorage.getItem('isKosher') === 'true');
    setIsHalal(localStorage.getItem('isHalal') === 'true');
    console.log('Loaded from localStorage:', otherRestrictions);
  }, []);

  const handleOtherRestrictionChange = (e) => {
    setOtherRestrictions(e.target.value);
    localStorage.setItem('otherRestrictions', e.target.value);
  };

  const handleGroceryStoreChange = (e) => {
    setGroceryStore(e.target.value);
    localStorage.setItem('groceryStore', e.target.value);
  }

  const handleIsVegetarianChange = (e) => {
    setIsVegetarian(e.target.checked);
    localStorage.setItem('isVegetarian', e.target.checked);
  };

  const handleIsPescatarianChange = (e) => {
    setIsPescatarian(e.target.checked);
    localStorage.setItem('isPescatarian', e.target.checked);
  };

  const handleIsVeganChange = (e) => {
    setIsVegan(e.target.checked);
    localStorage.setItem('isVegan', e.target.checked);
  };

  const handleIsGlutenFreeChange = (e) => {
    setIsGlutenFree(e.target.checked);
    localStorage.setItem('isGlutenFree', e.target.checked);
  };

  const handleIsLactoseFreeChange = (e) => {
    setIsLactoseFree(e.target.checked);
    localStorage.setItem('isLactoseFree', e.target.checked);
  };

  const handleIsKetoChange = (e) => {
    setIsKeto(e.target.checked);
    localStorage.setItem('isKeto', e.target.checked);
  };

  const handleIsKosherChange = (e) => {
    setIsKosher(e.target.checked);
    localStorage.setItem('isKosher', e.target.checked);
  };

  const handleIsHalalChange = (e) => {
    setIsHalal(e.target.checked);
    localStorage.setItem('isHalal', e.target.checked);
  };

  return (
    <React.Fragment>
      <Navigation />
      <Container>
        <Row className='mt-5'>
          <Col lg={3}>
            <Image
              src={accountLogo}
              style={{ width: '100%', height: 'auto' }}
              roundedCircle
            />
          </Col>
          <Col lg={9}>
            <h1>Welcome {username}!</h1>

            <Form.Group className='mb-3' controlId='formGroceryStore'>
              <Form.Label column sm='2'>
                Your grocery store:
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  value={groceryStore}
                  onChange={handleGroceryStoreChange}
                  type='text'
                  placeholder='Your grocery store'
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col lg={12}>
            <Form.Label>Dietary restrictions:</Form.Label>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Form>
              <Form.Check
                inline
                label='Vegetarian'
                checked={isVegetarian}
                onChange={handleIsVegetarianChange}
              />
              <Form.Check
                inline
                label='Pescatarian'
                checked={isPescatarian}
                onChange={handleIsPescatarianChange}
              />
              <Form.Check
                inline
                label='Vegan'
                checked={isVegan}
                onChange={handleIsVeganChange}
              />
              <Form.Check
                inline
                label='Gluten-free'
                checked={isGlutenFree}
                onChange={handleIsGlutenFreeChange}
              />
              <Form.Check
                inline
                label='Lactose-free'
                checked={isLactoseFree}
                onChange={handleIsLactoseFreeChange}
              />
              <Form.Check
                inline
                label='Keto'
                checked={isKeto}
                onChange={handleIsKetoChange}
              />
              <Form.Check
                inline
                label='Kosher'
                checked={isKosher}
                onChange={handleIsKosherChange}
              />
              <Form.Check
                inline
                label='Halal'
                checked={isHalal}
                onChange={handleIsGlutenFreeChange}
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Form.Group className='mb-3' controlId='formOther'>
            <Form.Label column sm='2'>
              Other:
            </Form.Label>
            <Col sm='10'>
              <Form.Control
                type='text'
                value={otherRestrictions}
                onChange={handleOtherRestrictionChange}
                placeholder='Other dietary restrictions'
              />
            </Col>
          </Form.Group>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Account;
