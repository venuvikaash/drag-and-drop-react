import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Header from './Header';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

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
      {/* Fixed Header */}
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

      {/* Main Content Area with Sidebar */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        {/* Sidebar with dynamic width */}
        <Sidebar
          toggleSidebar={handleSidebarToggle}
          isCollapsed={isSidebarCollapsed}
        />

        {/* Dashboard Content */}
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: isSidebarCollapsed ? "80px" : "256px", // Adjust based on Sidebar's collapsed/expanded width
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