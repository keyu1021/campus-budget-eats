import React from 'react';
import '../components/Auth.css';

function Register() {
    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
