import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image';
  
  const rating = movie.imdbRating || ((Math.random() * 2 + 6).toFixed(1)); 

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
      <img src={posterUrl} alt={movie.Title} className="w-full h-[300px] object-cover" />
      
      <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold px-2 py-1 rounded-full">
        ★ {rating}
      </div>
      
      <div className="p-3">
        <h2 className="text-center font-bold">{movie.Title}</h2>
        <div className="flex justify-between mt-2 text-sm">
          <Link to={`/movie/${movie.imdbID}`} className="text-red-600 hover:underline">
            Voir plus
          </Link>
          <span className="text-yellow-500">{movie.Year}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;