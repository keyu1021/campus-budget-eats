import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Account from './components/Account';

function App() {
  useEffect(() => {
    const isUserDataSet = localStorage.getItem('username') !== null;

    if (!isUserDataSet) {
      console.log('Setting initial data')
      // Set initial data in local storage
      localStorage.setItem('username', 'testName');
      localStorage.setItem('password', 'testPassword');
      localStorage.setItem('budget', 350);
      localStorage.setItem('groceryStore', 'Metro Avenue du Parc');
      localStorage.setItem('isVegetarian', true);
      localStorage.setItem('isPescatarian', false);
      localStorage.setItem('isVegan', false);
      localStorage.setItem('isGlutenFree', false);
      localStorage.setItem('isLactoseFree', false);
      localStorage.setItem('isKeto', false);
      localStorage.setItem('isKosher', false);
      localStorage.setItem('isHalal', false);
      localStorage.setItem('otherRestrictions', '');
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
