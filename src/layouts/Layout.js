import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import SideNav from './SideNav';
import Footer from './Footer';
import MainSection from './MainSection';
import { PageTitleProvider } from '../context/PageTitleContext';
import { SidebarProvider } from '../context/SidebarContext';

const Layout = ({ children }) => {
  return (
    <PageTitleProvider>
      <SidebarProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <SideNav />
          <MainSection>{children}</MainSection>
          <Footer />
        </Box>
      </SidebarProvider>
    </PageTitleProvider>
  );
};

export default Layout; 