// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // or your production backend URL
  withCredentials: true, // include cookies if using auth tokens
});

// Named API calls
export const login = (userData) => API.post('/auth/login', userData);
export const register = (userData) => API.post('/auth/register', userData);
export const getProducts = () => API.get('/v1/products');

// ✅ Add default export
export default API;
