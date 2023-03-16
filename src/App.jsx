import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import GamePage from './pages/GamePage/GamePage';
import Main from './pages/Main';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/gamepage" element={<GamePage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
