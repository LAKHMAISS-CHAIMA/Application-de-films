import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import Loader from './Loader';
import { searchMovies, getFilteredMovies } from '../services/api';

function MovieList({ type = 'movie', searchTerm = '', filter = 'popular' }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError('');
      
      try {
        let data;
        
        if (searchTerm) {
          data = await searchMovies(searchTerm, type);
        } else {
          const currentFilter = filter || 'popular';
          data = await getFilteredMovies(currentFilter, type);
        }

        if (data && data.Search && data.Search.length > 0) {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data?.Error || 'Aucun film trouvé');
        }
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        setMovies([]);
        setError('Erreur de chargement des films');
      }
      
      setLoading(false);
    };

    fetchMovies();
  }, [type, searchTerm, filter]);

  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {movies.length > 0 ? (
        movies.map(movie => <MovieCard key={movie.imdbID} movie={movie} />)
      ) : (
        <p className="col-span-full text-center text-red-500">
          {error || 'Aucun film trouvé.'}
        </p>
      )}
    </div>
  );
}

export default MovieList;