import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Block from '../../../components/Block';

function EpisodesUserList() {
  const { id } = useParams();
  const [userEpisodes, setUserEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;

    setLoading(true);
    setError(null);

    fetch(`${backendAddress}/api/user-episodes/user/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 404) return [];
          throw new Error(await res.text());
        }
        return res.json();
      })
      .then(data => {
        setUserEpisodes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError('Failed to load user episodes');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (userEpisodes.length === 0) return <div className="p-8">No episodes found.</div>;

  return (
    <div className="flex flex-wrap justify-start items-start gap-4 p-8">
      <h2 className="w-full text-xl font-bold mb-6">Episodes Watching/Watched</h2>
      {userEpisodes.map((userEpisode) => (
        <div
          key={userEpisode.id}
          className="m-4 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate(`/watch/episode?id=${userEpisode.episode.id}`)}
        >
          <Block
            name={userEpisode.episode?.name || 'Unknown'}
            genre={userEpisode.episode?.season?.series?.name || 'Unknown'}
            picture={userEpisode.episode?.picture}
          />
        </div>
      ))}
    </div>
  );
}

export default EpisodesUserList;
