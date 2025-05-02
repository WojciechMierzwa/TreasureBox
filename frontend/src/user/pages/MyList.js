import React from 'react';
import { useParams } from 'react-router-dom';
import EpisodesUserList from './TVShow/EpisodeUserList';
import MoviesUserList from './Film/MovieUserList';

function MyList() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">My Watchlist</h1>
      <MoviesUserList />
      <EpisodesUserList />
    </div>
  );
}

export default MyList;
