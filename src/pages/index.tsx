import React, { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';

const Home = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const [currentMax, setCurrentMax] = useState('');
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    if (currentVideo === videos.length - 6) {
      fetch(`https://api.livestreamfails.com/clips?querySort=new&queryMinScore=500&queryAfter=${currentMax}`)
        .then((response) => response.json())
        .then((data) => {
          setVideos([
            ...videos,
            ...data.map((video: { videoId: string }) => video.videoId),
          ]);

          setCurrentMax(data[data.length - 1].id);
        });
    }
  }, [currentVideo]);

  useEffect(() => {
    fetch('https://api.livestreamfails.com/clips?querySort=new&queryMinScore=500')
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.map((video: { videoId: string }) => video.videoId));

        setCurrentMax(data[data.length - 1].id);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setCurrentVideo((prev) => (prev === 0 ? prev : prev - 1));
      } else if (e.key === 'ArrowDown') {
        setCurrentVideo((prev) => (prev === videos.length - 1 ? prev : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [videos]);

  return (
    <div className={styles.container}>
      <VideoPlayer
        preloadedPreviousVideo={currentVideo <= 1 ? undefined : videos[currentVideo - 2]}
        previousVideo={currentVideo === 0 ? undefined : videos[currentVideo - 1]}
        currentVideo={videos[currentVideo]}
        nextVideo={videos[currentVideo + 1]}
        preloadedNextVideo={videos[currentVideo + 2]}
      />
    </div>
  );
};

export default Home;
