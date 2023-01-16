import React from 'react';

import styles from './ChevronArrow.module.css';

interface ChevronArrowProps {
  direction: 'up' | 'down' | 'left' | 'right';
}

const ChevronArrow = (props: ChevronArrowProps) => {
  const { direction } = props;

  const arrowDirection = {
    up: styles.upArrow,
    down: '',
    left: styles.leftArrow,
    right: styles.rightArrow,
  }[direction];

  return (
    <svg
      className={`${arrowDirection} ${styles.chevronArrow}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 15L16.5 10.5L15.08 9.08L12 12.17L8.92 9.08L7.5 10.5L12 15Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ChevronArrow;
