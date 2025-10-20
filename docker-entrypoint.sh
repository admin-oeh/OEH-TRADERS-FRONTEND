#!/bin/sh

# Set default environment variables if not set
export BACKEND_URL=${BACKEND_URL:-https://o-e-h-traders.up.railway.app}
export API_URL=${API_URL:-https://o-e-h-traders.up.railway.app/api}

# Create runtime environment variables for the React app
echo "window.env = {" > /usr/share/nginx/html/env-config.js
echo "  REACT_APP_BACKEND_URL: '${BACKEND_URL}'," >> /usr/share/nginx/html/env-config.js
echo "  REACT_APP_API_URL: '${API_URL}'" >> /usr/share/nginx/html/env-config.js
echo "};" >> /usr/share/nginx/html/env-config.js

# Substitute environment variables in nginx config
envsubst '${BACKEND_URL}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx
exec "$@"