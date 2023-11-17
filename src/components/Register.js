import React, { useState, useContext } from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import styles from './../styles/Auth.module.css';

function Register() {

  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleRegister = (e) => {
    localStorage.setItem('username', inputUsername)
    localStorage.setItem('password', inputPassword)
    setInputUsername('')
    setInputPassword('')
  }


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
        <LinkContainer to='/home'>
          <button type='submit' onClick={handleRegister}>
            Register
          </button>
          </LinkContainer>
      </form>
    </div>
  );
}

export default Register;
