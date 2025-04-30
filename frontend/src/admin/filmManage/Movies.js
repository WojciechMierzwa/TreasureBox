import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import Block from '../../components/Block';

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
    navigate(`/video?id=${id}`);
  };

  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen py-8 space-y-4">
      {movies.map(film => (
        <div 
          key={film.id} 
          className="m-4"
          onClick={() => handleMovieClick(film.id)} 
        >
          <Block name={film.name} genre={film.genre} />
        </div>
      ))}
    </div>
  );
}

export default Movies;
