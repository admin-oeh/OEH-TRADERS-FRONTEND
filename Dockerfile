# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies
RUN npm install --silent

# Copy source code
COPY . .

# Create environment configuration script
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'set -e' >> /docker-entrypoint.sh && \
    echo 'echo "Creating runtime environment configuration..."' >> /docker-entrypoint.sh && \
    echo 'cat > ./public/env-config.js << EOF' >> /docker-entrypoint.sh && \
    echo 'window.env = {' >> /docker-entrypoint.sh && \
    echo '  REACT_APP_BACKEND_URL: \"'"'"'${REACT_APP_BACKEND_URL:-https://o-e-h-traders.up.railway.app}'"'"'\",' >> /docker-entrypoint.sh && \
    echo '  REACT_APP_API_URL: \"'"'"'${REACT_APP_API_URL:-https://o-e-h-traders.up.railway.app/api}'"'"'\"' >> /docker-entrypoint.sh && \
    echo '};' >> /docker-entrypoint.sh && \
    echo 'EOF' >> /docker-entrypoint.sh && \
    echo 'echo "Building React application..."' >> /docker-entrypoint.sh && \
    echo 'npm run build' >> /docker-entrypoint.sh && \
    echo 'echo "Starting server..."' >> /docker-entrypoint.sh && \
    echo 'exec npm start' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

# Build the application
RUN npm run build

# Install serve to run the production build
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Use custom entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]