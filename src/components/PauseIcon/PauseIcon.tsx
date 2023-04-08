import React from 'react';

import styles from './PauseIcon.module.css';

interface PauseIconProps {
  setIsPaused: (isPaused: boolean) => void;
}

const PauseIcon = (props: PauseIconProps) => {
  const { setIsPaused } = props;

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.pauseIcon}
      onClick={
        (e) => {
          e.stopPropagation();
          setIsPaused(false);
        }
      }
    >
      <circle cx="18" cy="18" r="18" fill="#3498db" />
      <path
        d="M12 12V24H16V12H12ZM20 12V24H24V12H20Z"
        fill="white"
      />
    </svg>
  );
};

export default PauseIcon;
