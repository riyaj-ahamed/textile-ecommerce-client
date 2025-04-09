import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Register user
export const register = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

// Login user
export const login = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};
