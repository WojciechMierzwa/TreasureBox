import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SeriesManager() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
    fetch(`${backendAddress}/api/series`)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (id) => {
    navigate(`/update-film/${id}`);
  };

  const handleDelete = (id) => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
    if (window.confirm('Are you sure you want to delete this series?')) {
      fetch(`${backendAddress}/api/films/${id}`, { method: 'DELETE' })
        .then(res => {
          if (res.ok) {
            setMovies(prev => prev.filter(m => m.id !== id));
          } else {
            console.error('Failed to delete');
          }
        })
        .catch(err => console.error('Delete error:', err));
    }
  };

  // Poprawione przekierowanie do zarządzania odcinkami
  const viewEpisodes = (id) => {
    navigate(`/SeriesManager/${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Series Manager</h1>
      <input
        type="text"
        placeholder="Search series..."
        className="w-full mb-6 p-2 border border-gray-300 rounded"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
      />
      <div className="space-y-4">
        {paginatedMovies.map(movie => (
          <div
            key={movie.id}
            className="flex flex-col md:flex-row md:justify-between md:items-center bg-white p-4 rounded shadow"
          >
            <div className="mb-2 md:mb-0">
              <p className="font-medium">{movie.name}</p>
              <p className="text-sm text-gray-500">{movie.genre}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => viewEpisodes(movie.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                View Episodes
              </button>
              <button
                onClick={() => handleEdit(movie.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(movie.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SeriesManager;