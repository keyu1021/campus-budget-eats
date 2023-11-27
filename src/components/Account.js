import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from '@firebase/firestore';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { GrFormEdit } from 'react-icons/gr';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';

import Navigation from './assets/Navigation';
import accountLogo from '../images/account-logo.png';
import { db } from '../firebase';

function Account() {
  const [document, setDocument] = useState(localStorage.getItem('userID'));
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
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    //Load data from database
    const fetchData = async () => {
      try {
        //Basic data
        const docRef = doc(db, 'users', document);
        const docSnap = await getDoc(docRef);
        setUsername(docSnap.data().username);
        setGroceryStore(docSnap.data().groceryStore);
        setOtherRestrictions(docSnap.data().otherRestrictions);

        //Preferences
        const docRefPreferences = doc(db, 'userPreferences', document);
        const docSnapPreferences = await getDoc(docRefPreferences);
        setIsVegetarian(docSnapPreferences.data().isVegetarian);
        setIsPescatarian(docSnapPreferences.data().isPescatarian);
        setIsVegan(docSnapPreferences.data().isVegan);
        setIsGlutenFree(docSnapPreferences.data().isGlutenFree);
        setIsLactoseFree(docSnapPreferences.data().isLactoseFree);
        setIsKeto(docSnapPreferences.data().isKeto);
        setIsKosher(docSnapPreferences.data().isKosher);
        setIsHalal(docSnapPreferences.data().isHalal);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleOtherRestrictionChange = async (e) => {
    setOtherRestrictions(e.target.value);
    const updateField = 'otherRestrictions';
    const newValue = e.target.value;
    try {
      const docRef = doc(db, 'users', document);
      await updateDoc(docRef, { [updateField]: newValue });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGroceryStoreChange = async (e) => {
    setGroceryStore(e.target.value);
    const updateField = 'groceryStore';
    const newValue = e.target.value;
    try {
      const docRef = doc(db, 'users', document);
      await updateDoc(docRef, { [updateField]: newValue });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsVegetarianChange = async (e) => {
    setIsVegetarian(e.target.checked);
    const updateField = 'isVegetarian';
    const newValue = e.target.checked;
    try {
      const docRefPreferences = doc(db, 'userPreferences', document);
      await updateDoc(docRefPreferences, { [updateField]: newValue });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsPescatarianChange = async (e) => {
    setIsPescatarian(e.target.checked);
    const updateField = 'isPescatarian';
    const newValue = e.target.checked;
    try {
      const docRefPreferences = doc(db, 'userPreferences', document);
      await updateDoc(docRefPreferences, { [updateField]: newValue });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsVeganChange = async (e) => {
    setIsVegan(e.target.checked);
    const updateField = 'isVegan';
    const newValue = e.target.checked;
    try {
      const docRefPreferences = doc(db, 'userPreferences', document);
      await updateDoc(docRefPreferences, { [updateField]: newValue });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsGlutenFreeChange = async (e) => {
    setIsGlutenFree(e.target.checked);
    const updateField = 'isGlutenFree';
    const newValue = e.target.checked;
    try {
      const docRefPreferences = doc(db, 'userPreferences', document);
      await updateDoc(docRefPreferences, { [updateField]: newValue });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsLactoseFreeChange = async (e) => {
    setIsLactoseFree(e.target.checked);
    const updateField = 'isLactoseFree';
    const newValue = e.target.checked;
    try {
      const docRefPreferences = doc(db, 'userPreferences', document);
      await updateDoc(docRefPreferences, { [updateField]: newValue });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsKetoChange = async (e) => {
    setIsKeto(e.target.checked);
    const updateField = 'isKeto';
    const newValue = e.target.checked;
    try {
      const docRefPreferences = doc(db, 'userPreferences', document);
      await updateDoc(docRefPreferences, { [updateField]: newValue });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsKosherChange = async (e) => {
    setIsKosher(e.target.checked);
    const updateField = 'isKosher';
    const newValue = e.target.checked;
    try {
      const docRefPreferences = doc(db, 'userPreferences', document);
      await updateDoc(docRefPreferences, { [updateField]: newValue });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsHalalChange = async (e) => {
    setIsHalal(e.target.checked);
    const updateField = 'isHalal';
    const newValue = e.target.checked;
    try {
      const docRefPreferences = doc(db, 'userPreferences', document);
      await updateDoc(docRefPreferences, { [updateField]: newValue });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCLick = () => {
    setEdit(true);
  };

  const handleSaveClick = () => {
    setEdit(false);
  };

  return (
    <React.Fragment>
      <Navigation />
      <Container>
        <Row className='mt-5'>
          <Col xs={3} lg={3}>
            <Image
              src={accountLogo}
              style={{ width: '100%', height: 'auto' }}
              roundedCircle
            />
          </Col>

          <Col lg={9} xs={12}>
            <h1>
              Welcome {username}!{' '}
              {!edit && (
                <IconContext.Provider value={{ style: { cursor: 'pointer' } }}>
                  <GrFormEdit onClick={handleEditCLick} />
                </IconContext.Provider>
              )}
              {edit && (
                <IconContext.Provider value={{ style: { cursor: 'pointer' } }}>
                  <RiCheckboxCircleLine onClick={handleSaveClick} />
                </IconContext.Provider>
              )}
            </h1>

            <Form.Group className='mb-3' controlId='formGroceryStore'>
              <Form.Label column sm='2'>
                Your grocery store:
              </Form.Label>

              <Col sm='10'>
                {!edit && (
                  <Form.Control
                    value={groceryStore}
                    onChange={handleGroceryStoreChange}
                    type='text'
                    placeholder='Your grocery store'
                    disabled
                  />
                )}
                {edit && (
                  <Form.Control
                    value={groceryStore}
                    onChange={handleGroceryStoreChange}
                    type='text'
                    placeholder='Your grocery store'
                  />
                )}
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
              {!edit && (
                <Form.Check
                  inline
                  label='Vegetarian'
                  checked={isVegetarian}
                  onChange={handleIsVegetarianChange}
                  disabled
                />
              )}
              {edit && (
                <Form.Check
                  inline
                  label='Vegetarian'
                  checked={isVegetarian}
                  onChange={handleIsVegetarianChange}
                />
              )}
              {!edit && (
                <Form.Check
                  inline
                  label='Pescatarian'
                  checked={isPescatarian}
                  onChange={handleIsPescatarianChange}
                  disabled
                />
              )}
              {edit && (
                <Form.Check
                  inline
                  label='Pescatarian'
                  checked={isPescatarian}
                  onChange={handleIsPescatarianChange}
                />
              )}
              {!edit && (
                <Form.Check
                  inline
                  label='Vegan'
                  checked={isVegan}
                  onChange={handleIsVeganChange}
                  disabled
                />
              )}
              {edit && (
                <Form.Check
                  inline
                  label='Vegan'
                  checked={isVegan}
                  onChange={handleIsVeganChange}
                />
              )}
              {!edit && (
                <Form.Check
                  inline
                  label='Gluten-free'
                  checked={isGlutenFree}
                  onChange={handleIsGlutenFreeChange}
                  disabled
                />
              )}
              {edit && (
                <Form.Check
                  inline
                  label='Gluten-free'
                  checked={isGlutenFree}
                  onChange={handleIsGlutenFreeChange}
                />
              )}
              {!edit && (
                <Form.Check
                  inline
                  label='Lactose-free'
                  checked={isLactoseFree}
                  onChange={handleIsLactoseFreeChange}
                  disabled
                />
              )}
              {edit && (
                <Form.Check
                  inline
                  label='Lactose-free'
                  checked={isLactoseFree}
                  onChange={handleIsLactoseFreeChange}
                />
              )}
              {!edit && (
                <Form.Check
                  inline
                  label='Keto'
                  checked={isKeto}
                  onChange={handleIsKetoChange}
                  disabled
                />
              )}
              {edit && (
                <Form.Check
                  inline
                  label='Keto'
                  checked={isKeto}
                  onChange={handleIsKetoChange}
                />
              )}
              {!edit && (
                <Form.Check
                  inline
                  label='Kosher'
                  checked={isKosher}
                  onChange={handleIsKosherChange}
                  disabled
                />
              )}
              {edit && (
                <Form.Check
                  inline
                  label='Kosher'
                  checked={isKosher}
                  onChange={handleIsKosherChange}
                />
              )}
              {!edit && (
                <Form.Check
                  inline
                  label='Halal'
                  checked={isHalal}
                  onChange={handleIsHalalChange}
                  disabled
                />
              )}
              {edit && (
                <Form.Check
                  inline
                  label='Halal'
                  checked={isHalal}
                  onChange={handleIsHalalChange}
                />
              )}
            </Form>
          </Col>
        </Row>
        <Row>
          <Form.Group className='mb-3' controlId='formOther'>
            <Form.Label column sm='2'>
              Other:
            </Form.Label>
            <Col sm='10'>
              {!edit && (
                <Form.Control
                  type='text'
                  value={otherRestrictions}
                  onChange={handleOtherRestrictionChange}
                  placeholder='Other dietary restrictions'
                  disabled
                />
              )}
              {edit && (
                <Form.Control
                  type='text'
                  value={otherRestrictions}
                  onChange={handleOtherRestrictionChange}
                  placeholder='Other dietary restrictions'
                />
              )}
            </Col>
          </Form.Group>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Account;
