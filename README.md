# Public Search Setup

## Requirements
- Java 11+
- Ant (for building YaCy)
- Git

### macOS Setup
```bash
brew install openjdk ant git
```

### Ubuntu/Debian Setup
```bash
sudo apt install openjdk-11-jdk-headless ant git
```

## Installation Steps

```bash
git clone --depth 1 https://github.com/yacy/yacy_search_server.git yacy
cd yacy
ant clean all
cd ..
chmod +x setup.sh
./setup.sh
```

## Access
- YaCy Admin Panel: http://localhost:8090
