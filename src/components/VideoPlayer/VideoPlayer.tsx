/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

import styles from './VideoPlayer.module.css';
import PreviewVideo from './PreviewVideo';
import { Clip } from '../../pages';

interface VideoPlayerProps {
  currentVideo: number,
  videos: Clip[],
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const {
    videos,
    currentVideo,
  } = props;

  return (
    <div className={styles.container}>
      {
        currentVideo === 0 && (
          <>
            <div className={`${styles.video} ${styles.emptyVideo} ${styles.previewVideo}`} />
            <div className={`${styles.video} ${styles.emptyVideo} ${styles.previewVideo}`} />
          </>
        )
      }
      {
        currentVideo === 1 && <div className={`${styles.video} ${styles.emptyVideo} ${styles.previewVideo}`} />
      }
      {
        videos
          .map((clip, index) => {
            if (
              currentVideo < index - 2
              || currentVideo > index + 2
            ) return undefined;

            return (
              <PreviewVideo
                videoID={clip.videoId}
                isCurrentVideo={currentVideo === index}
                key={clip.videoId}
              />
            );
          })
      }
    </div>
  );
};

export default VideoPlayer;
