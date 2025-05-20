import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  Menu, 
  MenuItem, 
  IconButton, 
  Divider,
  Switch,
  FormControlLabel,
  Tooltip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  useTheme as useMuiTheme
} from '@mui/material';
import ThemeToggle from './ThemeToggle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '../theme/ThemeContext';

interface HeaderProps {
  showSearchInHeader?: boolean;
  initialSearchQuery?: string;
  initialSearchType?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  showSearchInHeader = false, 
  initialSearchQuery = '', 
  initialSearchType = 'web' 
}) => {
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
  const [allowExternalSearch, setAllowExternalSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchType, setSearchType] = useState(initialSearchType);
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { themeType } = useTheme();
  const muiTheme = useMuiTheme();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  
  // Handle scroll events to show/hide logo on home page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleExternalSearchToggle = () => {
    setAllowExternalSearch(!allowExternalSearch);
    // In a real implementation, this would save the setting to localStorage or a backend API
    localStorage.setItem('allowExternalSearch', (!allowExternalSearch).toString());
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&type=${searchType}`);
    }
  };
  
  const handleSearchTypeChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSearchType(newValue);
    // If we have a query, immediately search with the new type
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&type=${newValue}`);
    }
  };

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        borderBottom: '1px solid', 
        borderColor: 'divider',
        color: muiTheme.palette.text.primary
      }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        {/* Only show logo on home page when scrolled, or always on other pages */}
        {(!isHomePage || scrolled) && (
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              letterSpacing: '-0.5px',
              mr: 2,
            }}
          >
            Public
          </Typography>
        )}
        
        {/* Search bar in header for search results page */}
        {showSearchInHeader && (
          <Box 
            component="form" 
            onSubmit={handleSearchSubmit}
            sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column',
              width: '100%',
              maxWidth: 600
            }}
          >
            <TextField
              fullWidth
              placeholder="Search the web..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1 }}
            />
            <Tabs 
              value={searchType} 
              onChange={handleSearchTypeChange}
              sx={{ 
                minHeight: 36,
                '& .MuiTab-root': {
                  minHeight: 36,
                  py: 0
                }
              }}
            >
              <Tab label="Web" value="web" />
              <Tab label="Images" value="image" />
              <Tab label="Files" value="file" />
            </Tabs>
          </Box>
        )}
        
        {/* Spacer when search is not shown */}
        {!showSearchInHeader && <Box sx={{ flexGrow: 1 }} />}
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            component={Link} 
            to="/about" 
            sx={{ 
              mr: 1,
              color: muiTheme.palette.text.primary
            }}
          >
            <span className="material-symbols-outlined" style={{ marginRight: '4px', fontSize: '1.2rem' }}>
              info
            </span>
            About
          </Button>
          
          <Tooltip title="YaCy Admin Panel">
            <Button
              href="http://localhost:8090/ConfigBasic.html"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                mr: 1,
                color: muiTheme.palette.text.primary
              }}
            >
              <AdminPanelSettingsIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} />
              Admin
            </Button>
          </Tooltip>
          
          <Tooltip title="Settings">
            <IconButton 
              onClick={handleSettingsClick}
              sx={{ 
                mr: 1,
                color: muiTheme.palette.text.primary
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          
          <ThemeToggle />
        </Box>
      </Toolbar>
      
      {/* Settings Menu */}
      <Menu
        anchorEl={settingsAnchorEl}
        open={Boolean(settingsAnchorEl)}
        onClose={handleSettingsClose}
        PaperProps={{
          elevation: 3,
          sx: { 
            minWidth: 250,
            borderRadius: 2,
            mt: 1
          }
        }}
      >
        <MenuItem sx={{ justifyContent: 'center' }}>
          <Typography variant="subtitle1" fontWeight={600}>Search Settings</Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <FormControlLabel
            control={
              <Switch 
                checked={allowExternalSearch} 
                onChange={handleExternalSearchToggle}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SecurityIcon sx={{ mr: 1, fontSize: '1.2rem', color: allowExternalSearch ? 'success.main' : 'error.main' }} />
                <Typography variant="body2">Allow External Search</Typography>
              </Box>
            }
            sx={{ width: '100%' }}
          />
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;