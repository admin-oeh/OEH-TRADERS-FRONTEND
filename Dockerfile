# Use official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY package-lock.json* ./
COPY yarn.lock* ./

# Install dependencies with legacy peer deps to resolve conflicts
RUN npm install --legacy-peer-deps --silent

# Copy source code
COPY . .

# Create production build
RUN npm run build

# Create environment config
RUN echo "window.env = { \
  REACT_APP_BACKEND_URL: 'https://o-e-h-traders.up.railway.app', \
  REACT_APP_API_URL: 'https://o-e-h-traders.up.railway.app/api' \
};" > ./build/env-config.js

# Install serve globally
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start server
CMD ["serve", "-s", "build", "-l", "3000"]