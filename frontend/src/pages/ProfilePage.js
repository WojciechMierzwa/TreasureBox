import React, { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';  
import '../index.css';

function ProfilePage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  
    fetch(`${backendAddress}/api/users`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched users:", data); 
        setUsers(data);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);
  
  
  function createUser() {
    navigate('/CreateUser'); 
  }
  function hub(user) {
    if (!user.requireCredentials) {
      navigate('/Hub',  { state: { user: user } }); 
    } else {
      navigate('/LoginPage', { state: { user: user } });
    }
  }
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
              onClick={() => hub(user)}
            >
              <img
                src={`/avatar/${user.profilePicture}.png`} 
                alt="Profile"
                className="w-16 h-16 rounded-full mr-4" 
              />
              <div className="flex-1 text-center">
                <strong className="text-gray-900 text-2xl font-semibold">{user.name}</strong>
              </div>
            </button>
          ))}
          <button
            type="button"
            className="flex items-center w-full py-3 px-6 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={createUser}
          >
            <img
              src={`/avatar/${1}.png`} 
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4" 
            />
            <div className="flex-1 text-center">
              <strong className="text-gray-900 text-2xl font-semibold">Add new user</strong>
            </div>
          </button>
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
