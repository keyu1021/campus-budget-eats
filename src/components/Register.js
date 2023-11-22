import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { db } from '../firebase';
import { addDoc, collection, getDocs } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';

import styles from './../styles/Auth.module.css';

function Register() {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const collectionRef = collection(db, 'users');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    let data = {
      username: inputUsername,
      password: inputPassword,
    };

    //Check if the user already exists
    let tempError = false;
    try {
      const docSnap = await getDocs(collectionRef);
      docSnap.forEach((doc) => {
        if (doc.data().username === inputUsername) {;
          setIsError(true);
          tempError = true;
        }
      });
    } catch (error) {
      console.log(error);
    }

    //If not, add to the database and bring to the home page
    if (!tempError) {
      try {
        const docRef = await addDoc(collectionRef, data);
        localStorage.setItem('userID', docRef.id);
        navigate('/home');
      } catch (error) {
        console.log(error);
      }

      setInputUsername('');
      setInputPassword('');
      setIsError(false);
    }
  };

  return (
    <div className={styles['auth-container']}>
      <h2>Register</h2>
      <form>
        <input
          type='text'
          placeholder='Username'
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        {isError && (
          <p className={styles['error-text']}>
            User already exists,{' '}
            <LinkContainer to='/login'>
              <b className={styles['link']}>click here to login.</b>
            </LinkContainer>
          </p>
        )}
        <button type='submit' onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
