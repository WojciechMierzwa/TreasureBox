import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Video from '../Video';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
    
    fetch(`${backendAddress}/api/video/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error('Fetch error:', err));

      
  }, [id]);

  const deleteMovie = () => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
    fetch(`${backendAddress}/api/films/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        navigate('/Movies'); 
      })
      .catch(err => console.error('Delete error:', err));
  };


  if (!movie) {
    return <div>Loading...</div>;
  }

  

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">{movie.name}</h1>
      <h2 className="text-xl text-gray-600 mb-2">{movie.genre}</h2>
      <p className="text-gray-700">{movie.duration}</p>
      <p className="text-gray-700">{movie.filmLocation}</p>
      <p className="text-gray-700">{movie.hasCaptions}</p>
      <p className="text-gray-700">{movie.captionsLocation}</p>
      <p className="text-gray-700">{movie.mediaType}</p>
      <p className="text-gray-700">{movie.genre}</p>
      <Video id={movie.id} />
      <button
        onClick={deleteMovie} className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            
        Delete
        </button>
    </div>
  );
}

export default MovieDetail;
