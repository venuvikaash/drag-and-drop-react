import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip, 
  Avatar, 
  Divider, 
  Button, 
  AvatarGroup
} from '@mui/material';
import { Bolt, CalendarToday, ChevronRight } from '@mui/icons-material';

const RecentUpdates = () => {
  return (
    <Paper className="p-6 rounded-lg shadow-sm max-w-3xl">
      {/* Header Section */}
      <Box className="flex justify-between items-center mb-6">
        <Box className="flex items-center">
          <Box className="bg-blue-50 p-2 rounded-lg mr-3">
            <Bolt className="text-blue-500" />
          </Box>
          <Typography variant="h6" fontWeight="medium">
            Recent Updates
          </Typography>
        </Box>
        <Button 
          color="primary"
          className="text-blue-500"
          size="small"
          sx={{ textTransform: 'none' }}
        >
          View Details
        </Button>
      </Box>

      {/* Project Info Section */}
      <Box className="mb-4">
        <Typography variant="body2" color="text.secondary" className="mb-1">
          Project name
        </Typography>
        <Typography variant="body1" fontWeight="medium" className="mb-3">
          Meta API Integration & Development
        </Typography>
        
        <Box className="flex justify-between items-center mb-4">
          <Chip 
            label="In Progress" 
            size="small"
            sx={{ 
              bgcolor: '#FFF3DB',
              color: '#FF9800',
              fontWeight: 500,
              ml: 'auto'
            }} 
          />
        </Box>
        
        <Box className="grid grid-cols-2 gap-4">
          <Box>
            <Typography variant="body2" color="text.secondary" className="mb-2">
              Project Manager
            </Typography>
            <Box className="flex items-center">
              <Avatar 
                src="/api/placeholder/40/40" 
                alt="Project Manager" 
                sx={{ width: 32, height: 32, mr: 1 }}
              />
              <Typography variant="body2">
                Malton
              </Typography>
            </Box>
          </Box>
          
          <Box>
            <Typography variant="body2" color="text.secondary" className="mb-2">
              Team
            </Typography>
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
              <Avatar src="/api/placeholder/40/40" alt="Team Member 1" />
              <Avatar src="/api/placeholder/40/40" alt="Team Member 2" />
              <Avatar src="/api/placeholder/40/40" alt="Team Member 3" />
            </AvatarGroup>
          </Box>
        </Box>
        
        <Box className="mt-4">
          <Typography variant="body2" color="text.secondary" className="mb-2">
            Timeline
          </Typography>
          <Box className="flex items-center">
            <CalendarToday sx={{ fontSize: 18, marginRight: 1, color: 'text.secondary' }} />
            <Typography variant="body2">
              12th Dec 2024 - 20 Jan 2025
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <Divider className="my-4" />
      
      {/* Description Section */}
      <Box className="mb-6">
        <Typography variant="body2" color="text.secondary" className="mb-2">
          Description
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-4">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </Typography>
      </Box>
      
      {/* See All Projects Button */}
      <Button 
        endIcon={<ChevronRight />} 
        sx={{ 
          textTransform: 'none',
          fontWeight: 500,
          color: 'text.primary',
          p: 0
        }}
      >
        See All Projects
      </Button>
    </Paper>
  );
};

export default RecentUpdates;