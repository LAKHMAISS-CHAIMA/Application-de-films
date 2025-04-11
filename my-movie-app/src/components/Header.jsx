import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import Movielogo from '../assets/movie logo.jpg';

function Header({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState('movie');
  const navigate = useNavigate();

  const handleSearch = (term) => {
    const event = new CustomEvent('movie-search', {
      detail: { term },
    });
    window.dispatchEvent(event);
    navigate('/');
  };

  const changeFilter = (type) => {
    setActiveFilter(type);
    onFilterChange(type);
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="flex items-center gap-2">
        <img src={Movielogo} alt="logo" className="w-10 h-10 rounded-full" />
        <Link to="/" className="text-2xl font-bold text-red-600">
          MovieApp
        </Link>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="flex gap-3 items-center">
        <button
          onClick={() => changeFilter('movie')}
          className={`px-3 py-1 rounded-full ${
            activeFilter === 'movie'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-red-500 hover:text-white'
          }`}
        >
          Films
        </button>

        <button
          onClick={() => changeFilter('series')}
          className={`px-3 py-1 rounded-full ${
            activeFilter === 'series'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-red-500 hover:text-white'
          }`}
        >
          Séries
        </button>

        <Link
          to="/favoris"
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-red-500 hover:text-white"
        >
          Favoris
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
