import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateSeason() {
  const { id } = useParams();
  const [season, setSeason] = useState(null);
  const [name, setName] = useState('');
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${backendAddress}/api/seasons/${id}`)
      .then(res => res.json())
      .then(data => {
        setSeason(data);
        setName(data.name);
      })
      .catch(err => console.error('Fetch error:', err));
  }, [backendAddress, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name,
      series: season.series
    };

    fetch(`${backendAddress}/api/seasons/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => {
        navigate(`/manage-seasons?seriesId=${season.series.id}`);
      })
      .catch(err => console.error('Update error:', err));
  };

  if (!season) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Update Season</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Season name"
          className="w-full p-2 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Update Season
        </button>
      </form>
    </div>
  );
}

export default UpdateSeason;
