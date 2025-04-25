import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Avatar, 
  AvatarGroup,
  Chip
} from '@mui/material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, getDate } from 'date-fns';

// Mock data - this would be replaced with API data in the future
const mockData = {
  events: [
    { id: 1, date: '2025-03-06', title: 'Upcoming due date', type: 'event', color: '#ff9a9a' },
    { id: 2, date: '2025-03-13', title: 'Quarterly team lunch', type: 'event', color: '#d1bcff' },
    { id: 3, date: '2025-03-17', title: 'Weekly team meet', type: 'event', color: '#a5e8ff' },
    { id: 4, date: '2025-03-25', title: 'Marketing campaign workshop', type: 'event', color: '#bcffda' },
    { id: 5, date: '2025-03-28', title: 'Team game night', type: 'event', color: '#bcffda' }
  ],
  meetings: [
    { id: 1, date: '2025-03-07', title: 'Stand-up meeting', type: 'meeting', color: '#ffb3b3' },
    { id: 2, date: '2025-03-18', title: 'CEO appointment', type: 'meeting', color: '#ffb3b3' },
    { id: 3, date: '2025-03-22', title: 'Sprint team meeting', type: 'meeting', color: '#ffb3b3' }
  ],
  leaves: [
    { id: 1, date: '2025-03-03', employeeId: 1, employeeName: 'Sarah', employeeAvatar: '/api/placeholder/50/50', type: 'leave' },
    { id: 2, date: '2025-03-10', employeeId: 1, employeeName: 'Sarah', employeeAvatar: '/api/placeholder/50/50', type: 'leave' },
    { id: 3, date: '2025-03-14', employeeId: 2, employeeName: 'Alex', employeeAvatar: '/api/placeholder/50/50', type: 'leave' },
    { id: 4, date: '2025-03-29', employeeId: 3, employeeName: 'Jamie', employeeAvatar: '/api/placeholder/50/50', type: 'leave' }
  ],
  notes: [
    { id: 1, date: '2025-03-13', title: "Don't forget the lunch!", type: 'note' },
    { id: 2, date: '2025-03-15', title: "Talk to Jane for next week", type: 'note' },
    { id: 3, date: '2025-03-20', title: "Order cake and food", type: 'note' },
    { id: 4, date: '2025-03-27', title: "Pick up extra team work", type: 'note' },
    { id: 5, date: '2025-03-31', title: "Submit completed work", type: 'note' }
  ]
};

export default function EmployeeCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)); // March 2025
  const [calendarData, setCalendarData] = useState({
    events: [],
    meetings: [],
    leaves: [],
    notes: []
  });
  
  useEffect(() => {
    // In the future, this would be an API call
    setCalendarData(mockData);
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get days from previous and next month to fill the calendar grid
  const startDay = monthStart.getDay();
  const endDay = 6 - monthEnd.getDay();
  
  const prevMonthDays = startDay > 0 ? Array.from({ length: startDay }, (_, i) => {
    const day = new Date(monthStart);
    day.setDate(day.getDate() - (startDay - i));
    return day;
  }) : [];
  
  const nextMonthDays = endDay > 0 ? Array.from({ length: endDay }, (_, i) => {
    const day = new Date(monthEnd);
    day.setDate(day.getDate() + (i + 1));
    return day;
  }) : [];
  
  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];
  
  const getItemsForDate = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    return {
      events: calendarData.events.filter(event => event.date === formattedDate),
      meetings: calendarData.meetings.filter(meeting => meeting.date === formattedDate),
      leaves: calendarData.leaves.filter(leave => leave.date === formattedDate),
      notes: calendarData.notes.filter(note => note.date === formattedDate)
    };
  };
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Box sx={{ width: '500px', height: '475px', overflow: 'hidden' }} className="mx-auto p-2 bg-white">
      <Box className="flex justify-between items-center mb-2">
        <Typography variant="h6" className="font-bold">
          March 2025
        </Typography>
        <Box className="flex space-x-1">
          <Chip 
            label="My Leave" 
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.65rem', height: '20px' }}
            icon={<span className="h-2 w-2 rounded-full bg-green-400"></span>}
          />
          <Chip 
            label="Team Leaves" 
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.65rem', height: '20px' }}
            icon={<span className="h-2 w-2 rounded-full bg-blue-400"></span>}
          />
          <Chip 
            label="Events" 
            size="small"
            variant="outlined" 
            sx={{ fontSize: '0.65rem', height: '20px' }}
            icon={<span className="h-2 w-2 rounded-full bg-purple-400"></span>}
          />
        </Box>
      </Box>

      <Grid container spacing={1} className="mb-1">
        {weekDays.map((day, index) => (
          <Grid item key={index} xs>
            <Typography className="text-gray-500 text-xs text-center">
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={1}>
        {allDays.map((day, index) => {
          const dayItems = getItemsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);
          
          return (
            <Grid item xs key={index}>
              <Paper 
                className={`h-16 p-1 ${isCurrentMonth ? 'bg-white' : 'bg-gray-100'} ${isCurrentDay ? 'border border-blue-500' : ''}`}
                elevation={0}
                variant="outlined"
                sx={{ overflow: 'hidden' }}
              >
                <Typography 
                  className={`text-right text-xs ${isCurrentMonth ? 'text-black' : 'text-gray-400'}`}
                >
                  {getDate(day)}
                </Typography>
                
                <Box sx={{ overflow: 'hidden', maxHeight: '48px' }}>
                  {dayItems.leaves.length > 0 && (
                    <Box className="mb-1">
                      <AvatarGroup max={2} sx={{ '& .MuiAvatar-root': { width: 16, height: 16 } }}>
                        {dayItems.leaves.map(leave => (
                          <Avatar 
                            key={leave.id} 
                            src={leave.employeeAvatar}
                            alt={leave.employeeName}
                          />
                        ))}
                      </AvatarGroup>
                    </Box>
                  )}
                  
                  {dayItems.events.map(event => (
                    <Box 
                      key={event.id}
                      sx={{ 
                        backgroundColor: event.color,
                        fontSize: '0.6rem',
                        padding: '1px 2px',
                        borderRadius: '2px',
                        marginBottom: '1px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {event.title}
                    </Box>
                  ))}
                  
                  {dayItems.meetings.map(meeting => (
                    <Box 
                      key={meeting.id}
                      sx={{ 
                        backgroundColor: meeting.color,
                        fontSize: '0.6rem',
                        padding: '1px 2px',
                        borderRadius: '2px',
                        marginBottom: '1px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {meeting.title}
                    </Box>
                  ))}
                  
                  {dayItems.notes.map(note => (
                    <Box 
                      key={note.id}
                      sx={{ 
                        fontSize: '0.6rem',
                        fontStyle: 'italic',
                        color: 'gray',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {note.title}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}