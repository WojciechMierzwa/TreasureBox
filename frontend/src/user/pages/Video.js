import { useState, useRef, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Maximize } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

function Video({ mode }) {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [endpoint, setEndpoint] = useState();
  console.log(userId);
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  const apiUrl = `${backendAddress}/watch/${mode}?id=${id}`;
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [volume, setVolume] = useState(0.8); 
  const [muted, setMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const hideVolumeSliderTimeout = useRef(null);
  const [showControls, setShowControls] = useState(true);
  const idleTimeout = useRef(null);
  const progressUpdateInterval = useRef(null);
  const [userProgressId, setUserProgressId] = useState(null);
  const lastTimeUpdateRef = useRef(0);

  const playerRef = useRef(null);
  const containerRef = useRef(null);
  
  const initializationRef = useRef({
    started: false,
    completed: false,
  });
  
  const initializeUserProgress = useCallback(async () => {
    if (!id || !userId || initializationRef.current.started) return;
    initializationRef.current.started = true;
  
    try {
      // 1. Określamy endpointy w Twojej oryginalnej konwencji
      const checkEndpoint = mode === 'episode' 
        ? `${backendAddress}/api/user-episodes/user/${userId}`
        : `${backendAddress}/api/user-films/${userId}`;
  
      // 2. Sprawdzamy istniejące rekordy
      const res = await fetch(checkEndpoint);
      const data = await res.json();
      
      // 3. Szukamy pasującego rekordu
      const existingRecord = Array.isArray(data) 
        ? data.find(item => 
            mode === 'episode' 
              ? item.episode?.id === parseInt(id)
              : item.film?.id === parseInt(id)
        ) 
        : null;
  
      // 4. Jeśli znaleziono - używamy istniejącego
      if (existingRecord) {
        setUserProgressId(existingRecord.id);
        if (existingRecord.timeWatched && playerRef.current) {
          playerRef.current.seekTo(existingRecord.timeWatched);
        }
        return;
      }
  
      // 5. Jeśli nie znaleziono - tworzymy nowy rekord
      const createEndpoint = mode === 'episode'
        ? `${backendAddress}/api/user-episodes`
        : `${backendAddress}/api/user-films`;
  
      const body = mode === 'episode'
        ? {
            appUser: { id: parseInt(userId) },
            episode: { id: parseInt(id) },
            timeWatched: 0
          }
        : {
            appUser: { id: parseInt(userId) },
            film: { id: parseInt(id) },
            timeWatched: 0
          };
  
      const createRes = await fetch(createEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
  
      const newRecord = await createRes.json();
      setUserProgressId(newRecord.id);
  
    } catch (error) {
      console.error("Error initializing progress:", error);
      initializationRef.current.started = false;
    } finally {
      initializationRef.current.completed = true;
    }
  }, [id, userId, mode, backendAddress]);
  
  // Wywołanie z zabezpieczeniem
  useEffect(() => {
    if (id && userId && !initializationRef.current.completed) {
      initializeUserProgress();
    }
  }, [id, userId, initializeUserProgress]);

  // Function to update user progress
  const updateUserProgress = async () => {
    if (!userProgressId || !playerRef.current) return;
    
    try {
      const currentTime = Math.floor(playerRef.current.getCurrentTime());
      
      // Only update if time has changed by at least 1 second
      if (currentTime === lastTimeUpdateRef.current) return;
      lastTimeUpdateRef.current = currentTime;
      
      const endpoint = mode === 'episode' 
        ? `${backendAddress}/api/user-episodes/${userProgressId}`
        : `${backendAddress}/api/user-films/${userProgressId}`;
        
      await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeWatched: currentTime
        })
      });
    } catch (error) {
      console.error("Error updating user progress:", error);
    }
  };

  // Initialize user progress when component mounts
  useEffect(() => {
    if (id && userId) {
      initializeUserProgress();
    }
  }, [id, userId, mode]);

  // Set up interval to update progress every 10 seconds
  useEffect(() => {
    if (playing && userProgressId) {
      progressUpdateInterval.current = setInterval(() => {
        updateUserProgress();
      }, 10000); // 10 seconds
    }
    
    return () => {
      if (progressUpdateInterval.current) {
        clearInterval(progressUpdateInterval.current);
      }
    };
  }, [playing, userProgressId]);

  // Update progress when video is paused or component unmounts
  useEffect(() => {
    return () => {
      if (userProgressId && playerRef.current) {
        updateUserProgress();
      }
    };
  }, [userProgressId]);

  useEffect(() => {
    const resetIdleTimer = () => {
      setShowControls(true);
      clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000); 
    };
  
    const container = containerRef.current;
    container.addEventListener('mousemove', resetIdleTimer);
    container.addEventListener('click', resetIdleTimer);
  
    resetIdleTimer();
  
    return () => {
      container.removeEventListener('mousemove', resetIdleTimer);
      container.removeEventListener('click', resetIdleTimer);
      clearTimeout(idleTimeout.current);
    };
  }, []);
  
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
    
    // Also update the backend immediately after seeking
    setTimeout(() => {
      updateUserProgress();
    }, 500);
  };
  
  const handleBackward = () => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(Math.max(0, currentTime - 15));
    
    // Update progress after seeking
    setTimeout(() => {
      updateUserProgress();
    }, 500);
  };
  
  const handleForward = () => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(Math.min(duration, currentTime + 15));
    
    // Update progress after seeking
    setTimeout(() => {
      updateUserProgress();
    }, 500);
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

  const toggleMute = () => {
    setMuted(!muted);
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };
  
  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
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
        volume={volume}
        muted={muted}
        style={{ borderRadius: '12px', overflow: 'hidden' }}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
      
      <div className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center justify-between">
          <div className="flex-grow">
            <div 
              className="h-2 bg-gray-200 rounded-full cursor-pointer relative"
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
        
        <div className="flex items-center">
          <button 
            onClick={handlePlayPause}
            className="text-white hover:text-gray-300 mx-10"
          >
            {playing ? <Pause size={36} /> : <Play size={36} />}
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
          
          <div className="ml-auto flex items-center">
            <div
              className="relative flex flex-col items-center"
              onMouseEnter={() => {
                clearTimeout(hideVolumeSliderTimeout.current);
                setShowVolumeSlider(true);
              }}
              onMouseLeave={() => {
                hideVolumeSliderTimeout.current = setTimeout(() => {
                  setShowVolumeSlider(false);
                }, 500);
              }}
            >
              {showVolumeSlider && (
                <div className="absolute bottom-full mb-2 bg-black bg-opacity-80 p-2 rounded-lg">
                  <div className="h-24 flex items-center justify-center w-4">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={muted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="h-2 w-24 bg-gray-200 rounded-full appearance-none cursor-pointer"
                      style={{
                        transform: 'rotate(-90deg)',
                        background: `linear-gradient(to right, #EAB308 0%, #EAB308 ${(muted ? 0 : volume) * 100}%, #E5E7EB ${(muted ? 0 : volume) * 100}%, #E5E7EB 100%)`
                      }}
                    />
                  </div>
                </div>
              )}
              <button 
                onClick={toggleMute}
                className="text-white hover:text-gray-300 mx-10 "
              >
                {muted || volume === 0 ? <VolumeX size={36} /> : <Volume2 size={36} />}
              </button>
            </div>
            <button 
              onClick={handleFullscreen}
              className="text-white hover:text-gray-300 mr-4"
            >
              <Maximize size={36} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;