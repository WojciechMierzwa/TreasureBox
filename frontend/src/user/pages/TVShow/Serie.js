import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Serie() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{serie.name}</h1>
      <p className="text-lg mb-2">Genre: {serie.genre}</p>
      <p className="text-lg mb-2">Seasons: {serie.seasonCount}</p>
      <p className="text-lg mb-2">Episodes count: {serie.episodesCount}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Episodes:</h2>
      <ul className="space-y-2">
        {filteredEpisodes.map(ep => (
          <li key={ep.episodeId}>
  
  <Link
  to={`/watch/episode/?id=${ep.episodeId}`} // Use an absolute path with a leading "/"
  className="text-blue-600 hover:underline"
>
              Season: {ep.seasonName} – Episode {ep.episodeNumber}
            </Link>
          </li>
        ))}
        {filteredEpisodes.length === 0 && <p>No episodes found for this series.</p>}
      </ul>
    </div>
  );
}

export default Serie;
