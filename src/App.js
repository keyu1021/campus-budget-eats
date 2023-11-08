import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;
