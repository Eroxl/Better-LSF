import React, { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';

interface Clip {
  videoId: string;
  label: string;
  streamer: {
    sourceLink: string;
    label: string;
  }
}

const Home = () => {
  const [videos, setVideos] = useState<Clip[]>([]);
  const [currentMax, setCurrentMax] = useState('');
  const [currentVideo, setCurrentVideo] = useState(0);

  const parseClip = (clip: Clip): Clip => ({
    videoId: clip.videoId,
    label: clip.label,
    streamer: {
      sourceLink: clip.streamer.sourceLink,
      label: clip.streamer.label,
    },
  });

  useEffect(() => {
    if (currentVideo === videos.length - 6) {
      fetch(`https://api.livestreamfails.com/clips?querySort=new&queryMinScore=500&queryAfter=${currentMax}`)
        .then((response) => response.json())
        .then((data) => {
          setVideos([
            ...videos,
            ...data.map(parseClip),
          ]);

          setCurrentMax(data[data.length - 1].id);
        });
    }

    // ~ Free up memory
    if (currentVideo >= 250) {
      setVideos(videos.slice(currentVideo - 200));
      setCurrentVideo(50);
    }
  }, [currentVideo]);

  useEffect(() => {
    fetch('https://api.livestreamfails.com/clips?querySort=new&queryMinScore=500')
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.map(parseClip));

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
        preloadedPreviousVideo={currentVideo <= 1 ? undefined : videos[currentVideo - 2].videoId}
        previousVideo={currentVideo === 0 ? undefined : videos[currentVideo - 1].videoId}
        currentVideo={videos[currentVideo]?.videoId}
        nextVideo={videos[currentVideo + 1]?.videoId}
        preloadedNextVideo={videos[currentVideo + 2]?.videoId}
      />
    </div>
  );
};

export default Home;
