import React from 'react';
import { Outlet, Link } from "react-router-dom";

import Button from './assets/Button'

function Welcome() {
    return (
        <div>
            <h1>Student Budgeting for balanced meals</h1>
            <h3>Welcome !</h3>
            <Link to='/register'><Button colorStyle='button-red' text='Sign Up'/></Link>
            <Link to='/login'><Button colorStyle='button-green' text='Log In'/></Link>

            <Outlet />
        </div>
    )
}

export default Welcome;

