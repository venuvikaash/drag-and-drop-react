import React from 'react';

const Notes = () => {
  const notes = [
    { id: 1, title: 'Highlevel ideas', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad', date: '9 Dec 2024' },
    { id: 2, title: 'Highlevel ideas', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad', date: '9 Dec 2024' },
    { id: 3, title: 'Highlevel ideas', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad', date: '9 Dec 2024' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full border border-dashed border-blue-200 !h-[550px] overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700">Notes</h3>
        </div>
        <div>
          <button className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notes.map(note => (
          <div key={note.id} className="border-b border-gray-200 pb-4">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium">{note.title}</h4>
              <span className="text-sm text-gray-500">{note.date}</span>
            </div>
            <p className="text-sm text-gray-600">{note.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button className="text-sm text-gray-500">See All Notes</button>
        <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notes;