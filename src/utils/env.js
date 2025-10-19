// Environment variables utility
export const getEnvVariables = () => {
  const env = {
    nodeEnv: process.env.NODE_ENV,
    apiUrl: process.env.REACT_APP_API_URL,
    tawkToId: process.env.REACT_APP_TAWK_TO_PROPERTY_ID,
    siteName: process.env.REACT_APP_SITE_NAME,
    isProduction: process.env.NODE_ENV === 'production',
    disableHotReload: process.env.DISABLE_HOT_RELOAD === 'true'
  };

  console.log('🔧 Environment Variables:', env);
  return env;
};

// Initialize on import
getEnvVariables();