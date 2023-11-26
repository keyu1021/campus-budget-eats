import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { collection, getDocs } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { db } from '../firebase';

import styles from './../styles/Auth.module.css';

function Login() {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [userNotExist, setUserNotExist] = useState(false);

  const collectionRef = collection(db, 'users');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    //Find the username, match with input password
    let tempIsWrongPassword = false;
    let tempUserNotExist = true;
    try {
      const docSnap = await getDocs(collectionRef);
      docSnap.forEach((doc) => {
        if (doc.data().username === inputUsername) {
          if (doc.data().password === inputPassword) {
            localStorage.setItem('userID', doc.id);
            tempUserNotExist = false;
          } else {
            tempIsWrongPassword = true;
            tempUserNotExist = false;
          }
        }
      });
    } catch (error) {
      console.log(error);
    }

    if (!tempIsWrongPassword && !tempUserNotExist) {
      navigate('/home');
      setInputUsername('');
      setInputPassword('');
      console.log(localStorage.getItem('userID'));
    } else {
      setIsWrongPassword(tempIsWrongPassword);
      setUserNotExist(tempUserNotExist);
    }
  };

  return (
    <div className={styles['auth-container']}>
      <h2>Login</h2>
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
        {isWrongPassword && (
          <p className={styles['error-text']}>Wrong password</p>
        )}
        {userNotExist && (
          <p className={styles['error-text']}>
            User does not exist,{' '}
            <LinkContainer to='/register'>
              <b className={styles['link']}>click here to register.</b>
            </LinkContainer>
          </p>
        )}
        <button type='submit' onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
