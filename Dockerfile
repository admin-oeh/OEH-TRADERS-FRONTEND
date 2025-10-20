# Multi-stage build for production
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage - Using different nginx image
FROM nginxinc/nginx-unprivileged:alpine

# Install gettext for envsubst (environment variable substitution)
USER root
RUN apk add --no-cache gettext
USER nginx

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-default.conf.template /etc/nginx/templates/default.conf.template

# Copy built app from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Create a script to handle environment variables
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

# Expose port
EXPOSE 8080

# Use custom entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]