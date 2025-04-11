import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import FilterBar from '../components/FilterBar';

function Home({ type }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('popular');

  useEffect(() => {
    const handleSearchEvent = (e) => {
      setSearchTerm(e.detail.term);
    };

    window.addEventListener('movie-search', handleSearchEvent);
    return () => window.removeEventListener('movie-search', handleSearchEvent);
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSearchTerm('');
  };

  return (
    <div className="p-6 dark:bg-gray-900 bg-gray-50 dark:text-white text-black">
      <h1 className="text-4xl font-bold mb-2">Movies APP</h1>
      <p className="mb-6">The best app to discover movies and series.</p>

      <FilterBar setFilter={handleFilterChange} activeFilter={filter} />

      <div className="mt-8">
        {searchTerm && (
          <div className="mb-4">
            <h2 className="text-lg">Résultats pour : <strong>{searchTerm}</strong></h2>
          </div>
        )}

        <MovieList 
          searchTerm={searchTerm} 
          type={type || 'movie'} 
          filter={searchTerm ? '' : filter} 
        />
      </div>
    </div>
  );
}

export default Home;