#!/bin/bash
set -e

# Navigate to the public directory
cd public

# Install dependencies
npm install

# Build the application
npm run build

# Copy the build output to the root directory
mkdir -p ../dist
cp -r dist/* ../dist/

echo "Build completed successfully!"