import React from 'react';

const Holidays = () => {
  const holidays = [
    { id: 1, date: '23 April 2026', name: 'Holi' },
    { id: 2, date: '13 May 2026', name: 'Diwali' },
    { id: 3, date: '02 June 2026', name: 'Ramadan' },
    { id: 4, date: '07 July 2026', name: 'Kite Festival' },
    { id: 5, date: '07 August 2026', name: 'Sankranti' },
    { id: 6, date: '07 August 2026', name: 'Sankranti' },
    { id: 7, date: '07 August 2026', name: 'Sankranti' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full !h-[420px] overflow-hidden">
      <div className="flex items-center mb-6">
        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700">Upcoming Holidays</h3>
      </div>

      <div className="space-y-3">
        {holidays.map(holiday => (
          <div key={holiday.id} className="flex items-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm">{holiday.date}</div>
            </div>
            <div className="text-sm font-medium text-green-600">{holiday.name}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-sm text-gray-500 flex items-center justify-center w-full">
          View More 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Holidays;