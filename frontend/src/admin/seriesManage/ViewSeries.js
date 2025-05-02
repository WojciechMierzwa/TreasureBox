import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ViewSeries() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serie, setSerie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;

  useEffect(() => {
    fetch(`${backendAddress}/api/series/${id}`)
      .then(res => res.json())
      .then(data => setSerie(data))
      .catch(err => console.error('Error fetching series:', err));
  }, [id, backendAddress]);

  useEffect(() => {
    fetch(`${backendAddress}/api/episodes/list`)
      .then(res => res.json())
      .then(data => setEpisodes(data))
      .catch(err => console.error('Error fetching episodes:', err));
  }, [backendAddress]);

  if (!serie) return <p>Loading series details...</p>;

  const filteredEpisodes = episodes.filter(ep => ep.seriesName === serie.name);

  const totalPages = Math.ceil(filteredEpisodes.length / itemsPerPage);
  const paginatedEpisodes = filteredEpisodes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (episodeId) => {
    if (window.confirm('Are you sure you want to delete this episode?')) {
      fetch(`${backendAddress}/api/episodes/${episodeId}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (res.ok) {
            setEpisodes(prev => prev.filter(ep => ep.episodeId !== episodeId));
          } else {
            console.error('Failed to delete episode');
          }
        })
        .catch(err => console.error('Delete error:', err));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{serie.name}</h1>
      <p className="text-lg mb-2">Genre: {serie.genre}</p>
      <p className="text-lg mb-2">Seasons: {serie.seasonCount}</p>
      <p className="text-lg mb-2">Episodes count: {serie.episodesCount}</p>

      <div className="flex space-x-4 my-6">
        <button
          onClick={() => navigate(`/create-episode?seriesId=${id}`)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Episode
        </button>
        <button
          onClick={() => navigate(`/manage-seasons?seriesId=${id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Manage Seasons
        </button>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Episodes:</h2>
      <div className="space-y-4">
        {paginatedEpisodes.map(ep => (
          <div
            key={ep.episodeId}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <Link
                to={`/watch/episode/?id=${ep.episodeId}`}
                className="text-blue-600 hover:underline font-medium"
              >
                Season: {ep.seasonName} – Episode {ep.episodeNumber}
              </Link>
              <p className="text-sm text-gray-600">{ep.title}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/update-episode/${ep.episodeId}`)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(ep.episodeId)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {filteredEpisodes.length === 0 && <p>No episodes found for this series.</p>}
      </div>

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
    </div>
  );
}

export default ViewSeries;
