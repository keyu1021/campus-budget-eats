import React from 'react';
import styles from './../styles/Auth.module.css';

function Register() {
    return (
        <div className={styles['auth-container']}>
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