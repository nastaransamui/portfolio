import { FC } from "react";

type Props = {
  playing: boolean
}

const YouTubeVideo: FC<Props> = ({ playing }) => {
  if (!playing) return <div className="videocontainer" style={{ minHeight: '300px' }} />;
  return (
    <div className="videocontainer">
      <iframe
        title="Project demonstration video"
        className="youtube-video"
        src="https://www.youtube.com/embed/7e90gBu4pas?enablejsapi=1&version=3&playerapiid=ytplayer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default YouTubeVideo;
