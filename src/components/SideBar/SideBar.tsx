import React from 'react';

import styles from './SideBar.module.css';

interface SideBarProps {
  streamer: string;
  videoLabel: string;
  redditScore: number;
  redditId: string;
  children: React.ReactNode;
}

const SideBar = (props: SideBarProps) => {
  const {
    streamer,
    videoLabel,
    children,
    redditScore,
    redditId
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

        <div
          className={styles.breaker}
        />

        <div className={styles.redditLink}>
          <a
            href={`https://reddit.com/r/livestreamfails/comments/${redditId}`}
            className={styles.redditLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
              <path d="m21 3-9 9" />
              <path d="M15 3h6v6" />
            </svg>

            <span>
              Source
            </span>
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

          <span>
            {redditScore}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
