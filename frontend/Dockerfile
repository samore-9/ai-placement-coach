# ---- Stage 1: build the static site ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci || npm install; else npm install; fi
COPY . .

# Vite bakes VITE_* values into the bundle at BUILD time. "/api/v1" is relative,
# so the browser calls the same origin and the proxy forwards it to the backend.
ARG VITE_API_BASE_URL=/api/v1
ARG VITE_GOOGLE_CLIENT_ID=
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
RUN npm run build

# ---- Stage 2: Caddy serves the build + proxies /api to the backend ----
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
