import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import CreateUser from './pages/CreateUser';
import Hub from './pages/Hub';
import LoginPage from './pages/LoginPage';
import Test from './pages/Test';
import ProtectedRoute from './pages/components/ProtectedRoute'; // Import your protected route component

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<ProfilePage />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/LoginPage" element={<LoginPage />} />

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
          path="/Test" 
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}
