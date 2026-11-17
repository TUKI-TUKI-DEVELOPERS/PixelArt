#!/usr/bin/env bash
# Rebuilds and restarts the production stack from the commit currently
# checked out in /opt/pixelart, then waits until web and api are healthy.
# Called by .github/workflows/deploy.yml; safe to run by hand on the server.
set -euo pipefail

cd "$(dirname "$0")/.."

COMPOSE=(docker compose --env-file .env.docker.local -f infra/docker/docker-compose.prod.yml)

"${COMPOSE[@]}" up -d --build --remove-orphans

echo "Waiting for api and web to become healthy..."
for _ in $(seq 1 60); do
  if "${COMPOSE[@]}" exec -T api wget -qO- http://localhost:3001/api/health >/dev/null 2>&1 \
    && curl -fsS -o /dev/null http://127.0.0.1:3000/; then
    echo "Deploy healthy at $(git rev-parse --short HEAD)"
    docker image prune -f >/dev/null
    exit 0
  fi
  sleep 5
done

echo "Health check failed" >&2
"${COMPOSE[@]}" ps >&2
"${COMPOSE[@]}" logs --tail=80 api web >&2
exit 1
