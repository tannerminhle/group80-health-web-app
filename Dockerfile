# ─────────────────────────────────────────
# Stage 1: Build React frontend
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package.json package-lock.json ./

RUN npm ci --include=dev

# Copy source code
COPY . .

# Build Vite frontend → outputs to src/client/dist
RUN npm run build

# ─────────────────────────────────────────
# Stage 2: Production Express server
# ─────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Only install production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY src/server ./src/server

# Copy built frontend from builder stage
COPY --from=builder /app/src/client/dist ./src/client/dist

# Security: run as non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose Express port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:5000/api || exit 1

CMD ["node", "src/server/index.js"]
