import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  


function TVShow() {
  const [tvshows, setTvshows] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  
    fetch(`${backendAddress}/api/TVShow`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched TVShows:", data); 
        setTvshows(data); 
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-8 space-y-4">
      {tvshows.map(tvshow => (
        <div 
          key={tvshow.id} 
          className="p-4 bg-white shadow-md rounded-lg w-80 cursor-pointer hover:bg-gray-100"
          onClick={() => navigate(`/tvshows/${tvshow.id}`)} 
        >
          <h2 className="text-xl font-bold mb-2">{tvshow.film?.name}</h2> 
          <h3 className="text-gray-600">Seasons: {tvshow.seasonCount}</h3>
          <h3 className="text-gray-600">Episodes: {tvshow.episodeCount}</h3> 
        </div>
      ))}
    </div>
  );
}

export default TVShow;
