#!/bin/bash
cd public
npm install
npm run build
cp vercel.json dist/