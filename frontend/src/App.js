import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import CreateUser from './pages/User/CreateUser';
import Hub from './pages/Hub';
import LoginPage from './pages/User/LoginPage';
import Test from './pages/Video';
import ProtectedRoute from './pages/components/ProtectedRoute';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<ProfilePage />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Test" element={<Test />} />

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
    </Router>
  );
}
