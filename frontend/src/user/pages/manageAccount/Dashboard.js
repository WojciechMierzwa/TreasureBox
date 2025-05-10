import React, { useEffect, useState } from 'react';
import { Clock, Film, Tv } from 'lucide-react';

function Dashboard() {
  const [numberOfEpisodes, setNumberOfEpisodes] = useState(0);
  const [numberOfMovies, setNumberOfMovies] = useState(0);
  const [totalTimeWatched, setTotalTimeWatched] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  const id = localStorage.getItem("userId");
  const name = localStorage.getItem("username");

  useEffect(() => {
    if (!backendAddress || !id) return; 

    const fetchCounts = async () => {
      setIsLoading(true); 
      try {
        const [filmsRes, episodesRes] = await Promise.all([
          fetch(`${backendAddress}/api/user-films/user/count/${id}`),
          fetch(`${backendAddress}/api/user-episodes/user/count/${id}`)
        ]);
        if (!filmsRes.ok || !episodesRes.ok) {
          throw new Error("One of the fetch requests failed");
        }
        const [films, episodes] = await Promise.all([
          filmsRes.json(),
          episodesRes.json()
        ]);

        const totalFilmTimeWatched = films.timeWatched || 0;
        const totalEpisodeTimeWatched = episodes.timeWatched || 0;
        const totalTimeWatched = totalFilmTimeWatched + totalEpisodeTimeWatched;

        setNumberOfMovies(films.episodeCount || 0); 
        setNumberOfEpisodes(episodes.episodeCount || 0); 
        setTotalTimeWatched(totalTimeWatched); 

      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchCounts(); 
  }, [backendAddress, id]); 

  const formatTime = (seconds) => {
    const totalMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };



  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your watch data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto  min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Hello 👋 {name} </h1>
        <p className="text-gray-500">Track your stats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Movie Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:translate-y-1">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Movies</h2>
            <Film className="text-white" size={24} />
          </div>
          <div className="p-6 flex flex-col items-center">
            <p className="text-5xl font-bold text-gray-800 mb-2">{numberOfMovies}</p>
            <p className="text-gray-500 text-sm">movies watched</p>
          </div>
        </div>

        {/* Episodes Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:translate-y-1">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Episodes</h2>
            <Tv className="text-white" size={24} />
          </div>
          <div className="p-6 flex flex-col items-center">
            <p className="text-5xl font-bold text-gray-800 mb-2">{numberOfEpisodes}</p>
            <p className="text-gray-500 text-sm">episodes watched</p>
          </div>
        </div>

        {/* Time Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:translate-y-1">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Watch Time</h2>
            <Clock className="text-white" size={24} />
          </div>
          <div className="p-6 flex flex-col items-center">
            <p className="text-5xl font-bold text-gray-800 mb-2">{formatTime(totalTimeWatched)}</p>
            <p className="text-gray-500 text-sm">total time spent watching</p>
          </div>
        </div>
      </div>

     

      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Watching Summary</h3>
        <p className="text-gray-600">
          You've watched <span className="font-bold text-purple-600">{numberOfMovies}</span> movies and{" "}
          <span className="font-bold text-green-600">{numberOfEpisodes}</span> episodes, totaling{" "}
          <span className="font-bold text-amber-600">{formatTime(totalTimeWatched)}</span> of watch time.
        </p>
        
        {totalTimeWatched > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-gray-600 text-sm italic">
              {totalTimeWatched > 1440 ? 
                `That's equivalent to ${(totalTimeWatched / 1440).toFixed(1)} full days of continuous watching!` : 
                `Keep watching! You're ${(1440 - totalTimeWatched)} minutes away from a full day of content.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;