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

### External SearXNG Instances

As an interim solution, you can connect to an external SearXNG instance instead of running one locally:

1. Select "SearXNG" or "Both" from the provider dropdown
2. Click the settings icon next to the dropdown
3. Toggle "Use External SearXNG Instance"
4. Enter the URL of a public SearXNG instance (e.g., https://searx.be)
5. Click "Save"

**Note**: When using external instances:
- Some instances may block API requests or have rate limits
- Privacy may be reduced compared to a local instance
- Results may vary between different instances

Popular public SearXNG instances include:
- https://searx.be
- https://search.disroot.org
- https://searx.tiekoetter.com

For a more complete list, visit: https://searx.space/

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
- Improve error handling for external SearXNG instances
- Add ability to manage a list of favorite external instances
- Implement automatic fallback to external instance if local instance is unavailable