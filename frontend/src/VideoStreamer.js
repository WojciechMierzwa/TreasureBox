import React, { useState } from 'react';

const VideoStreamer = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleLoadVideo = () => {
    const filePath = 'D:\\song.mp4';
    const encodedPath = encodeURIComponent(filePath);
    const url = `http://localhost:8080/video?path=${encodedPath}`;
    setVideoUrl(url);
  };

  return (
    <div>
      <button onClick={handleLoadVideo}>Odtwórz D:\song.mp4</button>

      {videoUrl && (
        <video
          controls
          width="640"
          height="360"
          src={videoUrl}
          style={{ marginTop: '20px' }}
        />
      )}
    </div>
  );
};

export default VideoStreamer;
