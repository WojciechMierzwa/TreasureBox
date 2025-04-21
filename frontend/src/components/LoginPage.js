import React, { useEffect, useState } from 'react';
import '../index.css';

function LoginPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
    fetch(`${backendAddress}/api/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Who watches today?</h1>
        <ul className="space-y-4">
          {users.map(user => (
            <button
              key={user.id} 
              type="button"
              className="flex items-center w-full py-3 px-6 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src={`/avatar/${user.profilePicture}.png`} 
                alt="Profile"
                className="w-16 h-16 rounded-full mr-4" 
              />
               <div className="flex-1 text-center">
                <strong className="text-gray-900 text-2xl font-semibold text-center mb-6">{user.name}</strong>
              </div>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LoginPage;
