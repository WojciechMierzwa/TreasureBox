import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import CreateUser from './pages/User/CreateUser';
import Hub from './pages/Hub';
import LoginPage from './pages/User/LoginPage';
import Video from './pages/Video';
import ProtectedRoute from './pages/components/ProtectedRoute';
import Settings from './pages/submenu/Settings';
import Movies from './pages/Film/Movies';
import MovieDetail from './pages/Film/MovieDetails';
import MyList from './pages/Film/MyList';
import UserFilmList from './pages/Film/UserFilmList';
import HubNavbar from './pages/components/HubNavbar';
import CreateFilm from './pages/Film/CreateFilm';
import UpdateFilm from './pages/Film/UpdateFilm';

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
        <Route path="/Video" element={<Video />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Movies/:id" element={<MovieDetail />} />
        <Route path="/MyList/:id" element={<MyList />} />
        <Route path="/user-films" element={<UserFilmList />} />
        <Route path="/update-film/:id" element={<UpdateFilm />} />


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
