import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateFilm() {
  const [name, setName] = useState('');
  const [filmLocation, setFilmLocation] = useState('');
  const [genre, setGenre] = useState('');
  const [captionsLocation, setCaptionsLocation] = useState('');
  const [hasCaptions, setHasCaptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { id } = useParams(); // <-- get film id from URL

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
        const response = await fetch(`${backendAddress}/api/films/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch film data');
        }

        const data = await response.json();
        setName(data.name);
        setFilmLocation(data.filmLocation);
        setGenre(data.genre);
        setCaptionsLocation(data.captionsLocation);
        setHasCaptions(data.hasCaptions);
      } catch (err) {
        console.error('Error fetching film:', err);
        setError(err.message);
      }
    };

    fetchFilm();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
      const apiUrl = `${backendAddress}/api/films/${id}`;

      const filmData = {
        id: parseInt(id), // <-- important to include id for updating
        name,
        filmLocation,
        genre,
        captionsLocation,
        hasCaptions
      };

      const response = await fetch(apiUrl, {
        method: 'PUT', // <-- use PUT for update
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filmData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update film');
      }

      setSuccess('Film updated successfully!');
      navigate('/MoviesManager');
    } catch (err) {
      console.error('Error updating film:', err);
      setError(err.message || 'An error occurred while updating the film');
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
          <div className="mb-4">
            <input
              type="text"
              placeholder="Captions Location"
              value={captionsLocation}
              onChange={(e) => setCaptionsLocation(e.target.value)}
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
          
          

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} text-white py-2 px-4 rounded-lg`}
            >
              {isLoading ? 'Updating...' : 'Update Film'}
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

export default UpdateFilm;
