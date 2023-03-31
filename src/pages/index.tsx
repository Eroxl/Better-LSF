import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/Home.module.css';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import SideBar from '../components/SideBar/SideBar';

interface Clip {
  videoId: string;
  id: string;
  label: string;
  redditScore: number;
  streamer: {
    sourceLink: string;
    label: string;
  }
}

const Home = () => {
  const [videos, setVideos] = useState<Clip[]>([]);
  const [currentMax, setCurrentMax] = useState('');
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const router = useRouter();
  const clipID = router.query.clip as string | undefined;

  const parseClip = (clip: Clip): Clip => ({
    videoId: clip.videoId,
    id: clip.id,
    label: clip.label,
    redditScore: clip.redditScore,
    streamer: {
      sourceLink: clip.streamer.sourceLink,
      label: clip.streamer.label,
    },
  });

  useEffect(() => {
    if (videos[currentVideo - 1]) {
      window.history.replaceState(
        {},
        '',
        `/Better-LSF/?clip=${videos[currentVideo - 1].id}`,
      );
    }

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
    if (!router.query) return;

    fetch(`https://api.livestreamfails.com/clips?querySort=new&queryMinScore=500&queryAfter=${clipID}`)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.map(parseClip));

        setCurrentMax(data[data.length - 1].id);
      });
  }, [clipID]);

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

  useEffect(() => {
    const handleVideoLoaded = () => {
      setIsVideoLoaded(true);

      document.removeEventListener('videoLoaded', handleVideoLoaded);
    };

    document.addEventListener('videoLoaded', handleVideoLoaded);

    return () => {
      document.removeEventListener('videoLoaded', handleVideoLoaded);
    };
  }, []);

  return (
    <div className={styles.container}>
      <SideBar
        streamer={videos[currentVideo]?.streamer.label || ''}
        videoLabel={videos[currentVideo]?.label || ''}
        redditScore={videos[currentVideo]?.redditScore || 0}
      >
        <VideoPlayer
          preloadedPreviousVideo={currentVideo <= 1 ? undefined : videos[currentVideo - 2].videoId}
          previousVideo={currentVideo === 0 ? undefined : videos[currentVideo - 1].videoId}
          currentVideo={videos[currentVideo]?.videoId}
          nextVideo={videos[currentVideo + 1]?.videoId}
          preloadedNextVideo={videos[currentVideo + 2]?.videoId}
          isVideoLoaded={isVideoLoaded}
        />
      </SideBar>
    </div>
  );
};

export default Home;
