// src/utils/constants.js
// export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';
// export const API = `${BACKEND_URL}/api`;

export const BACKEND_URL = process.env.REACT_APP_API_BASE_URL ? process.env.REACT_APP_API_BASE_URL.replace('/api', '') 
  : 'https://oehtradersbackend-production.up.railway.app';

export const API = process.env.REACT_APP_API_BASE_URL || 'https://oehtradersbackend-production.up.railway.app/api';