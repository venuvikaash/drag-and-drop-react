import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#F4F6F9",
        }}
      >
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#F4F6F9",
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
          overflow: "hidden",
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
  );
}

export default App;