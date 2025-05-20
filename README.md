# Public Search

A modern, user-friendly search interface for YaCy decentralized search engine with enhanced UI features, designed to provide a private and decentralized search experience.

![Public Search Interface](https://via.placeholder.com/800x450?text=Public+Search+Interface)

## Project Overview

Public Search provides a modern web interface for the YaCy decentralized search engine, focusing on privacy, user experience, and decentralization. The project consists of:

1. **YaCy Backend Integration**: Connects to the YaCy decentralized search engine that operates without central servers
2. **Simple HTML/JS Interface**: Basic search interface (index.html, script.js, styles.css) for lightweight usage
3. **Modern React UI**: Enhanced user interface with React, TypeScript, and Material UI with advanced features

### Current Status

This project is currently in development. The repository includes:

- A React-based UI framework with TypeScript and Material UI
- A simple HTML/JS interface for demonstration purposes
- Integration points for the YaCy search engine (requires separate installation)

The YaCy search engine is not included in this repository and needs to be installed separately following the instructions in the Installation Steps section.

### Why Public Search?

- **Privacy-Focused**: No tracking, no data collection, no profiling
- **Decentralized**: Operates on a peer-to-peer network without central control
- **Open Source**: Fully transparent and community-driven
- **Modern UX**: Clean, intuitive interface with contemporary design principles
- **Customizable**: Adapt the search experience to your preferences

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

### 1. Clone the Repository
```bash
git clone https://github.com/FraterCCCLXIII/Public-Search.git
cd Public-Search
```

### 2. Install YaCy
```bash
# Clone YaCy repository
git clone --depth 1 https://github.com/yacy/yacy_search_server.git yacy
cd yacy
ant clean all
cd ..
```

### 3. Start YaCy
```bash
chmod +x setup.sh
./setup.sh
```

### 4. Set Up and Run the React UI (Enhanced Interface)
```bash
# Install dependencies
npm install

# Note: The project uses Google Fonts for the Inter font family
# No need to install @fontsource/inter package

# Start the development server
npm start
```

### 5. Alternative: Run the Simple HTML Interface
```bash
python3 server.py
```

## Access Points

After completing the installation steps:

- **YaCy Admin Panel**: http://localhost:8090 (after installing and starting YaCy)
- **React UI (Enhanced Interface)**: http://localhost:12000 (when using `npm start`)
- **Simple HTML Interface**: http://localhost:12000 (when using `python3 server.py`)

Note: The React UI and Simple HTML Interface use the same port (12000) by default, so you should only run one at a time.

## Features

### Core Features
- **Modern UI**: Clean, responsive design with light/dark/sepia mode using Inter font
- **Enhanced Search Experience**: Web, image, and file search capabilities
- **Privacy Controls**: Toggle for external search and firewall settings
- **Customizable**: Easy to modify and extend with modular architecture
- **Mobile-Friendly**: Responsive design works well on all device sizes

### Search Features
- **Multiple Search Types**: Web, image, and file search with specialized interfaces
- **Advanced Filtering**: Filter by date, file type, domain, and language
- **Sorting Options**: Sort by relevance, date, or file size
- **Result Management**: Bookmark, blacklist, recommend, or remove search results
- **Result Count**: Display of total search results found

### User Interface
- **Theme Switching**: Light, dark, and sepia modes for comfortable viewing
- **Apple-like Design**: Contemporary, clean interface inspired by modern design principles
- **Vector Icons**: Material Symbols for consistent, scalable iconography
- **Responsive Layout**: Adapts to desktop, tablet, and mobile viewports
- **Accessibility**: Designed with accessibility considerations

### Integration
- **YaCy Admin Access**: Direct link to YaCy administration panel
- **About Page**: Comprehensive information about the project and its mission
- **Settings Panel**: User-configurable options for search behavior

## Development

### Project Structure
```
public-search/
├── index.html              # Simple HTML interface
├── script.js               # JavaScript for simple interface
├── styles.css              # CSS for simple interface
├── server.py               # Simple Python server
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx      # Navigation bar component
│   │   ├── SearchForm.tsx  # Search input component
│   │   ├── SearchResults.tsx # Results display component
│   │   └── ThemeToggle.tsx # Theme switching component
│   ├── pages/              # Page components
│   │   ├── AboutPage.tsx   # About page component
│   │   ├── HomePage.tsx    # Landing page component
│   │   └── SearchPage.tsx  # Search results page component
│   ├── theme/              # Theme configuration
│   │   └── ThemeContext.tsx # Theme management
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── yacy/                   # YaCy search engine directory (empty by default)
└── README.md               # Project documentation
```

### React UI Architecture
- **Framework**: React 18 with TypeScript for type safety
- **UI Library**: Material UI for consistent, accessible components
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: React hooks for local state, context for global state
- **Routing**: React Router for navigation between pages
- **API Integration**: Axios for HTTP requests to YaCy backend
- **Styling**: Material UI's styling system with theme customization
- **Typography**: Inter font family from Google Fonts for modern, readable text

### Component Structure
- **App.tsx**: Main application component with routing
- **Header.tsx**: Navigation bar with logo, links, and theme toggle
- **SearchForm.tsx**: Search input with type selection (web, image, file)
- **SearchResults.tsx**: Display and management of search results
- **ThemeContext.tsx**: Theme management with light, dark, and sepia modes
- **HomePage.tsx**: Landing page with search form and project information
- **AboutPage.tsx**: Information about the project, mission, and features

### Simple Interface
- Basic HTML/CSS/JS implementation for lightweight usage
- Minimal dependencies for fast loading
- Server-side rendering friendly
- Easy to customize and extend

The simple interface is served using a Python HTTP server (server.py) that:
- Runs on port 12000 by default
- Enables CORS headers for API access
- Serves static files from the project directory
- Can be accessed from any host (0.0.0.0)

## Troubleshooting

### Initial Setup Issues
- The YaCy directory is empty by default. You need to clone the YaCy repository as described in the installation steps.
- If you encounter permission issues with the scripts, make them executable with `chmod +x *.sh`

### YaCy Backend Issues
- If YaCy fails to start, check Java version with `java -version` (requires Java 11+)
- Ensure ports 8090, 8443, and 8080 are not in use by other applications
- After installing YaCy, check logs in the `yacy/DATA/LOG/` directory for specific error messages
- Verify that your firewall allows YaCy to connect to the network

### React UI Issues
- For React UI issues, check browser console logs (F12) for error messages
- Ensure all dependencies are installed with `npm install`
- Clear browser cache and reload if styles or scripts aren't updating
- If port 12000 is in use, modify the port in `package.json` and `server.py`

### Search Functionality
- If search results aren't appearing, ensure YaCy is running and properly indexed
- For "Failed to fetch" errors, check that YaCy is accessible at http://localhost:8090
- The sample search data in `script.js` is for demonstration purposes only and doesn't connect to YaCy
- For slow searches, consider increasing YaCy's memory allocation in `startYACY.sh` after installing YaCy

## Contributing

We welcome contributions to Public Search! Here's how you can help:

### Ways to Contribute
- **Code**: Implement new features or fix bugs
- **Design**: Improve UI/UX or create visual assets
- **Documentation**: Enhance README, add comments, or create guides
- **Testing**: Report bugs or test on different platforms
- **Ideas**: Suggest new features or improvements

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow existing code style and patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Write tests for new features when possible

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [YaCy](https://yacy.net/) for the decentralized search engine
- [React](https://reactjs.org/) and [Material UI](https://mui.com/) for the UI framework
- [Inter Font](https://fonts.google.com/specimen/Inter) from Google Fonts for the typography
- All contributors who have helped shape this project

---

Last updated: May 20, 2025
