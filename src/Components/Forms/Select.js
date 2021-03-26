import React from 'react';
import styles from './Select.module.css';

const Select = ({ label, type, name, value, onChange, error, onBlur, checked }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        checked={checked}
        autoComplete="off"
      >
        <option value="0">Selecione</option>
      </select>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Select;