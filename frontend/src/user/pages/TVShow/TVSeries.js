import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  


function TVSeries() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  
    fetch(`${backendAddress}/api/films?mediaType=Series`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched films:", data); 
        setMovies(data); 
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (

    <div className="flex flex-col justify-center items-center min-h-screen py-8 space-y-4">
      {movies.map(film => (
        <div 
          key={film.id} 
          className="p-4 bg-white shadow-md rounded-lg w-80 cursor-pointer hover:bg-gray-100"
          onClick={() => navigate(`/TVSeries/${film.id}`)} 
        >
          <h2 className="text-xl font-bold mb-2">{film.name}</h2>
          <h3 className="text-gray-600">{film.genre}</h3> 
          <p className="text-gray-600">{film.filmLocation}</p> 
        </div>
      ))}
    </div>
  
  );
}

export default TVSeries;
