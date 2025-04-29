import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  

function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  
    fetch(`${backendAddress}/api/films?mediaType=Movie`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched films:", data); 
        setMovies(data); 
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleMovieClick = (id) => {
    // Passing the movie id as a filmLocation (part of the URL)
    navigate(`/Movies/${id}?filmLocation=${id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-8 space-y-4">
      {movies.map(film => (
        <div 
          key={film.id} 
          className="p-4 bg-white shadow-md rounded-lg w-80 cursor-pointer hover:bg-gray-100"
          onClick={() => handleMovieClick(film.id)}  // Pass id as the filmLocation
        >
          
          <p className="text-gray-600">{film.filmLocation}</p>  
        </div>
      ))}
    </div>
  );
}

export default Movies;
