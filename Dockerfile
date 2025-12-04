# Multi-stage build for production deployment
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build both frontend and backend
RUN npm run build
RUN npm run build:server

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files for production dependencies
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist/server ./dist/server
COPY --from=builder /app/server ./server

# Create data directory for JSON storage
RUN mkdir -p /app/data

# Expose ports
EXPOSE 3001 5173

# Set environment to production
ENV NODE_ENV=production

# Start the application (backend server and serve frontend)
CMD ["node", "dist/server/server.js"]
