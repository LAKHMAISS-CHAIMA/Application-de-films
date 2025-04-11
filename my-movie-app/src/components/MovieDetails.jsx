import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=613d34d1&i=${id}&plot=full`);
        if (res.data.Response === 'True') {
          setMovie(res.data);
        }
      } catch (err) {
        console.error('Erreur:', err);
      }
      setLoading(false);
    };

    getMovie();
  }, [id]);

  const addToFavorites = () => {
    const saved = JSON.parse(localStorage.getItem('favoris')) || [];
    const exists = saved.find(m => m.imdbID === movie.imdbID);
    
    if (!exists) {
      saved.push(movie);
      localStorage.setItem('favoris', JSON.stringify(saved));
      
      setAlertMessage('Ajouté aux favoris !');
      setAlertType('success');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      setAlertMessage('Déjà dans les favoris.');
      setAlertType('info');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  if (loading) return <Loader />;
  if (!movie) return <p>Film non trouvé</p>;

  return (
    <div className="p-6 text-black dark:text-white relative">
      {showAlert && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 
                      ${alertType === 'success' ? 'bg-green-600' : 'bg-blue-600'}
                      transform transition-all duration-500 animate-bounce`}
        >
          <div className="flex items-center">
            <span className="text-xl mr-2">
              {alertType === 'success' ? '🎬' : 'ℹ️'}
            </span>
            <span className="font-medium">{alertMessage}</span>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold">{movie.Title}</h1>
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <div>
          <img src={movie.Poster} alt={movie.Title} className="w-60 rounded-lg shadow-lg" />
          
          {movie.imdbRating && (
            <div className="bg-yellow-500 text-black mt-4 p-2 rounded-md inline-block">
              <span className="font-bold text-xl">★ {movie.imdbRating}/10</span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <p className="mb-4 text-lg leading-relaxed">{movie.Plot}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Année:</strong> {movie.Year}</p>
            <p><strong>Réalisateur:</strong> {movie.Director}</p>
            <p><strong>Durée:</strong> {movie.Runtime}</p>
            
            <div className="col-span-2">
              <p><strong>Acteurs:</strong> {movie.Actors}</p>
            </div>
          </div>
          
          {movie.Awards && <p className="mb-2"><strong>Récompenses:</strong> {movie.Awards}</p>}
          
          <div className="mt-6 flex gap-4">
            <button
              onClick={addToFavorites}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Ajouter aux favoris
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;