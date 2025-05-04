import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Divider,
  IconButton,
  styled
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';


const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#1e4c76',
    height: '3px'
  },
});


const StyledTab = styled(Tab)({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '16px',
  color: '#545454',
  '&.Mui-selected': {
    color: '#1e4c76',
    fontWeight: 600,
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
});


const UserAvatar = ({ name, color }) => {

  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);


  const colorOptions = [
    '#1976d2',
    '#388e3c',
    '#d32f2f',
    '#f57c00',
    '#7b1fa2',
  ];


  const bgColor = color || colorOptions[name.length % colorOptions.length];

  return (
    <Avatar sx={{ bgcolor: bgColor }}>
      {initials}
    </Avatar>
  );
};

const TeamStatus = () => {
  const [tabValue, setTabValue] = useState(0);


  const allTeamMembers = {
    workingFromHome: [
      { id: 1, name: 'Malton Durai', status: 'Working From Home' },
      { id: 2, name: 'Ranjith', status: 'Working From Home' },
      { id: 3, name: 'Bala', status: 'Working From Home' },
      { id: 4, name: 'Raina', status: 'Working From Home' },
      { id: 7, name: 'Virat', status: 'Working From Home' },
    ],
    onLeave: [
      { id: 5, name: 'John Doe', status: 'On Leave' },
      { id: 6, name: 'Jane Smith', status: 'On Leave' },
    ]
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  const displayedMembers = tabValue === 0
    ? allTeamMembers.workingFromHome
    : allTeamMembers.onLeave;

  return (
    <div className='!h-[450px] overflow-hidden'>

      <Box sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        width: '100%',
        maxWidth: 'md',
        overflow: 'hidden'
      }}>
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <StyledTab label="Working From Home" />
          <StyledTab label="On Leave" />
        </StyledTabs>

        <Divider />

        <Box sx={{ mt: 1 }}>
          {displayedMembers.map(member => (
            <Box key={member.id}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1.5,
                  px: 2,
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
                }}
              >
                <Box sx={{ mr: 2 }}>
                  <UserAvatar name={member.name} />
                </Box>
                <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
                  {member.name}
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    color: '#4caf50',
                    border: '1px solid #e0e0e0',
                    borderRadius: '50%'
                  }}
                >
                  <ChatIcon fontSize="small" />
                </IconButton>
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', p: 1.5 }}>
          <Typography
            variant="button"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' }
            }}
          >
            View More
            <Box component="span" sx={{
              display: 'inline-flex',
              ml: 0.5,
              transition: 'transform 0.2s',
              transform: 'rotate(0deg)'
            }}>
              ▼
            </Box>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default TeamStatus;