import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  CircularProgress,
  Chip,
  Grid
} from '@mui/material';
import { EventNote } from '@mui/icons-material';

// Component for each circular progress leave card
const LeaveCard = ({ days, type, color = '#2D5E5E' }) => {
  return (
    <Box className="flex flex-col items-center p-2">
      <Box position="relative" display="inline-flex" className="mb-1">
        <CircularProgress
          variant="determinate"
          value={75} // This would be dynamic in a real app
          size={80}
          thickness={4}
          sx={{ color: color }}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography variant="h6" component="div" color="text.primary" fontWeight="bold">
            {days}
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            Days
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" className="text-center">
        {type}
      </Typography>
    </Box>
  );
};

// Main Leave Summary Component
const LeaveSummary = () => {
  return (
    <Paper className="p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <Box className="flex justify-between items-center mb-6">
        <Box className="flex items-center">
          <Box className="bg-teal-50 p-2 rounded-lg mr-3">
            <EventNote sx={{ color: '#2D5E5E' }} />
          </Box>
          <Typography variant="h6" fontWeight="medium">
            Leave Summary
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: '#2D5E5E',
            '&:hover': {
              backgroundColor: '#1D3E3E',
            }
          }}
        >
          Request Leave
        </Button>
      </Box>

      {/* First row of leave cards */}
      <Grid container spacing={2} className="mb-6">
        <Grid item xs={3}>
          <LeaveCard days={16} type="Earned Leave" />
        </Grid>
        <Grid item xs={3}>
          <LeaveCard days={4} type="Casual Leave" />
        </Grid>
        <Grid item xs={3}>
          <LeaveCard days={2} type="Sick Leave" />
        </Grid>
        <Grid item xs={3}>
          <LeaveCard days={2} type="Sick Leave" />
        </Grid>
      </Grid>

      {/* Second row of leave cards */}
      <Grid container spacing={2} className="mb-8">
        <Grid item xs={3}>
          <LeaveCard days={2} type="Sick Leave" />
        </Grid>
        <Grid item xs={3}>
          <LeaveCard days={16} type="Earned Leave" />
        </Grid>
        <Grid item xs={3}>
          <LeaveCard days={4} type="Casual Leave" />
        </Grid>
        <Grid item xs={3}>
          <LeaveCard days={2} type="Sick Leave" />
        </Grid>
      </Grid>

      {/* All Leaves section */}
      <Box>
        <Typography variant="h6" fontWeight="medium" className="mb-4">
          All Leaves
        </Typography>
        
        <Box className="flex items-center justify-between p-2 border-b">
          <Box className="flex items-center">
            <EventNote sx={{ color: '#555', marginRight: 2 }} />
            <Typography variant="body1">Aug 11 2024</Typography>
            <Chip 
              icon={<span className="text-xl mr-1">😷</span>}
              label="Sick" 
              variant="outlined" 
              size="small" 
              sx={{ 
                marginLeft: 2,
                bgcolor: '#f5f5f5',
                border: 'none'
              }} 
            />
          </Box>
          <Chip 
            label="Pending" 
            sx={{ 
              bgcolor: '#FFF3DB',
              color: '#E69D00',
              border: 'none'
            }} 
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default LeaveSummary;