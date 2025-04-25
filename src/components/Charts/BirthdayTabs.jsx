import { useState } from 'react';
import {
    Tabs,
    Tab,
    Box,
    Avatar,
    Typography,
    IconButton,
} from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';

const birthdaysToday = [
    {
        name: 'Malton Durai',
        img: 'https://i.pravatar.cc/150?img=1',
    },
];

const upcomingBirthdays = [
    { name: 'Malton', date: '18th Aug', img: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Malton', date: '18th Aug', img: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Malton', date: '18th Aug', img: 'https://i.pravatar.cc/150?img=4' },
    { name: 'Malton', date: '18th Aug', img: 'https://i.pravatar.cc/150?img=5' },
    { name: 'Ranjith', date: '18th Aug', img: 'https://i.pravatar.cc/150?img=6' },
    { name: 'Bala', date: '18th Aug', img: 'https://i.pravatar.cc/150?img=7' },
    { name: 'Raina', date: '18th Aug', img: 'https://i.pravatar.cc/150?img=8' },
    { name: 'Ronda', date: '18th Aug', img: 'https://i.pravatar.cc/150?img=9' },
];

const BirthdayTabs = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Box className="w-full h-full p-4 border-[1px] border-[#DFDFDF] bg-white rounded-xl overflow-auto">
            <Tabs
                value={tabIndex}
                onChange={(e, val) => setTabIndex(val)}
                textColor="primary"
                TabIndicatorProps={{
                    style: { backgroundColor: '#000000' }
                }}
                sx={{
                    borderBottom: '1px solid #DFDFDF', 
                    '.MuiTab-root': {
                        textTransform: 'none',
                        color: '#5F5F5F',
                    },
                    '.Mui-selected': {
                        color: '#000000',
                    }
                }}
            >
                <Tab label="Birthdays" />
                <Tab label="Work Anniversary" />
                <Tab label="New Joinees" />
            </Tabs>


            {tabIndex === 0 && (
                <Box className="mt-4">
                    {/* Today */}
                    <span className="text-[15px] font-bold">Birthdays today</span>
                    {birthdaysToday.map((person, idx) => (
                        <Box key={idx} className="mb-6 my-2 bg-[#C1EDEC] rounded-lg px-4 py-2 flex justify-between items-center">
                            <Box className="flex items-center gap-3">
                                <Avatar src={person.img} />
                                <span className="text-[14px] font-bold">{person.name}</span>
                            </Box>
                            <IconButton>
                                <CakeIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}

                    {/* Upcoming */}
                    <span className="text-[15px] font-bold ">Upcoming Birthdays</span>
                    <Box className="flex gap-6 overflow-x-auto my-2">
                        {upcomingBirthdays.map((person, index) => (
                            <Box key={index} className="flex flex-col items-center text-center min-w-[64px]">
                                <Avatar src={person.img} sx={{ width: 40, height: 40 }} />
                                <span className="text-[14px] font-bold">{person.name}</span>
                                <span className="text-[12px]">{person.date}</span>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}

            {tabIndex === 1 && <Box className="mt-4 text-sm text-gray-500">No Work Anniversaries today.</Box>}
            {tabIndex === 2 && <Box className="mt-4 text-sm text-gray-500">No New Joinees today.</Box>}
        </Box>
    );
}

export default BirthdayTabs;
