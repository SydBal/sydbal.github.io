FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install curl for healthchecks
RUN apk add --no-cache curl

# Copy package metadata first to leverage Docker cache on dependency install
COPY package.json package-lock.json ./

# Install only production dependencies (this keeps the image small)
RUN npm ci --omit=dev

# Copy app sources
COPY . .

# Expose server port
EXPOSE 3000

# Default environment
ENV NODE_ENV=production
ENV PORT=3000

# Healthcheck (requires curl installed above)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -fsS http://localhost:${PORT:-3000}/ || exit 1

# Start the server
CMD ["npm", "start"]
