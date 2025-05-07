import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Avatar, 
  IconButton, 
  Menu, 
  MenuItem, 
  Box,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { usePageTitle } from '../context/PageTitleContext';
import { useSidebar } from '../context/SidebarContext';
import { useTheme } from '../context/ThemeContext';

const drawerWidth = 240;

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#000000',
    color: '#ffffff'
  },
  avatar: {
    cursor: 'pointer',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.1)',
    }
  }
};

const Header = () => {
  const { pageTitle } = usePageTitle();
  const { open, toggleSidebar } = useSidebar();
  const { mode, toggleMode } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        width: { md: `calc(100% - ${open ? drawerWidth : 0}px)` },
        ml: !isMobile && open ? `${drawerWidth}px` : 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: '#000000',
        transition: theme => theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: open 
            ? theme.transitions.duration.enteringScreen 
            : theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar sx={styles.header}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            onClick={toggleSidebar}
            edge="start"
            sx={{ mr: 2, color: '#ffffff' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="white">{pageTitle}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton 
              color="inherit" 
              onClick={toggleMode} 
              sx={{ ml: 1, color: '#ffffff' }}
            >
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={menuOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            sx={{ ml: 1 }}
          >
            <Avatar sx={styles.avatar}>BH</Avatar>
          </IconButton>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 