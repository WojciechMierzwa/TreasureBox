import React from 'react';
import { useParams } from 'react-router-dom';
import EpisodesUserList from './TVShow/EpisodeUserList';
import MoviesUserList from './Film/MovieUserList';

function MyList() {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center px-4">
      <h1 className="text-2xl font-bold text-center mb-6">My Watchlist</h1>
      <div className="w-full max-w-4xl space-y-8">
        <MoviesUserList />
        <EpisodesUserList />
      </div>
    </div>
  );
}

export default MyList;
