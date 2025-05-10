import React, { useEffect, useState } from 'react';
import Block from '../../components/Block';
import { useNavigate } from 'react-router-dom';

function Hub() {
  const [combinedRecords, setCombinedRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
   
    // Fetch both Series and Movies
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch series data
        const seriesResponse = await fetch(`${backendAddress}/api/series`);
        if (!seriesResponse.ok) {
          throw new Error(`Series API error: ${seriesResponse.status}`);
        }
        const seriesData = await seriesResponse.json();
        
        // Mark series data
        const seriesWithType = seriesData.map(item => ({
          ...item,
          isMovie: false
        }));
        
        // Fetch movies data
        const moviesResponse = await fetch(`${backendAddress}/api/films`);
        if (!moviesResponse.ok) {
          throw new Error(`Movies API error: ${moviesResponse.status}`);
        }
        const moviesData = await moviesResponse.json();
        
        // Mark movies data
        const moviesWithType = moviesData.map(item => ({
          ...item,
          isMovie: true
        }));
        
    
        
        // Combine and shuffle
        const combined = [...seriesWithType, ...moviesWithType];
        const shuffled = combined.sort(() => Math.random() - 0.5);
        
        setCombinedRecords(shuffled);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleClick = (id, isMovie) => {
    if (isMovie) {
      navigate(`/watch/movie/?id=${id}`);
    } else {
      navigate(`/Series/${id}`);
    }
  };

  if (error) {
    return <div className="p-8 text-red-500">Error loading content: {error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-start items-start gap-4 p-8">
      {loading ? (
        <p className="text-lg">Loading content...</p>
      ) : (
        combinedRecords.map(item => (
          <div
            key={item.id}
            className="m-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleClick(item.id, item.isMovie)}
          >
            <Block
              name={item.name}
              genre={item.genre}
              picture={item.picture}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Hub;