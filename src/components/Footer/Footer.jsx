import React from 'react';
import styles from './Footer.module.scss';
import packageJson from '../../../package.json';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
      ©2025{' '}
        <a
          href="https://github.com/IrvinDale"
          target="_blank"
          rel="noopener noreferrer"
        >
          Irvin Dale
        </a>
        <span data-testid="version" className={styles.version}>v{packageJson.version}</span>
      </p>
    </footer>
  );
}

export default Footer;