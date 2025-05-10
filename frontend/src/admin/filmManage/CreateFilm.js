import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateFilm() {
  const [name, setName] = useState('');
  const [filmLocation, setFilmLocation] = useState('');
  const [genre, setGenre] = useState('');
  const [captionsLocation, setCaptionsLocation] = useState('');
  const [hasCaptions, setHasCaptions] = useState(false);
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
      const apiUrl = `${backendAddress}/api/films`; // <-- Corrected URL to /api/films

      const filmData = {
        name,
        filmLocation,
        genre,
        captionsLocation,
        hasCaptions
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filmData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create film');
      }

      const data = await response.json();
      setSuccess('Film created successfully!');
      navigate('/MoviesManager'); // redirect to home or wherever you want
    } catch (err) {
      console.error('Error creating film:', err);
      setError(err.message || 'An error occurred while creating the film');
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
              placeholder="Film Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Film Location"
              value={filmLocation}
              onChange={(e) => setFilmLocation(e.target.value)}
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
          <div className="flex items-center mb-4">
            <input
              id="hasCaptions"
              type="checkbox"
              checked={hasCaptions}
              onChange={(e) => setHasCaptions(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hasCaptions" className="ml-2 block text-sm text-gray-900">
              Has Captions
            </label>
          </div>
          {hasCaptions && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Captions Location"
              value={captionsLocation}
              onChange={(e) => setCaptionsLocation(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
           )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} text-white py-2 px-4 rounded-lg`}
            >
              {isLoading ? 'Creating...' : 'Create Film'}
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

export default CreateFilm;
