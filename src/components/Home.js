import React from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Navigation from './assets/Navigation';
import Expenses from './assets/Expenses';

import styles from '../styles/Home.module.css';

function Home(){
    const remaining = 66;
    const budget = 350;
    const percentage = Math.round(((budget - remaining) / budget) * 100);

    return (
        <React.Fragment>
            <Navigation />

            <div className={styles['flex-container']}>

                <div className={styles['item-container-center']}>

                    <h3>October's food budget : </h3>
                    <div className={styles['progress-container']}>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} />
                    </div>
                    <h3>{remaining}$ of {budget}$ remaining</h3>

                </div>

                <div className={styles['item-container-left']}>
                    <h3>Monthly expenses</h3>
                    <Expenses />
                </div>

            </div>
        </React.Fragment>
    )
}

export default Home;