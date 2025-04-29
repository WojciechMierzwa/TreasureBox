import React, { useEffect, useState } from 'react';

function UserFilmList() {
  const [userFilms, setUserFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
    
    fetch(`${backendAddress}/api/user-films`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setUserFilms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading user film records...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error loading data: {error}</div>;
  }

  if (userFilms.length === 0) {
    return <div className="text-center p-4">No user film records found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All User Film Records</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userFilms.map(userFilm => (
          <div key={userFilm.id} className="border rounded p-4 shadow-sm">
            <h2 className="font-bold text-lg">Record ID: {userFilm.id}</h2>
            <div className="mt-2">
              <p><span className="font-semibold">User:</span> {userFilm.user ? userFilm.user.username || userFilm.user.id : 'N/A'}</p>
              <p><span className="font-semibold">Film:</span> {userFilm.film ? userFilm.film.title || userFilm.film.id : 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserFilmList;