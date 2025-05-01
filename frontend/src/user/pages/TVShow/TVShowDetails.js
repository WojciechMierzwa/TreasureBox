import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TVShowDetails() {
  const { id } = useParams();
  const [tvshow, setTvshow] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
    
    fetch(`${backendAddress}/api/series/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch TV Show');
        }
        return res.json();
      })
      .then(data => setTvshow(data))
      .catch(err => {
        console.error('Fetch error:', err);
        navigate('/TVShows'); 
      });
  }, [id, navigate]);

  const deleteTVShow = () => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
    fetch(`${backendAddress}/api/TVShow/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        navigate('/TVShows');
      })
      .catch(err => console.error('Delete error:', err));
  };

  if (!tvshow) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading TV Show details...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8 space-y-4">
      <h2 className="text-2xl font-bold">{tvshow.film?.name}</h2> 
      <h3 className="text-lg text-gray-600">Seasons: {tvshow.seasonCount}</h3>
      <h3 className="text-lg text-gray-600">Episodes: {tvshow.episodeCount}</h3> 
      
      <button
        onClick={deleteTVShow}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete
      </button>
    </div>
  );
}

export default TVShowDetails;
