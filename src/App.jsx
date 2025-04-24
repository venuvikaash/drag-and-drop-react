import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import '@fontsource/manrope/300.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/700.css';

// Create a theme instance with Manrope as the default font
const theme = createTheme({
  typography: {
    fontFamily: 'Manrope, Arial, sans-serif',
    h1: { fontFamily: 'Manrope, Arial, sans-serif' },
    h2: { fontFamily: 'Manrope, Arial, sans-serif' },
    h3: { fontFamily: 'Manrope, Arial, sans-serif' },
    h4: { fontFamily: 'Manrope, Arial, sans-serif' },
    h5: { fontFamily: 'Manrope, Arial, sans-serif' },
    h6: { fontFamily: 'Manrope, Arial, sans-serif' },
    subtitle1: { fontFamily: 'Manrope, Arial, sans-serif' },
    subtitle2: { fontFamily: 'Manrope, Arial, sans-serif' },
    body1: { fontFamily: 'Manrope, Arial, sans-serif' },
    body2: { fontFamily: 'Manrope, Arial, sans-serif' },
    button: { fontFamily: 'Manrope, Arial, sans-serif' },
    caption: { fontFamily: 'Manrope, Arial, sans-serif' },
    overline: { fontFamily: 'Manrope, Arial, sans-serif' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'Manrope, Arial, sans-serif',
        },
      },
    },
  },
});

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100vw",
            backgroundColor: "#F4F6F9",
          }}
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#D3D3D3", 
        }}
      >
        <Box
          sx={{
            height: "125px",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <Header isCollapsed={isSidebarCollapsed} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
          }}
        >
          <Sidebar
            toggleSidebar={handleSidebarToggle}
            isCollapsed={isSidebarCollapsed}
          />
          <Box
            sx={{
              flexGrow: 1,
              marginLeft: isSidebarCollapsed ? "80px" : "256px",
              padding: "20px",
              transition: "margin-left 0.3s ease",
            }}
          >
            <Dashboard isSidebarCollapsed={isSidebarCollapsed} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;