import React from 'react';
import '../components/Auth.css';

function Login() {
    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
