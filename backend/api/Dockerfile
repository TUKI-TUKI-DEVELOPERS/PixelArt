# ─── Base ─────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS base
WORKDIR /app
# wget: requerido por el healthcheck del docker-compose
RUN apk add --no-cache \
  dumb-init wget \
  chromium \
  harfbuzz \
  font-noto \
  ca-certificates
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# ─── Dev (hot-reload via nest start --watch) ──────────────────────────────────
# El código fuente llega por bind mount en compose (../../backend/api:/app).
# Un volumen nombrado (api_node_modules) protege /app/node_modules del bind.
FROM base AS dev
COPY package*.json ./
RUN npm install
EXPOSE 3001
CMD ["dumb-init", "npm", "run", "dev"]

# ─── Build ────────────────────────────────────────────────────────────────────
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ─── Production ───────────────────────────────────────────────────────────────
FROM base AS prod
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 3001
CMD ["dumb-init", "node", "dist/main"]
