import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [focusedDateIndex, setFocusedDateIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('meetings'); // Default tab is meetings
  
  // Sample data for meetings, tasks, and events
  const meetings = [
    { id: 1, title: 'Meeting with Clients', time: '9:30 - 10:30 AM', date: new Date(), location: '349 Irvine, CA', participants: ['/api/placeholder/30/30', '/api/placeholder/30/30'] },
    { id: 2, title: 'Book Discussion', time: '12:00 - 12:50 AM', date: new Date(), location: '349 Irvine, CA', participants: ['/api/placeholder/30/30', '/api/placeholder/30/30'] },
    { id: 3, title: 'Brief for reference, color, style', time: '3:20 - 4:30 PM', date: new Date(), location: '349 Irvine, CA', participants: ['/api/placeholder/30/30', '/api/placeholder/30/30'] },
    { id: 4, title: 'Brief for reference, color, style', time: '9:30 - 10:30 AM', date: new Date(), location: '349 Irvine, CA', participants: ['/api/placeholder/30/30', '/api/placeholder/30/30'] },
    { id: 5, title: 'Brief for reference, color, style', time: '9:30 - 10:30 AM', date: addDays(new Date(), 1), location: '349 Irvine, CA', participants: ['/api/placeholder/30/30', '/api/placeholder/30/30'] },
  ];

  const tasks = [
    { id: 1, title: 'Complete UI Design', time: '9:30 - 10:30 AM', date: new Date(), location: '349 Irvine, CA', status: 'In Progress', participants: ['/api/placeholder/30/30', '/api/placeholder/30/30'] },
    { id: 2, title: 'Fix navigation bug', time: '12:00 - 12:50 AM', date: new Date(), location: '349 Irvine, CA', status: 'To Do', participants: ['/api/placeholder/30/30', '/api/placeholder/30/30'] },
    { id: 3, title: 'Prepare presentation', time: '3:20 - 4:30 PM', date: addDays(new Date(), 1), location: '349 Irvine, CA', status: 'To Do', participants: ['/api/placeholder/30/30', '/api/placeholder/30/30'] },
  ];

  const events = [
    { id: 1, title: 'Company Anniversary', time: '9:30 - 10:30 AM', date: new Date(), location: '349 Irvine, CA', participants: ['/api/placeholder/30/30', '/api/placeholder/30/30'] },
    { id: 2, title: 'Team Building', time: '12:00 - 12:50 AM', date: addDays(new Date(), 3), location: '349 Irvine, CA', participants: ['/api/placeholder/30/30', '/api/placeholder/30/30'] },
    { id: 3, title: 'Product Launch', time: '3:20 - 4:30 PM', date: addDays(new Date(), 5), location: '349 Irvine, CA', participants: ['/api/placeholder/30/30', '/api/placeholder/30/30'] },
  ];

  // Initialize week dates
  useEffect(() => {
    generateWeekDates(currentDate);
  }, [currentDate]);

  const generateWeekDates = (date) => {
    const startDate = startOfWeek(date, { weekStartsOn: 1 }); // Start week on Monday
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      days.push(addDays(startDate, i));
    }
    
    setWeekDates(days);
  };

  const navigateWeek = (direction) => {
    const newDate = addDays(currentDate, direction * 7);
    setCurrentDate(newDate);
  };

  const handleKeyDown = (e, index) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        setFocusedDateIndex((prev) => Math.min(prev + 1, 6));
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setFocusedDateIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        navigateWeek(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        navigateWeek(1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        setCurrentDate(weekDates[index]);
        break;
      default:
        break;
    }
  };

  // Focus the button when the focused index changes
  useEffect(() => {
    const element = document.getElementById(`date-button-${focusedDateIndex}`);
    if (element) {
      element.focus();
    }
  }, [focusedDateIndex]);

  // Filter items based on current date
  const filteredMeetings = meetings.filter(meeting => isSameDay(meeting.date, currentDate));
  const filteredTasks = tasks.filter(task => isSameDay(task.date, currentDate));
  const filteredEvents = events.filter(event => isSameDay(event.date, currentDate));

  // Get content for the active tab
  const getActiveTabContent = () => {
    let items = [];
    switch (activeTab) {
      case 'meetings':
        items = filteredMeetings;
        break;
      case 'tasks':
        items = filteredTasks;
        break;
      case 'events':
        items = filteredEvents;
        break;
      default:
        items = [];
    }

    return (
      <div className="space-y-3" aria-labelledby={`${activeTab}-heading`}>
        <h4 id={`${activeTab}-heading`} className="sr-only">{activeTab} for {format(currentDate, 'EEEE, MMMM d, yyyy')}</h4>
        {items.length > 0 ? (
          items.map(item => {
            // Determine background color based on the tab type
            let bgColor = '';
            if (activeTab === 'meetings') {
              bgColor = 'bg-purple-100';
            } else if (activeTab === 'tasks') {
              bgColor = 'bg-green-100';
            } else {
              bgColor = 'bg-blue-100';
            }
            
            return (
              <div 
                key={item.id} 
                className={`rounded-lg p-3 ${bgColor} mb-2`}
                tabIndex="0"
                aria-label={`${item.title} at ${item.time}`}
              >
                <div className="flex justify-between mb-1">
                  <div className="font-medium text-black">{item.title}</div>
                  <div className="flex">
                    {item.participants.map((participant, idx) => (
                      <img 
                        key={idx}
                        src={participant}
                        alt={`Participant ${idx + 1}`} 
                        className="w-6 h-6 rounded-full -ml-1 border border-white"
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">+{item.participants.length}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600">{item.location} | {item.time}</div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4 text-gray-500">No {activeTab} for this date</div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium" id="schedule-heading">Schedule</h3>
        <button 
          className="text-green-500 text-sm"
          aria-label="View all schedules"
        >
          View All
        </button>
      </div>

      <div className="mb-6" role="region" aria-labelledby="calendar-heading">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-500">
            {format(weekDates[0] || new Date(), 'dd MMM yyyy')} - {format(weekDates[6] || new Date(), 'dd MMM yyyy')}
          </div>
          <div className="flex space-x-2">
            <button 
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => navigateWeek(-1)}
              aria-label="Previous week"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button 
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => navigateWeek(1)}
              aria-label="Next week"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center" role="grid" aria-label="Calendar days">
          <div className="grid grid-cols-7 gap-1 w-full" role="row">
            {weekDates.map((date, index) => {
              const dayName = format(date, 'EEEEE'); // Single letter day name
              const dayNumber = format(date, 'd'); // Day of month
              const isToday = isSameDay(date, new Date());
              const isSelected = isSameDay(date, currentDate);
              
              return (
                <div key={index} className="flex flex-col items-center" role="gridcell">
                  <div className={`text-xs mb-1 ${isSelected || isToday ? 'text-green-500' : 'text-gray-500'}`}>
                    {dayName}
                  </div>
                  <button
                    id={`date-button-${index}`}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                      isSelected ? 'bg-green-500 text-white' : 
                      isToday ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setCurrentDate(date)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    tabIndex={index === focusedDateIndex ? 0 : -1}
                    aria-label={`${format(date, 'EEEE, MMMM d, yyyy')}`}
                    aria-selected={isSelected}
                  >
                    {dayNumber}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex mb-4">
        <ButtonGroup variant="contained" fullWidth>
          <Button 
            sx={{ 
              backgroundColor: activeTab === 'meetings' ? '#22c55e' : '#f3f4f6',
              color: activeTab === 'meetings' ? 'white' : 'black',
              '&:hover': {
                backgroundColor: activeTab === 'meetings' ? '#16a34a' : '#e5e7eb',
              },
              textTransform: 'none',
              boxShadow: 'none',
              borderRadius: '8px',
              marginRight: '8px',
            }}
            onClick={() => setActiveTab('meetings')}
            aria-label="Show meetings"
            aria-pressed={activeTab === 'meetings'}
          >
            Meetings
          </Button>
          <Button 
            sx={{ 
              backgroundColor: activeTab === 'tasks' ? '#22c55e' : '#f3f4f6',
              color: activeTab === 'tasks' ? 'white' : 'black',
              '&:hover': {
                backgroundColor: activeTab === 'tasks' ? '#16a34a' : '#e5e7eb',
              },
              textTransform: 'none',
              boxShadow: 'none',
              borderRadius: '8px',
              marginRight: '8px',
            }}
            onClick={() => setActiveTab('tasks')}
            aria-label="Show tasks"
            aria-pressed={activeTab === 'tasks'}
          >
            Tasks
          </Button>
          <Button 
            sx={{ 
              backgroundColor: activeTab === 'events' ? '#22c55e' : '#f3f4f6',
              color: activeTab === 'events' ? 'white' : 'black',
              '&:hover': {
                backgroundColor: activeTab === 'events' ? '#16a34a' : '#e5e7eb',
              },
              textTransform: 'none',
              boxShadow: 'none',
              borderRadius: '8px',
            }}
            onClick={() => setActiveTab('events')}
            aria-label="Show events"
            aria-pressed={activeTab === 'events'}
          >
            Events
          </Button>
        </ButtonGroup>
      </div>

      {getActiveTabContent()}

      <div className="mt-4 text-center">
        <button 
          className="text-sm text-gray-500 flex items-center justify-center w-full hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg p-2"
          aria-label={`View more ${activeTab}`}
        >
          View More 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Schedule;