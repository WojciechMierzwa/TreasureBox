import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Block from '../../components/Block';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('query');
    if (searchQuery) {
      setQuery(searchQuery);
      fetchResults(searchQuery);
    }
  }, [location]);

  const fetchResults = async (query) => {
    setLoading(true);
    setError(null); 
    try {

      const filmsResponse = await fetch(`${backendAddress}/api/films/search?query=${encodeURIComponent(query)}`);
      const filmsData = await filmsResponse.json();

      const filmsWithType = Array.isArray(filmsData) ? filmsData.map(item => ({
        ...item,
        isMovie: true
      })) : [];

      const seriesResponse = await fetch(`${backendAddress}/api/series/search?query=${encodeURIComponent(query)}`);
      const seriesData = await seriesResponse.json();

      const seriesWithType = Array.isArray(seriesData) ? seriesData.map(item => ({
        ...item,
        isMovie: false
      })) : [];

  
      const combinedRecords = [...filmsWithType, ...seriesWithType];
      

      setRecords(combinedRecords);
    } catch (err) {

      setError('An error occurred while searching.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id, isMovie) => {
    if (isMovie) {
  
      navigate(`/watch/movie/?id=${id}`);
    } else {
 
      navigate(`/Series/${id}`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Search Results
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>} 
      <div className="flex flex-wrap justify-start items-start gap-4 p-8">
        {records.length > 0 ? (
          records.map((item) => (
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
        ) : (
          !loading && <p>No results found.</p> 
        )}
      </div>
    </div>
  );
};

export default Search;
