import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Serie() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;

    fetch(`${backendAddress}/api/series/${id}`)
      .then(res => res.json())
      .then(data => setSerie(data))
      .catch(err => console.error('Error fetching series:', err));
  }, [id]);

  if (!serie) return <p>Loading series details...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{serie.name}</h1>
      <p className="text-lg mb-2">Genre: {serie.genre}</p>
    </div>
  );
}

export default Serie;
