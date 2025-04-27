import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

function Test() {
  const { id } = useParams();
  const [userFilms, setUserFilms] = useState([]);
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
    
    // Updated URL to match the controller endpoint
    fetch(`${backendAddress}/api/user-films/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setUserFilms(data);
        setLoading(false);
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
    return <div>No users found for this film</div>;
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-xl font-bold mb-4">Users who watched this film</h2>
      {userFilms.map(userFilm => (
        <div key={userFilm.id} className="border p-4 mb-2 w-full max-w-md">
          <p className="text-gray-700">User: {userFilm.user.username || 'Unknown'}</p>
          <p className="text-gray-700">Film: {userFilm.film.title || 'Unknown'}</p>
        </div>
      ))}
    </div>
  );
}

export default Test;