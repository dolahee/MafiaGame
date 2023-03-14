import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import GamePage from './pages/GamePage/GamePage';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import ToggleColorMode from './pages/ToggleColorMode';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/gamepage" element={<GamePage />} />
      <Route path="/tset" element={<ToggleColorMode />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
