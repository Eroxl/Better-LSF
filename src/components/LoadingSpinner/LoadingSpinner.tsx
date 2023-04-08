import React from 'react';

import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => (
  <div className={styles.container}>
    <div className={styles.spinner} />
  </div>
);

export default LoadingSpinner;
