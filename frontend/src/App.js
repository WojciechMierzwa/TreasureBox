import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProfilePage from './login/ProfilePage';
import CreateUser from  './user/pages/manageAccount/CreateUser';
import Hub from './user/pages/Hub';
import LoginPage from './login/LoginPage';
import Video from './user/pages/Video';
import ProtectedRoute from './components/ProtectedRoute';
import Settings from './user/pages/manageAccount/Settings';
import Movies from './user/pages/Film/Movies';
import MovieDetail from './user/pages/Film/MovieDetails';
import MyList from './user/pages/Film/MyList';
import HubNavbar from './components/HubNavbar';
import CreateFilm from './user/pages/Film/CreateFilm';
import UpdateFilm from './user/pages/Film/UpdateFilm';
import Serie from './user/pages/TVShow/Serie';
import TVShowDetails from './user/pages/TVShow/TVShowDetails';
import Series from './user/pages/TVShow/Series';
import EpisodeList from './user/pages/Episode/EpisodeList';
import Manager from './admin/Manager';
import VideoStreamer from './VideoStreamer';
import MovieManager from './admin/filmManage/MovieManager';
import SeriesManager from './admin/filmManage/SeriesManager';
import TVSerieManager from './admin/filmManage/ManageEpisodes';
import Block from './components/Block'

function AppContent() {
  const location = useLocation();
  const excludedPaths = ["/", "/CreateUser", "/LoginPage"];

  return (
    <>
      {!excludedPaths.includes(location.pathname) && <HubNavbar />}

      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/CreateFilm" element={<CreateFilm />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/watch/movie" element={<Video />} />
        <Route path="/watch/episode" element={<Video />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Movies/:id" element={<MovieDetail />} />
        <Route path="/MyList/:id" element={<MyList />} />
        <Route path="/update-film/:id" element={<UpdateFilm />} />
        <Route path="/Series" element={<Series />} />
        <Route path="/Series/:id" element={<Serie />} />
        <Route path="/Block" element={<Block />} />

        {/* Manage Episodes */}
        <Route path="/SeriesManager/:id" element={<TVSerieManager />} /> 
        
        {/* Admin Routes */}
        <Route path="/MoviesManager" element={<MovieManager />} />
        <Route path="/SeriesManager" element={<SeriesManager />} />

        {/* Protected Routes */}
        <Route
          path="/Hub"
          element={
            <ProtectedRoute>
              <Hub />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Manager"
          element={
            <ProtectedRoute>
              <Manager />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
