import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Base URL of your backend
  withCredentials: true, // Allow cookies to be sent with requests
});

export default api;