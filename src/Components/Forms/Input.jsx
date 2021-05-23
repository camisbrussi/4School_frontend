import React from 'react';
import styles from './Input.module.css';

import InputMask from "react-input-mask";

const Input = ({ label, type, name, value, onChange, error, onBlur, checked, onClick, mask, disabled, onKeyUp  }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <InputMask
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        checked={checked}
        autoComplete="off"
        mask = {mask}
        disabled = {disabled}
        onKeyUp = {onKeyUp}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;