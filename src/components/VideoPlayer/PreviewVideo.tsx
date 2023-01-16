/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';

import styles from './VideoPlayer.module.css';

interface PreviewVideoProps {
  videoID: string;
  isCurrentVideo?: boolean;
  style?: React.CSSProperties;
}

const PreviewVideo = (props: PreviewVideoProps) => {
  const { videoID, isCurrentVideo, style } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  const pauseVideo = (e: React.MouseEvent<HTMLVideoElement>) => {
    if (!(e.target instanceof HTMLVideoElement)) return;

    if (e.target.paused) {
      e.target.play();
      return;
    }

    e.target.pause();
  };

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;

    if (isCurrentVideo) {
      if (!videoRef.current.readyState) {
        return;
      }
      videoRef.current.play();
      return;
    }

    videoRef.current?.pause();
  }, [videoRef, isCurrentVideo]);

  return (
    <video
      className={`${styles.video} ${isCurrentVideo || styles.previewVideo}}`}
      loop
      autoPlay
      ref={videoRef}
      style={style}
      onClick={isCurrentVideo ? pauseVideo : undefined}
      src={`https://livestreamfails-video-prod.b-cdn.net/video/${videoID}`}
    >
      <source
        src={`https://livestreamfails-video-prod.b-cdn.net/video/${videoID}`}
        type="video/mp4"
      />
    </video>
  );
};

export default PreviewVideo;
