# ─── Base ─────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS base
WORKDIR /app
# wget: requerido por el healthcheck del docker-compose
RUN apk add --no-cache dumb-init wget

# ─── Dev (hot-reload via next dev) ────────────────────────────────────────────
# El código fuente llega por bind mount en compose (../../frontend/web:/app).
# Volúmenes nombrados (web_node_modules, web_next) protegen esas carpetas del bind.
FROM base AS dev
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["dumb-init", "npm", "run", "dev"]

# ─── Build ────────────────────────────────────────────────────────────────────
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
# API_INTERNAL_URL debe estar disponible en build time para que Next.js standalone
# baquee correctamente el rewrite /api/* → http://api:3001 (red Docker interna).
ARG API_INTERNAL_URL=http://api:3001
ENV API_INTERNAL_URL=${API_INTERNAL_URL}
RUN npm run build

# ─── Production (standalone output) ───────────────────────────────────────────
FROM base AS prod
ENV NODE_ENV=production
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
EXPOSE 3000
CMD ["dumb-init", "node", "server.js"]
