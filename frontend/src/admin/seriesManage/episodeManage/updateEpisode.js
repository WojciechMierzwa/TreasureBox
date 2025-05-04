import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateEpisode() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [name, setName] = useState('');
  const [seasonNumber, setSeasonNumber] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [episodeLocation, setEpisodeLocation] = useState('');
  const [hasCaptions, setHasCaptions] = useState(false);
  const [captionsLocation, setCaptionsLocation] = useState('');
  const [seasonId, setSeasonId] = useState('');
  const [seasons, setSeasons] = useState([]);
  const [seriesId, setSeriesId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  const navigate = useNavigate();

  // First fetch the episode data to get the season and series info
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      console.log("Fetching episode data for ID:", id);
      
      fetch(`${backendAddress}/api/episodes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Episode data received:", data);
          setEpisode(data);
          setName(data.name);
          setSeasonNumber(data.seasonNumber);
          setEpisodeNumber(data.episodeNumber);
          setEpisodeLocation(data.episodeLocation);
          setHasCaptions(data.hasCaptions);
          setCaptionsLocation(data.captionsLocation || '');
          
          if (data.season) {
            setSeasonId(data.season.id);
            
            // Get the series ID from the season
            if (data.season.series && data.season.series.id) {
              const retrievedSeriesId = data.season.series.id;
              console.log("Found series ID from episode data:", retrievedSeriesId);
              setSeriesId(retrievedSeriesId);
              
              // Now fetch seasons for this series
              fetchSeasons(retrievedSeriesId);
            } else {
              // Fallback: fetch all seasons and find the related series
              console.log("No series ID in episode data, fetching season details");
              fetchSeasonDetails(data.season.id);
            }
          }
          
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching episode:', err);
          setIsLoading(false);
        });
    }
  }, [id, backendAddress]);

  // Function to fetch season details if needed
  const fetchSeasonDetails = (seasonId) => {
    console.log("Fetching season details for ID:", seasonId);
    
    fetch(`${backendAddress}/api/seasons/${seasonId}`)
      .then((res) => res.json())
      .then((seasonData) => {
        console.log("Season data received:", seasonData);
        
        if (seasonData.series && seasonData.series.id) {
          const retrievedSeriesId = seasonData.series.id;
          console.log("Found series ID from season data:", retrievedSeriesId);
          setSeriesId(retrievedSeriesId);
          
          // Now fetch all seasons for this series
          fetchSeasons(retrievedSeriesId);
        } else {
          console.error("No series ID found in season data");
        }
      })
      .catch((err) => console.error('Error fetching season details:', err));
  };

  // Function to fetch seasons by series ID
  const fetchSeasons = (seriesId) => {
    if (!seriesId) {
      console.error("Cannot fetch seasons: No series ID provided");
      return;
    }
    
    console.log("Fetching seasons for series ID:", seriesId);
    
    fetch(`${backendAddress}/api/seasons/by-series/${seriesId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Seasons data received:", data);
        console.log("Number of seasons:", data.length);
        setSeasons(data);
      })
      .catch((err) => console.error('Error fetching seasons:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name,
      seasonNumber: Number(seasonNumber),
      episodeNumber: Number(episodeNumber),
      episodeLocation,
      hasCaptions,
      captionsLocation: hasCaptions ? captionsLocation : '',
      season: { id: Number(seasonId) }
    };

    console.log("Submitting update with payload:", payload);

    fetch(`${backendAddress}/api/episodes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => {
        if (seriesId) {
          navigate(`/view-series/${seriesId}`);
        } else {
          
          navigate('/'); 
        }
      })
      .catch(err => console.error('Update error:', err));
  };

  
  const renderDebugInfo = () => (
    <div className="p-4 mb-4 bg-gray-100 border rounded">
      <h3 className="font-bold">Debug Information</h3>
      <ul className="text-sm">
        <li>Episode ID: {id}</li>
        <li>Extracted Series ID: {seriesId || "Not yet determined"}</li>
        <li>Season ID: {seasonId}</li>
        <li>Seasons loaded: {seasons.length}</li>
        <li>Loading: {isLoading ? "Yes" : "No"}</li>
      </ul>
    </div>
  );

  if (isLoading) return (
    <div className="p-8">
      {renderDebugInfo()}
      <p>Loading episode data...</p>
    </div>
  );
  
  if (!episode && !isLoading) return (
    <div className="p-8">
      {renderDebugInfo()}
      <p>Episode not found</p>
    </div>
  );

  return (
    <div className="p-8">

      
      <h1 className="text-2xl font-bold mb-4">Update Episode</h1>
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
          <span className="ml-2">Has Captions</span>
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
            {seasons.length > 0 ? (
              seasons.map(season => (
                <option key={season.id} value={season.id}>
                  {season.name}
                </option>
              ))
            ) : (
              <option value="" disabled>No seasons available</option>
            )}
          </select>
        </div>
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Update Episode
        </button>
      </form>
    </div>
  );
}

export default UpdateEpisode;