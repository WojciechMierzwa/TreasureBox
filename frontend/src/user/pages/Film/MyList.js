import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Test() {
  const { id } = useParams();
  const [userFilms, setUserFilms] = useState([]);
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
    
    fetch(`${backendAddress}/api/user-films/films/${id}`)
      .then(res => res.json())
      .then(data => {
        setUserFilms(data);
        setLoading(false);
        console.log(data);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userFilms.length === 0) {
    return <div>No movies found for this user</div>;
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-xl font-bold mb-4">Movies watching/watched</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userFilms.map((userFilm) => (
          <div key={userFilm.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{userFilm.film.name}</h3>
            <p><strong>Genre:</strong> {userFilm.film.genre}</p>
            <p><strong>Duration:</strong> {userFilm.film.duration} min</p>
            <p><strong>Type:</strong> {userFilm.film.mediaType}</p>
            {userFilm.film.hasCaptions && (
              <p><strong>Captions available</strong></p>
            )}
            <button
              onClick={() => navigate(`/watch/${userFilm.film.id}`)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Watch Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Test;
