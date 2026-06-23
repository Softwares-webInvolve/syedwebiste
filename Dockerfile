# syntax=docker/dockerfile:1

# ============================================================
#  Syed Mustahsan — Timeless Tales
#  Multi-stage build: compile the Vite app, serve via nginx.
#  Serves on port 8080 (set the same port in Easypanel).
# ============================================================

# ---- Stage 1: build the static site ----
FROM node:20-alpine AS build
WORKDIR /app

# Install deps from the lockfile (reproducible)
COPY package.json package-lock.json ./
RUN npm ci

# Build
COPY . .
RUN npm run build

# ---- Stage 2: serve with nginx ----
FROM nginx:1.27-alpine AS serve

# SPA-aware server config (listens on 8080)
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

# Basic container healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
