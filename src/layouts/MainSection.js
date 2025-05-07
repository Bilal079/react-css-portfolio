import React from 'react';
import { Box, Container, useMediaQuery, Toolbar } from '@mui/material';
import { useSidebar } from '../context/SidebarContext';

const drawerWidth = 240;

const MainSection = ({ children }) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const { open } = useSidebar();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        width: { md: `calc(100% - ${open ? drawerWidth : 0}px)` },
        marginLeft: !isMobile && open ? `${drawerWidth}px` : 0,
        paddingBottom: '80px',
        minHeight: '100vh',
        transition: theme => theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: open 
            ? theme.transitions.duration.enteringScreen 
            : theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar /> {}
      <Container maxWidth="lg" sx={{ pt: 2, pb: 2 }}>
        {children}
      </Container>
    </Box>
  );
};

export default MainSection; 