import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoginPage() {

    const location = useLocation();
    const user = location.state?.user;
    const [name, setName] = useState(user?.name || '');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
      const apiUrl = `${backendAddress}/api/users/login`;
      
      const userData = {
        name: name,
        password: password,
      };
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials');
      }
      
      const data = await response.json();
      navigate('/Hub'); 
      
    } catch (err) {
      console.error('Error while logging:', err);
      setError(err.message || 'An error occurred while logging');
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
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo_placeholder.png"
            width={100}
            height={100}
            alt="Logo"
          />
        </div>
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
            <input
              type="text"
              placeholder="Login"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isLoading ? 'Accessing...' : 'Login'}
            </button>
           
            <button
              type="button"
              onClick={returnToProfilePage}
              disabled={isLoading}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Return to Profile Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}