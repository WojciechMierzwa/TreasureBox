import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ManageEpisodes() {
  const { id } = useParams(); // Get the series ID from URL parameter
  const [episodes, setEpisodes] = useState([]);
  const [tvshow, setTvshow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  // Fetch series details and episodes
  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
    
    // Fetch TV show details
    fetch(`${backendAddress}/api/episodes/tvshow/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch TV Show');
        }
        return res.json();
      })
      .then(data => setTvshow(data))
      .catch(err => console.error('Fetch error:', err));
    
    //const response = await fetch(`http://localhost:8080/api/episodes/tvshow/${tvShowId}`);
    fetch(`${backendAddress}/api/episodes/tvshow/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch episodes');
        }
        return res.json();
      })
      .then(data => setEpisodes(data))
      .catch(err => console.error('Fetch error:', err));
  }, [id]);

  // Filter the episodes based on the search query
  const filteredEpisodes = episodes.filter(episode =>
    episode.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredEpisodes.length / itemsPerPage);
  const paginatedEpisodes = filteredEpisodes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle the edit button click
  const handleEdit = (episodeId) => {
    navigate(`/edit-episode/${episodeId}`);
  };

  // Handle the delete button click
  const handleDelete = (episodeId) => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
    if (window.confirm('Are you sure you want to delete this episode?')) {
      fetch(`${backendAddress}/api/episodes/${episodeId}`, { method: 'DELETE' })
        .then(res => {
          if (res.ok) {
            setEpisodes(prev => prev.filter(e => e.id !== episodeId));
          } else {
            console.error('Failed to delete episode');
          }
        })
        .catch(err => console.error('Delete error:', err));
    }
  };

  if (!tvshow) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading episodes...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Episodes for "{tvshow.name}"</h1>
        <div className="space-x-2">
          <button
            onClick={() => navigate(`/add-episode/${id}`)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Episode
          </button>
          <button
            onClick={() => navigate('/SeriesManager')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Back to Series
          </button>
        </div>
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search episodes..."
        className="w-full mb-6 p-2 border border-gray-300 rounded"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* Episodes list */}
      {episodes.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p>No episodes found for this series. Add an episode to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedEpisodes.map(episode => (
            <div
              key={episode.id}
              className="flex justify-between items-center bg-white p-4 rounded shadow"
            >
              <div>
                <p className="font-medium">{episode.name}</p>
                <p className="text-sm text-gray-500">
                  Season {episode.seasonNumber}, Episode {episode.episodeNumber}
                </p>
                {episode.duration && (
                  <p className="text-sm text-gray-500">Duration: {episode.duration} min</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(episode.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(episode.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
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

export default ManageEpisodes;