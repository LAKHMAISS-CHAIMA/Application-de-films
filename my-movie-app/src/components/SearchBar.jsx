import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full md:w-96">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Rechercher un film ou une série..."
        className="w-full pl-10 pr-4 py-2 rounded-full bg-transparent border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </form>
  );
}

export default SearchBar;
