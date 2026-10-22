# ---- Stage 1: install production dependencies only ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# Use the lockfile when present (reproducible), otherwise fall back to install.
RUN if [ -f package-lock.json ]; then npm ci --omit=dev || npm install --omit=dev; else npm install --omit=dev; fi

# ---- Stage 2: small runtime image ----
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app

# /app must be writable by the non-root user (winston writes to /app/logs)
RUN mkdir -p /app/logs && chown -R node:node /app

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package*.json ./
COPY --chown=node:node src ./src
COPY --chown=node:node scripts ./scripts

USER node
EXPOSE 5000

# The /health route reports DB state; compose waits for this before starting the web proxy.
HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
  CMD wget -qO- http://127.0.0.1:5000/api/v1/health >/dev/null || exit 1

CMD ["node", "src/server.js"]
