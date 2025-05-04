import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Button,
  IconButton
} from '@mui/material';
import {
  Bolt,
  Download,
  ChevronRight,
  KeyboardArrowDown,
  Description
} from '@mui/icons-material';

const RecentUpdatesList = () => {
  // Sample data for the list items
  const policyItems = [
    { id: 1, title: 'Employee Policy 2024' },
    { id: 2, title: 'Employee Policy 2024' },
    { id: 3, title: 'Employee Policy 2024' },
    { id: 4, title: 'Employee Policy 2024' },
    { id: 5, title: 'Employee Policy 2024' },
    { id: 6, title: 'Employee Policy 2024' },
  ];

  return (
    <div className='!h-[450px] overflow-hidden'>
      <Paper

        elevation={0}
        sx={{
          border: '1px #d0c0f7',
          borderRadius: '8px',
          height:'500px !important',
          overflow:'hidden'
        }}
      >
        {/* Header Section */}
        <Box
          className="flex items-center p-4"
          sx={{ borderBottom: '1px dashed #d0c0f7' }}
        >
          <Bolt sx={{ color: '#6366f1', marginRight: 1.5 }} />
          <Typography variant="h6" fontWeight="medium">
            Recent Updates
          </Typography>
        </Box>

        {/* List of Policy Items */}
        <List disablePadding>
          {policyItems.map((item, index) => (
            <ListItem
              key={item.id}
              sx={{
                borderBottom: index < policyItems.length - 1 ? '1px solid #f0f0f0' : 'none',
                padding: 0,
              }}
            >
              <Box className="flex items-center justify-between w-full py-3 px-4">
                <Box className="flex items-center">
                  <Description sx={{
                    color: '#6366f1',
                    backgroundColor: '#f0f0ff',
                    padding: '4px',
                    borderRadius: '4px',
                    marginRight: 1.5,
                    fontSize: 20
                  }} />
                  <Typography variant="body2">
                    {item.title}
                  </Typography>
                </Box>
                <Box className="flex">
                  <IconButton size="small" sx={{ color: '#6366f1' }}>
                    <Download fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: '#6366f1' }}>
                    <ChevronRight fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>

        {/* View More Button */}
        <Box
          className="flex justify-center py-2"
          sx={{ borderTop: '1px solid #f0f0f0' }}
        >
          <Button
            endIcon={<KeyboardArrowDown />}
            size="small"
            sx={{
              textTransform: 'none',
              color: '#333',
              fontWeight: 500,
              fontSize: '0.875rem'
            }}
          >
            View More
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default RecentUpdatesList;