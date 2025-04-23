import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import CreateUser from './pages/CreateUser';
import Hub from './pages/Hub';
import LoginPage from './pages/LoginPage';



export default function App() {
  return (
    <Router>
    <Routes>
       <Route path="/" element={<ProfilePage/>} />
      <Route path="/CreateUser" element={<CreateUser />} />
      <Route path="/Hub" element={<Hub/>} />
      <Route path="/LoginPage" element={<LoginPage/>} />
    </Routes>
  </Router>
  )
}