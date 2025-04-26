import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();

  const [id] = useState(localStorage.getItem("userId") || '');
  const [name, setName] = useState(localStorage.getItem("username") || '');
  const [password, setPassword] = useState('');
  const [requireCredentials, setRequireCredentials] = useState(
    localStorage.getItem("requireCredentials") === 'true'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const profilePicture = localStorage.getItem("profilePicture") || "default"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
      const apiUrl = `${backendAddress}/api/users/updateUser`;

      const userData = {
        id:id,
        name:name,
        password:password,
        requireCredentials:requireCredentials
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);
      localStorage.setItem("profilePicture", data.profilePicture);

      setSuccess('User updated successfully!');
      navigate('/Hub');
    } catch (err) {
      console.error('Error while updating:', err);
      setError(err.message || 'An error occurred while updating');
    } finally {
      setIsLoading(false);
    }
  };

  const returnToProfilePage = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img
            src={`/avatar/${profilePicture}.png`}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
              {name}
            </h2>
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="require-credentials"
              checked={requireCredentials}
              onChange={(e) => setRequireCredentials(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="require-credentials" className="ml-2 block text-sm text-gray-900">
              Require credentials when I login
            </label>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>

            <button
              type="button"
              onClick={returnToProfilePage}
              disabled={isLoading}
              className="w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Return to Profile Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
