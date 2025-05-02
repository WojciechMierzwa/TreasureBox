import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function CreateSeason() {
  const [searchParams] = useSearchParams();
  const seriesId = searchParams.get('seriesId') ?? '';
  const [name, setName] = useState('');
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name,
      series: { id: Number(seriesId) }
    };

    fetch(`${backendAddress}/api/seasons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => {
        navigate(`/manage-seasons?seriesId=${seriesId}`);
      })
      .catch(err => console.error('Create error:', err));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Season</h1>
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
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Season
        </button>
      </form>
    </div>
  );
}

export default CreateSeason;
