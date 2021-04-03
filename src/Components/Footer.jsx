import React from 'react';
import styles from './Footer.module.css';
import { ReactComponent as Logo } from '../Assets/logofooter.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
      <p>4|School. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;