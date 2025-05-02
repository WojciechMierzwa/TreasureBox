import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateSerie() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [picture, setPicture] = useState('');
  const [seasonCount, setSeasonCount] = useState(0);
  const [episodesCount, setEpisodesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
        const response = await fetch(`${backendAddress}/api/series/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch series data');
        }

        const data = await response.json();
        setName(data.name || '');
        setGenre(data.genre || '');
        setPicture(data.picture || '');
        setSeasonCount(data.seasonCount || 0);
        setEpisodesCount(data.episodesCount || 0);
      } catch (err) {
        console.error('Error fetching series:', err);
        setError(err.message);
      }
    };

    fetchSeries();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
      const apiUrl = `${backendAddress}/api/series/${id}`;

      const seriesData = {
        id: parseInt(id),
        name,
        genre,
        picture,
        seasonCount,
        episodesCount
      };

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(seriesData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update series');
      }

      setSuccess('Series updated successfully!');
      navigate('/SeriesManager'); // Upewnij się, że taka ścieżka istnieje
    } catch (err) {
      console.error('Error updating series:', err);
      setError(err.message || 'An error occurred while updating the series');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/SeriesManager');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Series Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Picture URL"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Season Count"
              value={seasonCount}
              onChange={(e) => setSeasonCount(parseInt(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Episodes Count"
              value={episodesCount}
              onChange={(e) => setEpisodesCount(parseInt(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} text-white py-2 px-4 rounded-lg`}
            >
              {isLoading ? 'Updating...' : 'Update Series'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateSerie;
