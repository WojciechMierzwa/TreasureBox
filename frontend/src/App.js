import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CreateUser from './pages/CreateUser';



export default function App() {
  return (
    <Router>
    <Routes>
       <Route path="/" element={<LoginPage />} />
      <Route path="/CreateUser" element={<CreateUser />} />
    </Routes>
  </Router>
  )
}