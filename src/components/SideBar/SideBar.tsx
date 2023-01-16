import React from 'react';

import styles from './SideBar.module.css';

interface SideBarProps {
  streamer: string;
  videoLabel: string;
  redditScore: number;
  children: React.ReactNode;
}

const SideBar = (props: SideBarProps) => {
  const {
    streamer,
    videoLabel,
    children,
    redditScore,
  } = props;

  return (
    <div>
      <div className={`${styles.leftSideBar} ${styles.sideBar}`} />
      {children}
      <div className={`${styles.rightSideBar} ${styles.sideBar}`}>
        <div className={styles.videoLabel}>
          {videoLabel}
        </div>
        <div className={styles.streamer}>
          <a
            href={`https://www.twitch.tv/${streamer}`}
            className={styles.streamer}
            target="_blank"
            rel="noopener noreferrer"
          >
            {streamer}
          </a>
        </div>
        <div className={styles.redditScore}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06 7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>

          -
          {' '}
          {redditScore}
          {' '}
          likes
        </div>
      </div>
    </div>
  );
};

export default SideBar;
