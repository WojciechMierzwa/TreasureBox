import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfMovies, setNumberOfMovies] = useState(0);
  const [numberOfEpisodes, setNumberOfEpisodes] = useState(0);
  const [numberOfTVSeries, setNumberOfTVSeries] = useState(0);
  const navigate = useNavigate();
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;

  useEffect(() => {
  const fetchCounts = async () => {
    try {
      const [seriesResponse, filmResponse, episodeResponse, userResponse] = await Promise.all([
        fetch(`${backendAddress}/api/series/count`),
        fetch(`${backendAddress}/api/films/count`),
        fetch(`${backendAddress}/api/episodes/count`),
        fetch(`${backendAddress}/api/users/count`)
      ]);
      const seriesNumber = await seriesResponse.json();
      const filmNumber = await filmResponse.json();
      const episodeNumber = await episodeResponse.json();
      const userNumber = await userResponse.json();
      setNumberOfTVSeries(seriesNumber);
      setNumberOfMovies(filmNumber);
      setNumberOfEpisodes(episodeNumber);
      setNumberOfUsers(userNumber);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  fetchCounts();
}, [backendAddress]);

  return (
    <div className="p-16">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Movies */}
        <div className="bg-blue-100 h-64  p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-2">🎬 Movies</h2>
            <p className="text-lg text-blue-700">Total: {numberOfMovies}</p>
          </div>
          <div>
            <button className="w-full mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => navigate('/create-movie')}>
              ➕ Add Movie
            </button>
            <button className="w-full px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500" onClick={() => navigate('/MoviesManager')}>
              🛠️ Manage Movies
            </button>
          </div>
        </div>

        {/* Series */}
        <div className="bg-purple-100 h-64 p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-purple-800 mb-2">📺 TV Series</h2>
            <p className="text-lg text-purple-700">Total: {numberOfTVSeries}</p>
          </div>
          <div>
            <button className="w-full mb-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700" onClick={() => navigate('/create-series')}>
              ➕ Add Series
            </button>
            <button className="w-full px-4 py-2 bg-purple-400 text-white rounded hover:bg-purple-500" onClick={() => navigate('/SeriesManager')}>
              🛠️ Manage Series
            </button>
          </div>
        </div>

        {/* Episodes */}
        <div className="bg-yellow-100 h-64 p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-yellow-800 mb-2">🎞️ Episodes</h2>
            <p className="text-lg text-yellow-700">Total: {numberOfEpisodes}</p>
          </div>
          <div>
            <button className="w-full px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500" onClick={() => navigate('/SeriesManager')}>
              🛠️ Manage Episodes
            </button>
          </div>
        </div>

        {/* Users */}
        <div className="bg-green-100 h-64 p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">👤 Users</h2>
            <p className="text-lg text-green-700">Total: {numberOfUsers}</p>
          </div>
          <div>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => navigate('/UsersManager')}>
              👥 Manage Users
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminPanel;
