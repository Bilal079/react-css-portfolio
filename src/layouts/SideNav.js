import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useMediaQuery,
  Toolbar,
  Typography,
  Divider
} from '@mui/material';
import {
  Home as HomeIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  ContactMail as ContactIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { usePageTitle } from '../context/PageTitleContext';
import { useSidebar } from '../context/SidebarContext';

const drawerWidth = 240;

const sidebarGray = '#424242';
const lighterGray = '#616161';

const navItems = [
  { path: '/', title: 'Home', icon: <HomeIcon /> },
  { path: '/education', title: 'Education', icon: <SchoolIcon /> },
  { path: '/projects', title: 'Projects', icon: <WorkIcon /> },
  { path: '/contact', title: 'Contact', icon: <ContactIcon /> }
];

const SideNav = () => {
  const { setPageTitle } = usePageTitle();
  const { open, toggleSidebar } = useSidebar();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleNavClick = (title) => {
    setPageTitle(title);
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={open}
      onClose={toggleSidebar}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth,
          boxSizing: 'border-box',
          whiteSpace: 'nowrap',
          overflowX: 'hidden',
          bgcolor: sidebarGray,
          color: '#ffffff',
          transition: theme => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          ...(!open && {
            width: 0,
            overflowX: 'hidden',
            transition: theme => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }),
        },
      }}
    >
      <Toolbar 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          px: [1]
        }}
      >
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            color: '#ffffff'
          }}
        >
          Portfolio
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
      <Box 
        sx={{ 
          overflow: 'auto'
        }}
        role="presentation"
      >
        <List>
          {navItems.map((item) => (
            <ListItem 
              key={item.title}
              disablePadding
              component={Link}
              to={item.path}
              onClick={() => handleNavClick(item.title)}
              sx={{
                bgcolor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'inherit',
                color: '#ffffff',
                textDecoration: 'none',
                '& .MuiListItemIcon-root': {
                  color: '#ffffff'
                },
                '&:hover': {
                  bgcolor: lighterGray
                }
              }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: '#ffffff' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideNav; 