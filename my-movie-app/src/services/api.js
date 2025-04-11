import axios from 'axios';

const API_KEY = '613d34d1';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, type = 'movie') => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
      type: type,
    },
  });

  return response.data;
};

export const getFilteredMovies = async (filter, type = 'movie') => {
  let params = {
    apikey: API_KEY,
    type: type,
  };
  
  switch (filter) {
    case 'popular':
      params.s = 'movie';  
      params.y = new Date().getFullYear() - 1; 
      break;
    
    case 'top_rated':
      params.s = 'award'; 
      break;
    
    case 'now_playing':
      params.s = 'new';
      params.y = new Date().getFullYear();
      break;
    
    default:
      params.s = 'movie';
  }
  
  const response = await axios.get(BASE_URL, { params });
  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
      plot: 'full',
    },
  });

  return response.data;
};