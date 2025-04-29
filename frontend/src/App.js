import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProfilePage from './login/ProfilePage';
import CreateUser from './login/CreateUser';
import Hub from './user/pages/Hub';
import LoginPage from './login/LoginPage';
import Video from './user/pages/Video';
import ProtectedRoute from './components/ProtectedRoute';
import Settings from './user/pages/manageAccount/Settings';
import Movies from './user/pages/Film/Movies';
import MovieDetail from './user/pages/Film/MovieDetails';
import MyList from './user/pages/Film/MyList';
import UserFilmList from './user/pages/Film/UserFilmList';
import HubNavbar from './components/HubNavbar';
import CreateFilm from './user/pages/Film/CreateFilm';
import UpdateFilm from './user/pages/Film/UpdateFilm';
import TVShow from './user/pages/TVShow/TVShow';
import TVShowDetails from './user/pages/TVShow/TVShowDetails';
import TVSeries from './user/pages/TVShow/TVSeries';
import EpisodeList from './user/pages/Episode/EpisodeList';
import Manager from './admin/Manager';
import VideoStreamer from './VideoStreamer';


function AppContent() {
  const location = useLocation();
  const excludedPaths = ["/", "/CreateUser", "/LoginPage"];

  return (
    <>
      {!excludedPaths.includes(location.pathname) && <HubNavbar />}

      <Routes>
      <Route path="/TVSeries" element={<TVSeries />} />
        <Route path="/" element={<ProfilePage />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/CreateFilm" element={<CreateFilm />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Video" element={<Video />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Movies/:id" element={<MovieDetail />} />
        <Route path="/MyList/:id" element={<MyList />} />
        <Route path="/user-films" element={<UserFilmList />} />
        <Route path="/update-film/:id" element={<UpdateFilm />} />
        <Route path="/TVSeries/:tvShowId" element={<EpisodeList />} />
        <Route path="/Test" element={<VideoStreamer />} />
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
