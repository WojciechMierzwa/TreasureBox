import React from 'react';

function VideoPlayer() {
  return (
    <div>
      <video
        controls
        crossOrigin="anonymous"
        style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
      >
        <source src="http://192.168.0.4:8080/video" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;