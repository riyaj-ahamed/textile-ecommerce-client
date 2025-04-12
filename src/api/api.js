// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'https://your-backend.onrender.com';

export const login = (data) => axios.post(`${API_BASE_URL}/api/auth/login`, data);
export const register = (data) => axios.post(`${API_BASE_URL}/api/auth/register`, data);
