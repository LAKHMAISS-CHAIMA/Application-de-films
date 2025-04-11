import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FavorisMovie() {
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favoris')) || [];
    setFavoris(saved);
  }, []);

  const removeMovie = (id) => {
    const updated = favoris.filter(movie => movie.imdbID !== id);
    setFavoris(updated);
    localStorage.setItem('favoris', JSON.stringify(updated));
  };

  return (
    <div className="p-6 text-black dark:text-white">
      <h2 className="text-3xl font-bold mb-4">Mes Films Favoris</h2>
      {favoris.length === 0 ? (
        <p>Aucun favori enregistré.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favoris.map(movie => (
            <div key={movie.imdbID} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow">
              <img src={movie.Poster} alt={movie.Title} className="w-full h-[300px] object-cover" />
              <h3 className="font-bold mt-2">{movie.Title}</h3>
              <div className="flex justify-between mt-2 text-sm">
                <Link to={`/movie/${movie.imdbID}`} className="text-red-600 hover:underline">
                  Voir plus
                </Link>
                <button
                  onClick={() => removeMovie(movie.imdbID)}
                  className="text-white bg-red-700 px-2 py-1 rounded hover:bg-red-800"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavorisMovie;
