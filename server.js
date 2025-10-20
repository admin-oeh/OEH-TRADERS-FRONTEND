const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

// Environment config endpoint
app.get('/env-config.js', (req, res) => {
  const config = `window.env = {
    REACT_APP_BACKEND_URL: '${process.env.REACT_APP_BACKEND_URL || 'https://o-e-h-traders.up.railway.app'}',
    REACT_APP_API_URL: '${process.env.REACT_APP_API_URL || 'https://o-e-h-traders.up.railway.app/api'}'
  };`;
  res.type('application/javascript').send(config);
});

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 OEH Traders frontend server running on port ${PORT}`);
  console.log(`📊 Backend URL: ${process.env.REACT_APP_BACKEND_URL || 'https://o-e-h-traders.up.railway.app'}`);
});