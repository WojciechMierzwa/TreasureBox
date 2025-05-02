import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ManageSeasons() {
  const [seasons, setSeasons] = useState([]);
  const [searchParams] = useSearchParams();
  const seriesId = searchParams.get('seriesId') ?? '';
  const [seriesName, setSeriesName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${backendAddress}/api/seasons`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(season => season.series.id.toString() === seriesId);
        setSeasons(filtered);
        if (filtered.length > 0) {
          setSeriesName(filtered[0].series.name);
        }
      })
      .catch(err => console.error('Error fetching seasons:', err));
  }, [backendAddress, seriesId]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this season?')) {
      fetch(`${backendAddress}/api/seasons/${id}`, { method: 'DELETE' })
        .then(() => {
          setSeasons(prev => prev.filter(s => s.id !== id));
        })
        .catch(err => console.error('Delete error:', err));
    }
  };

  const totalPages = Math.ceil(seasons.length / itemsPerPage);
  const paginatedSeasons = seasons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Seasons – {seriesName}</h1>

      <button
        onClick={() => navigate(`/create-season?seriesId=${seriesId}`)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Create New Season
      </button>

      <div className="space-y-4">
        {paginatedSeasons.map(season => (
          <div
            key={season.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <div>
              <p className="font-medium">Season: {season.name}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/update-season/${season.id}`)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(season.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
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

export default ManageSeasons;
