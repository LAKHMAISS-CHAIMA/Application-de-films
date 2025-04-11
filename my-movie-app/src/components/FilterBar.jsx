import React from 'react';

function FilterBar({ setFilter, activeFilter = 'popular' }) {
  return (
    <div className="flex flex-wrap gap-4 ml-7 mb-4">
      <button 
        onClick={() => setFilter("popular")} 
        className={`btn flex items-center px-4 py-2 rounded-full border transition-colors ${
          activeFilter === 'popular'
            ? 'border-red-500 bg-red-500 text-white'
            : 'border-gray-400 dark:bg-gray-800 bg-gray-200 dark:text-white text-black hover:bg-red-500 hover:text-white hover:border-red-500'
        }`}
      >
         Populaires
      </button>
      <button 
        onClick={() => setFilter("top_rated")} 
        className={`btn flex items-center px-4 py-2 rounded-full border transition-colors ${
          activeFilter === 'top_rated'
            ? 'border-red-500 bg-red-500 text-white'
            : 'border-gray-400 dark:bg-gray-800 bg-gray-200 dark:text-white text-black hover:bg-red-500 hover:text-white hover:border-red-500'
        }`}
      >
         Top Rated
      </button>
      <button 
        onClick={() => setFilter("now_playing")} 
        className={`btn flex items-center px-4 py-2 rounded-full border transition-colors ${
          activeFilter === 'now_playing'
            ? 'border-red-500 bg-red-500 text-white'
            : 'border-gray-400 dark:bg-gray-800 bg-gray-200 dark:text-white text-black hover:bg-red-500 hover:text-white hover:border-red-500'
        }`}
      >
         Tendances
      </button>
    </div>
  );
}

export default FilterBar;