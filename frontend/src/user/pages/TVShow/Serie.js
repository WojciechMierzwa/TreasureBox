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
  const groupedBySeason = filteredEpisodes.reduce((acc, episode) => {
    const season = episode.seasonName || 'Unknown Season';
    if (!acc[season]) acc[season] = [];
    acc[season].push(episode);
    return acc;
  }, {});

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{serie.name}</h1>
      <div className="text-gray-700 mb-6 space-y-1">
        <p><strong>Genre:</strong> {serie.genre}</p>
        <p><strong>Seasons:</strong> {serie.seasonCount}</p>
        <p><strong>Total Episodes:</strong> {serie.episodesCount}</p>
      </div>

      <h2 className="text-3xl font-semibold text-gray-900 mb-6 border-b pb-2">Episodes</h2>

      {Object.keys(groupedBySeason).map(season => (
        <div key={season} className="mb-8">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3 border-l-4 pl-3 border-blue-400 bg-blue-50 py-1">
            {season}
          </h3>
          <ol className="space-y-4">
            {groupedBySeason[season].map(ep => (
              <li
                key={ep.episodeId}
                className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
              >
                <Link
                  to={`/watch/episode/?id=${ep.episodeId}`}
                  className="text-lg text-blue-700 font-medium hover:underline"
                >
                  Episode {ep.episodeNumber}: {ep.episodeName}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ))}

      {filteredEpisodes.length === 0 && (
        <p className="text-red-500 mt-4">No episodes found for this series.</p>
      )}
    </div>
  );
}

export default Serie;
