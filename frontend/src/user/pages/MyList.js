import React from 'react';
import { useParams } from 'react-router-dom';
import EpisodesUserList from './TVShow/EpisodeUserList';
import MoviesUserList from './Film/MovieUserList';

function MyList() {
  const { id } = useParams();

  return (
    <div className="flex flex-col px-4">
      <h1 className="text-2xl font-bold text-center mb-6">My Watchlist</h1>
      <div>
        <MoviesUserList />
        <EpisodesUserList />
      </div>
    </div>
  );
}

export default MyList;
