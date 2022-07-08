import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '1015056f116855e0c2e021afa8b7aa4e',
    language: 'es-ES',
  },
});

export default movieDB;
