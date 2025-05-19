#!/bin/bash

echo "== Setting up YaCy =="
cd "$(dirname "$0")"

# Check for Java
if ! command -v java &> /dev/null; then
  echo "Java not found. Please install OpenJDK 11+."
  exit 1
fi

# Start YaCy
cd yacy || { echo "Missing 'yacy' folder."; exit 1; }
./startYACY.sh &

# Wait briefly then open browser
sleep 5
echo "Opening http://localhost:8090"
if command -v open &> /dev/null; then
  open http://localhost:8090
elif command -v xdg-open &> /dev/null; then
  xdg-open http://localhost:8090
else
  echo "Please open http://localhost:8090 in your browser."
fi
