import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateSeries() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [picture, setPicture] = useState('');
  const [seasonCount, setSeasonCount] = useState('');
  const [episodesCount, setEpisodesCount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
      const apiUrl = `${backendAddress}/api/series`; 

      const seriesData = {
        name,
        genre,
        picture,
        seasonCount: parseInt(seasonCount, 10),
        episodesCount: parseInt(episodesCount, 10)
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(seriesData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create series');
      }

      setSuccess('Series created successfully!');
      navigate('/MoviesManager');
    } catch (err) {
      console.error('Error creating series:', err);
      setError(err.message || 'An error occurred while creating the series');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/MoviesManager');
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
              onChange={(e) => setSeasonCount(e.target.value)}
              required
              min="1"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Episodes Count"
              value={episodesCount}
              onChange={(e) => setEpisodesCount(e.target.value)}
              required
              min="1"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} text-white py-2 px-4 rounded-lg`}
            >
              {isLoading ? 'Creating...' : 'Create Series'}
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

export default CreateSeries;
