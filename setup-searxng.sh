#!/bin/bash

echo "== Setting up SearXNG =="
cd "$(dirname "$0")"

# Check for Docker
if ! command -v docker &> /dev/null; then
  echo "Docker not found. Please install Docker."
  exit 1
fi

# Check for Docker Compose
if ! command -v docker-compose &> /dev/null; then
  echo "Docker Compose not found. Please install Docker Compose."
  exit 1
fi

# Create data directory for SearXNG
mkdir -p searxng-data

# Start SearXNG using Docker Compose
echo "Starting SearXNG..."
docker-compose up -d searxng

# Wait for SearXNG to start
echo "Waiting for SearXNG to start..."
sleep 10

# Check if SearXNG is running
if curl -s http://localhost:8888/healthz > /dev/null; then
  echo "SearXNG is running at http://localhost:8888"
else
  echo "SearXNG failed to start. Check docker logs for more information."
  docker-compose logs searxng
  exit 1
fi

echo "SearXNG setup complete!"