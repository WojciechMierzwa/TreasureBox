import React from 'react';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function Block({ name, genre }) {
  const randomColor = getRandomColor(); // Losowy kolor tła

  return (
    <div
      className="p-6 shadow-lg rounded-xl w-72 h-48 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
      style={{ backgroundColor: randomColor }}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold text-white">{name}</h2>
        <div className="text-white text-2xl">
          🎬
        </div>
      </div>
      <p className="text-lg text-white">{genre}</p>
    </div>
  );
}

export default Block;
