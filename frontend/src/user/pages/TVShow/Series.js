import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import Block from '../../../components/Block';

function Series() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  
    fetch(`${backendAddress}/api/series`)
      .then(res => res.json())
      .then(data => {
        setRecords(data); 
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div className="flex flex-wrap justify-start items-start gap-4 p-8">
      {records.length === 0 ? (
        <p>Loading TV Series...</p>
      ) : (
        records.map(series => (
          <div 
            key={series.id} 
            className="m-4"
            onClick={() => navigate(`/Series/${series.id}`)} 
          >
            <Block name={series.name} genre={series.genre} picture={series.picture} /> 
          </div>
        ))
      )}
    </div>
  );
}

export default Series;
