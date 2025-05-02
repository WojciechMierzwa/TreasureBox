import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Block from '../../../components/Block';

function MoviesUserList() {
  const { id } = useParams();
  const [userFilms, setUserFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;

    setLoading(true);
    setError(null);

    fetch(`${backendAddress}/api/user-films/user/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 404) return [];
          throw new Error(await res.text());
        }
        return res.json();
      })
      .then(data => {
        setUserFilms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError('Failed to load user films');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (userFilms.length === 0) return null;

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-xl font-bold mb-6">Movies Watching/Watched</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userFilms.map((userFilm) => (
          <div key={userFilm.id} onClick={() => navigate(`/watch/movie?id=${userFilm.film.id}`)}>
            <Block
              name={userFilm.film?.name || 'Unknown'}
              genre={userFilm.film?.genre || 'Unknown'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesUserList;
