# Simplified Dockerfile - Express serves everything
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build both frontend and backend
RUN npm run build
RUN npm run build:server

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy compiled backend and frontend
COPY --from=builder /app/dist/server ./dist/server
COPY --from=builder /app/dist ./dist

# Create data directory
RUN mkdir -p /app/data

EXPOSE 80

ENV NODE_ENV=production

CMD ["node", "dist/server/server/server.js"]
