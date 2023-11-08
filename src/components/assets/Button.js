import React from 'react';
import styles from '../../styles/Button.module.css';

function Button(props) {
    const colorStyle = styles[props.colorStyle];

    return (
        <div className={styles['button-container']}>
            <button className={colorStyle}>{props.text}</button>
        </div>
    )

}

export default Button;