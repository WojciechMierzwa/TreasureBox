import React from 'react'
import { useLocation } from 'react-router-dom';
import HubNavbar from './components/HubNavbar'

function Hub() {
  const location = useLocation();
  const user = location.state?.user;
  return (
    <div>
      <HubNavbar user={user} />
      <p>test</p>
    </div>
  )
}

export default Hub