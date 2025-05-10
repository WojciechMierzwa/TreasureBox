import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EpisodeList() {
  const { tvShowId } = useParams();  // Pobieramy tvShowId z URL
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(`${backendAddress}/api/episodes/tvshow/${tvShowId}`);
        if (!response.ok) {
          throw new Error('Wystąpił problem z pobieraniem danych');
        }
        const data = await response.json();
        setEpisodes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [tvShowId]);  // Efekt zależny od tvShowId

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Odcinki Serialu</h2>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <h3>{episode.name}</h3>
            <p><strong>Sezon:</strong> {episode.seasonNumber}, <strong>Odcinek:</strong> {episode.episodeNumber}</p>
            <p><strong>Czas trwania:</strong> {episode.duration} minut</p>
            <p><strong>Lokalizacja odcinka:</strong> {episode.episodeLocation}</p>
            {episode.hasCaptions && <p><strong>Napisy:</strong> Dostępne ({episode.captionsLocation})</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpisodeList;
