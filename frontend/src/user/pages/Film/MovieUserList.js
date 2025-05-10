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

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (userFilms.length === 0) return <div className="p-8">No movies found.</div>;

  
  const watchingFilms = userFilms.filter((userFilm) => !userFilm.watched);
  const watchedFilms = userFilms.filter((userFilm) => userFilm.watched);

  return (
    <div className="flex flex-wrap justify-start items-start gap-4 p-8">
      <h2 className="w-full text-xl font-bold mb-6">Movies Watching</h2>
      {watchingFilms.length === 0 ? (
        <div className="p-8">No movies are currently being watched.</div>
      ) : (
        watchingFilms.map((userFilm) => (
          <div
            key={userFilm.id}
            className="m-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate(`/watch/movie?id=${userFilm.film.id}`)}
          >
            <Block
              name={userFilm.film?.name || 'Unknown'}
              genre={userFilm.film?.genre || 'Unknown'}
              picture={userFilm.film?.picture}
            />
          </div>
        ))
      )}

      {/* Sekcja "Movies Watched" */}
      {watchedFilms.length > 0 && (
        <>
          <h2 className="w-full text-xl font-bold mb-6">Movies Watched</h2>
          {watchedFilms.map((userFilm) => (
            <div
              key={userFilm.id}
              className="m-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate(`/watch/movie?id=${userFilm.film.id}`)}
            >
              <Block
                name={userFilm.film?.name || 'Unknown'}
                genre={userFilm.film?.genre || 'Unknown'}
                picture={userFilm.film?.picture}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default MoviesUserList;
