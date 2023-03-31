/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';

import styles from './VideoPlayer.module.css';
import ChevronArrow from '../ChevronArrow/ChevronArrow';
import PreviewVideo from './PreviewVideo';

interface VideoPlayerProps {
  preloadedPreviousVideo?: string;
  previousVideo?: string;
  currentVideo: string;
  nextVideo: string;
  preloadedNextVideo: string;
  isVideoLoaded: boolean;
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const {
    preloadedPreviousVideo,
    previousVideo,
    currentVideo,
    nextVideo,
    preloadedNextVideo,
    isVideoLoaded,
  } = props;

  return (
    <div className={styles.container}>
      {isVideoLoaded && (
        <>
          {
            preloadedPreviousVideo && (
              <PreviewVideo
                videoID={preloadedPreviousVideo}
                key={preloadedPreviousVideo}
                style={{ display: 'none' }}
              />
            )
          }
          {
            previousVideo
              ? <PreviewVideo videoID={previousVideo} key={previousVideo} />
              : <div className={`${styles.video} ${styles.emptyVideo} ${styles.previewVideo}`} />
          }
        </>
      )}

      <ChevronArrow direction="up" />
      <PreviewVideo videoID={currentVideo} isCurrentVideo key={currentVideo} />
      <ChevronArrow direction="down" />

      {isVideoLoaded && (
        <>
          <PreviewVideo videoID={nextVideo} key={nextVideo} />
          <PreviewVideo videoID={preloadedNextVideo} key={preloadedNextVideo} style={{ display: 'none' }} />
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
