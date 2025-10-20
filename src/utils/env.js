// Utility to access environment variables at runtime
export const getEnv = (key) => {
  // During development, use process.env (create-react-app default)
  if (process.env.NODE_ENV === 'development') {
    return process.env[key];
  }
  
  // In production, use window.env (set by our Docker entrypoint script)
  if (typeof window !== 'undefined' && window.env) {
    return window.env[key];
  }
  
  // Fallback for build time or missing values
  return process.env[key];
};

// Convenience methods for specific environment variables
export const getBackendUrl = () => getEnv('REACT_APP_BACKEND_URL');
export const getApiUrl = () => getEnv('REACT_APP_API_URL');
export const getNodeEnv = () => getEnv('NODE_ENV');

// Validation with fallbacks
export const getRequiredEnv = (key) => {
  const value = getEnv(key);
  if (!value) {
    console.warn(`Required environment variable ${key} is not set`);
  }
  return value;
};