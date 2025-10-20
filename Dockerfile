FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps --silent

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Create environment config
RUN echo "window.env = { \
  REACT_APP_BACKEND_URL: 'https://o-e-h-traders.up.railway.app', \
  REACT_APP_API_URL: 'https://o-e-h-traders.up.railway.app/api' \
};" > ./build/env-config.js

# Install a specific version of serve that works
RUN npm install -g serve@14.2.1

EXPOSE 3000

# Use the correct serve command syntax
CMD ["serve", "-s", "build", "-p", "3000"]