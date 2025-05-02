import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function CreateEpisode() {
  const [name, setName] = useState('');
  const [seasonNumber, setSeasonNumber] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [episodeLocation, setEpisodeLocation] = useState('');
  const [hasCaptions, setHasCaptions] = useState(false);
  const [captionsLocation, setCaptionsLocation] = useState('');
  const [seasonId, setSeasonId] = useState('');
  const [seasons, setSeasons] = useState([]);
  

  const [searchParams] = useSearchParams();
  const seriesId = searchParams.get('seriesId');
  
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  const navigate = useNavigate();

  
  useEffect(() => {
    if (seriesId) {
      fetch(`${backendAddress}/api/seasons/by-series/${seriesId}`)
        .then((res) => res.json())
        .then((data) => {
          setSeasons(data); 
        })
        .catch((err) => console.error('Error fetching seasons:', err));
    }
  }, [seriesId, backendAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name,
      seasonNumber: Number(seasonNumber),
      episodeNumber: Number(episodeNumber),
      episodeLocation,
      hasCaptions,
      captionsLocation,
      season: { id: Number(seasonId) }
    };

    fetch(`${backendAddress}/api/episodes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => {
        navigate(`/view-series/${seriesId}`);
      })
      .catch(err => console.error('Create error:', err));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Episode</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Episode name"
          className="w-full p-2 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Season Number"
          className="w-full p-2 border border-gray-300 rounded"
          value={seasonNumber}
          onChange={(e) => setSeasonNumber(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Episode Number"
          className="w-full p-2 border border-gray-300 rounded"
          value={episodeNumber}
          onChange={(e) => setEpisodeNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Episode Location"
          className="w-full p-2 border border-gray-300 rounded"
          value={episodeLocation}
          onChange={(e) => setEpisodeLocation(e.target.value)}
          required
        />
        <label className="block">
          <input
            type="checkbox"
            checked={hasCaptions}
            onChange={() => setHasCaptions(prev => !prev)}
          />
          Has Captions
        </label>
        {hasCaptions && (
          <input
            type="text"
            placeholder="Captions Location"
            className="w-full p-2 border border-gray-300 rounded"
            value={captionsLocation}
            onChange={(e) => setCaptionsLocation(e.target.value)}
          />
        )}
        <div>
          <label htmlFor="seasonId" className="block">Select Season</label>
          <select
            id="seasonId"
            className="w-full p-2 border border-gray-300 rounded"
            value={seasonId}
            onChange={(e) => setSeasonId(e.target.value)}
            required
          >
            <option value="">Select a season</option>
            {seasons.map(season => (
              <option key={season.id} value={season.id}>
                {season.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Episode
        </button>
      </form>
    </div>
  );
}

export default CreateEpisode;
