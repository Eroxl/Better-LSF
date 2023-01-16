/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

import styles from './VideoPlayer.module.css';
import ChevronArrow from '../ChevronArrow/ChevronArrow';
import PreviewVideo from './PreviewVideo';

interface VideoPlayerProps {
  previousVideo?: string;
  currentVideo: string;
  nextVideo: string;
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const {
    previousVideo,
    currentVideo,
    nextVideo,
  } = props;

  return (
    <div className={styles.container}>
      {previousVideo
        ? (
          <PreviewVideo videoID={previousVideo} key={previousVideo} />
        )
        : <div className={`${styles.video} ${styles.emptyVideo} ${styles.previewVideo}`} />}
      <ChevronArrow direction="up" />
      <PreviewVideo videoID={currentVideo} isCurrentVideo key={currentVideo} />
      <ChevronArrow direction="down" />
      <PreviewVideo videoID={nextVideo} key={nextVideo} />
    </div>
  );
};

export default VideoPlayer;
