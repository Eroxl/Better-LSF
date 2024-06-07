/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from 'react';

import styles from './VideoPlayer.module.css';
import PauseIcon from '../PauseIcon/PauseIcon';
import ChevronArrow from '../ChevronArrow/ChevronArrow';

interface PreviewVideoProps {
  videoID: string;
  isCurrentVideo?: boolean;
  style?: React.CSSProperties;
}

const PreviewVideo = (props: PreviewVideoProps) => {
  const { videoID, isCurrentVideo, style } = props;

  const [isPaused, setIsPaused] = useState(false);
  const canPlay = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isCurrentVideo) {
      setIsPaused(false);
      return;
    }

    if (isPaused) {
      videoRef.current?.pause();
      return;
    }

    if (!canPlay.current) return;

    videoRef.current?.play();
  }, [isPaused]);

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

    try {
      videoRef.current?.pause();
    } catch (error) {
      console.error('Error pausing video', error);
    }
  }, [videoRef, isCurrentVideo]);

  return (
    <>
      {isCurrentVideo && <ChevronArrow direction='up'/>}
      <video
        className={`${styles.video} ${isCurrentVideo || styles.previewVideo}`}
        loop
        autoPlay
        ref={videoRef}
        style={style}
        onClick={() => {
          setIsPaused(!isPaused);
          canPlay.current = true;
        }}
        preload='auto'
        id={videoID}
        onLoadedData={() => {
          if (!isCurrentVideo) return;

          document.dispatchEvent(new Event('videoLoaded'));
        }}
        src={`https://livestreamfails-video-prod.b-cdn.net/video/${videoID}`}
      >
        <source
          src={`https://livestreamfails-video-prod.b-cdn.net/video/${videoID}`}
          type="video/mp4"
        />
      </video>
      {isPaused && (
        <PauseIcon
          setIsPaused={setIsPaused}
        />
      )}
      {isCurrentVideo && <ChevronArrow direction='down'/>}
    </>
  );
};

export default PreviewVideo;
