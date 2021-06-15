import React from 'react';
import styles from './Textarea.module.css';

const Textarea = ({label, name, value, onChange, error, onBlur, checked, onClick, disabled, onKeyUp, rows}) => {
    return (
        <div className={styles.wrapper}>
            <label htmlFor={name} className={styles.label}>
                {label}
            </label>
            <textarea
                name={name}
                id={name}
                rows={rows}
                className={styles.input}
                value={value}
                onChange={onChange}
                onClick={onClick}
                onBlur={onBlur}
                checked={checked}
                autoComplete="off"
                disabled={disabled}
                onKeyUp={onKeyUp}
            ></textarea>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default Textarea;