import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useSidebar } from '../context/SidebarContext';

const drawerWidth = 240;

const Footer = () => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const { open } = useSidebar();

  return (
    <Box 
      component="footer"
      sx={{
        bgcolor: '#000000',
        color: '#ffffff',
        py: 2,
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
        marginLeft: !isMobile && open ? `${drawerWidth}px` : 0,
        transition: theme => theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Bilal Haroon Portfolio
      </Typography>
    </Box>
  );
};

export default Footer; 