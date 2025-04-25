import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, Maximize } from 'lucide-react';

function Test() {
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  const apiUrl = `${backendAddress}/video`;
  
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  
  const handlePlayPause = () => {
    setPlaying(!playing);
  };
  
  const handleProgress = (state) => {
    setProgress(state.played);
  };
  
  const handleDuration = (duration) => {
    setDuration(duration);
  };
  
  const handleSeek = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const seekPos = (e.clientX - bounds.left) / bounds.width;
    playerRef.current.seekTo(seekPos);
  };
  
  const handleBackward = () => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(Math.max(0, currentTime - 15));
  };
  
  const handleForward = () => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(Math.min(duration, currentTime + 15));
  };
  
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-black" 
      style={{ maxWidth: '60vw', margin: 'auto' }}
    >
      <ReactPlayer
        ref={playerRef}
        url={apiUrl}
        playing={playing}
        width="100%"
        height="100%"
        style={{ borderRadius: '12px', overflow: 'hidden' }}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
      
      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4">
        <div className="flex items-center justify-between mb-2">
          
          <div className="flex-grow">
            {/* Gold progress bar */}
            <div 
              className="h-4 bg-gray-600 rounded-full cursor-pointer relative"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-yellow-500 rounded-full"
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-white text-sm ">
              <span>{formatTime(duration * progress)}</span>
              <span>{formatTime(duration-duration * progress)}</span>
            </div>
          </div>
        </div>
        
        <div className='flex items-center'>
        <button 
            onClick={handlePlayPause}
            className="text-white hover:text-gray-300 mx-10"
          >
            {playing ? <Pause size={48} /> : <Play size={48} />}
          </button>
          <button 
            onClick={handleBackward}
            className="text-white hover:text-gray-300 mx-2"
          >
            <SkipBack size={36} />
          </button>
          
          
          
          <button 
            onClick={handleForward}
            className="text-white hover:text-gray-300 mx-10"
          >
            <SkipForward size={36} />
          </button>
          
          <button 
            onClick={handleFullscreen}
            className="text-white hover:text-gray-300 ml-auto mr-4"
          >
            <Maximize size={36} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Test;