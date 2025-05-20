import React from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Brightness4, Brightness7, ColorLens } from '@mui/icons-material';
import { useTheme } from '../theme/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { themeType, setThemeType } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'sepia') => {
    setThemeType(theme);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Change theme">
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label="theme"
          aria-controls={open ? 'theme-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          {themeType === 'light' && <Brightness7 />}
          {themeType === 'dark' && <Brightness4 />}
          {themeType === 'sepia' && <ColorLens />}
        </IconButton>
      </Tooltip>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'theme-button',
        }}
      >
        <MenuItem onClick={() => handleThemeChange('light')}>Light</MenuItem>
        <MenuItem onClick={() => handleThemeChange('dark')}>Dark</MenuItem>
        <MenuItem onClick={() => handleThemeChange('sepia')}>Sepia</MenuItem>
      </Menu>
    </>
  );
};

export default ThemeToggle;