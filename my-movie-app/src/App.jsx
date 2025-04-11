import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import MovieDetails from './components/MovieDetails';
import FavorisMovie from './components/FavorisMovie';

function App() {
  const [type, setType] = useState('movie');         
  const [searchTerm, setSearchTerm] = useState('');  

  useEffect(() => {
    const handleSearch = (event) => {
      setSearchTerm(event.detail.term);
    };

    window.addEventListener('movie-search', handleSearch);

    return () => {
      window.removeEventListener('movie-search', handleSearch);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <Header onFilterChange={setType} />

      <Routes>
        <Route path="/" element={<Home type={type} searchTerm={searchTerm} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favoris" element={<FavorisMovie />} />
      </Routes>
    </div>
  );
}

export default App;
