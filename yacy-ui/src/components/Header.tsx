import React, { useState } from 'react';
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
  Tooltip
} from '@mui/material';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';

const Header: React.FC = () => {
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
  const [allowExternalSearch, setAllowExternalSearch] = useState<boolean>(false);

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

  return (
    <AppBar position="static" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
          }}
        >
          Public
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            component={Link} 
            to="/about" 
            color="inherit" 
            sx={{ mr: 1 }}
          >
            <span className="material-symbols-outlined" style={{ marginRight: '4px', fontSize: '1.2rem' }}>
              info
            </span>
            About
          </Button>
          
          <Tooltip title="YaCy Admin Panel">
            <Button
              color="inherit"
              href="http://localhost:8090/ConfigBasic.html"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mr: 1 }}
            >
              <AdminPanelSettingsIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} />
              Admin
            </Button>
          </Tooltip>
          
          <Tooltip title="Settings">
            <IconButton 
              color="inherit" 
              onClick={handleSettingsClick}
              sx={{ mr: 1 }}
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