/**
 * Centralized Axios HTTP client.
 *
 * The base URL points to the FastAPI backend. Change VITE_API_URL in
 * a .env file to override (e.g. for production deployments).
 */
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic response error logger — useful during development.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API error', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network error', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
