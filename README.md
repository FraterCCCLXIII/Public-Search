# Public Search

A modern, user-friendly search interface for YaCy decentralized search engine with enhanced UI features.

## Project Overview

This project provides a modern web interface for the YaCy decentralized search engine. It consists of:

1. **YaCy Backend**: A peer-to-peer distributed search engine
2. **Simple HTML/JS Interface**: Basic search interface (index.html, script.js, styles.css)
3. **Modern React UI**: Enhanced user interface with React, TypeScript, and Material UI

## Requirements

- Java 11+ (for YaCy)
- Ant (for building YaCy)
- Git
- Node.js 16+ and npm (for React UI)
- Python 3.6+ (for the simple server)

### macOS Setup
```bash
brew install openjdk ant git node python
```

### Ubuntu/Debian Setup
```bash
sudo apt install openjdk-11-jdk-headless ant git nodejs npm python3
```

## Installation Steps

### 1. Clone and Build YaCy
```bash
git clone --depth 1 https://github.com/yacy/yacy_search_server.git yacy
cd yacy
ant clean all
cd ..
```

### 2. Start YaCy
```bash
chmod +x setup.sh
./setup.sh
```

### 3. Set Up and Run the React UI (Enhanced Interface)
```bash
cd yacy-ui
npm install
npm start
```

### 4. Alternative: Run the Simple HTML Interface
```bash
python3 server.py
```

## Access Points

- **YaCy Admin Panel**: http://localhost:8090
- **React UI (Enhanced Interface)**: http://localhost:12000
- **Simple HTML Interface**: http://localhost:12000 (when using server.py)

## Features

- **Modern UI**: Clean, responsive design with light/dark mode
- **Enhanced Search Experience**: Real-time search suggestions and results
- **Customizable**: Easy to modify and extend
- **Mobile-Friendly**: Works well on all device sizes

## Development

### React UI Structure
- Built with React, TypeScript, and Material UI
- Uses Vite for fast development and building
- Includes theme switching functionality
- Responsive design for all device sizes

### Simple Interface
- Basic HTML/CSS/JS implementation
- Lightweight and fast
- Easy to customize

## Troubleshooting

- If YaCy fails to start, check Java version with `java -version`
- For React UI issues, check console logs and ensure all dependencies are installed
- If port 12000 is in use, modify the port in `server.py` or `package.json`

## License

This project is open source and available under the [MIT License](LICENSE).
