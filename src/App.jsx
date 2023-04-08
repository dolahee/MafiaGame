import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import GamePage from './pages/GamePage';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import useSocket from './hooks/useSocket';
import Invite from './pages/Invite';

function App() {
  useSocket();
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/gamepage/:room" element={<GamePage />} />
      <Route path="/gamepage/:room/invite" element={<Invite />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
