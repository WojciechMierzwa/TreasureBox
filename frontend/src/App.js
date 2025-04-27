import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import CreateUser from './pages/User/CreateUser';
import Hub from './pages/Hub';
import LoginPage from './pages/User/LoginPage';
import Video from './pages/Video';
import ProtectedRoute from './pages/components/ProtectedRoute';
import Settings from './pages/Settings';
import DeleteUser from './pages/User/DeleteUser';
import Movies from './pages/Film/Movies';
import MovieDetail from './pages/Film/MovieDetails';
import Test from './pages/Film/Test';
import UserFilmList from './pages/Film/UserFilmList';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<ProfilePage />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Video" element={<Video />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Movies/:id" element={<MovieDetail />} />
        <Route path="/Test/:id" element={<Test />} />
        <Route path="/user-films" element={<UserFilmList />} />

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
          path="/DeleteUser" 
          element={
            <ProtectedRoute>
              <DeleteUser />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}
