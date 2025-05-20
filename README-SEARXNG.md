# SearXNG Integration

This document explains how to set up and use SearXNG as an additional search provider in the Public-Search project.

## Overview

SearXNG is a privacy-respecting, self-hosted metasearch engine that aggregates results from various search engines. This integration allows you to:

1. Use SearXNG as an alternative to YaCy
2. Combine results from both SearXNG and YaCy
3. Switch between search providers in the UI

## Setup Instructions

### Prerequisites

- Docker and Docker Compose installed
- Git repository cloned

### Installation

1. Run the setup script to start SearXNG:

```bash
chmod +x setup-searxng.sh
./setup-searxng.sh
```

This will:
- Create a Docker container for SearXNG
- Configure it to run on port 8888
- Set up the necessary data directories

2. Verify SearXNG is running by visiting:
```
http://localhost:8888
```

### Configuration

SearXNG configuration files are stored in the `searxng-data` directory. You can customize:

- Enabled search engines
- Default settings
- UI appearance

For detailed configuration options, refer to the [SearXNG documentation](https://docs.searxng.org/).

## Usage

Once set up, you can use the search interface with the following options:

1. **YaCy Only**: Uses only YaCy search results (default)
2. **SearXNG Only**: Uses only SearXNG search results
3. **Both**: Combines and deduplicates results from both providers

To switch between providers, use the dropdown menu in the search results page.

## Technical Details

### Integration Architecture

The integration follows these principles:

1. **Loose Coupling**: Each search provider is implemented as a separate service
2. **Unified Interface**: Results from both providers are normalized to a common format
3. **Provider Selection**: Users can choose which provider(s) to use at runtime

### API Endpoints

- YaCy: `http://localhost:8090/yacysearch.json`
- SearXNG: `http://localhost:8888/search`

### Result Handling

When both providers are selected:
1. Results are fetched from both providers in parallel
2. Duplicate results (based on URL) are removed
3. Results are combined and sorted according to the selected criteria

## Troubleshooting

### SearXNG Not Starting

If SearXNG fails to start:

1. Check Docker logs:
```bash
docker-compose logs searxng
```

2. Verify port 8888 is not in use:
```bash
netstat -tuln | grep 8888
```

### No Results from SearXNG

If you're not getting results from SearXNG:

1. Verify SearXNG is running by visiting `http://localhost:8888`
2. Check the browser console for API errors
3. Try a direct search on the SearXNG instance to verify it's working correctly

## Future Improvements

- Add ability to configure which SearXNG engines to use
- Implement result scoring to better merge results from both providers
- Add provider-specific filtering options