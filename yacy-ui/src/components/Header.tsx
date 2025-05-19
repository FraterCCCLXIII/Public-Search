import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
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
          }}
        >
          Public
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            component={Link} 
            to="/about" 
            color="inherit" 
            sx={{ mr: 2 }}
          >
            <span className="material-symbols-outlined" style={{ marginRight: '4px', fontSize: '1.2rem' }}>
              info
            </span>
            About
          </Button>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;