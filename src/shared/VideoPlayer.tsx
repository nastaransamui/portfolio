import { FC, useEffect, useRef } from 'react';

type Props = { playing: boolean }
const VideoPlayer: FC<Props> = ({ playing }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!playing && videoRef.current) {
      videoRef.current.pause();
    }
  }, [playing]);

  return (
    <video
      ref={videoRef}
      src="img/projects/video.mp4"
      id="video"
      className="responsive-video"
      aria-label="Project demonstration video"
      controls
      poster="img/projects/project-6.jpg"
    />
  );
}

export default VideoPlayer;
