import React, { createContext, useState, useContext } from 'react';
import { useMediaQuery } from '@mui/material';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const [open, setOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <SidebarContext.Provider value={{ open, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext); 