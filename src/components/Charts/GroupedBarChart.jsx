import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Maximize2, ChevronDown } from 'lucide-react';

const GroupedBarChart = ({ title = "Revenue Overview" }) => {
  const data = [
  { name: 'Technology', '2022': 53.3, '2023': 36.1 },
  { name: 'Car Brands', '2022': 63.1, '2023': 76.5 },
  { name: 'Airlines', '2022': 58.9, '2023': 33.2 },
  { name: 'Energy', '2022': 10.8, '2023': 52.6 },
  { name: 'Technology', '2022': 42.3, '2023': 56.1 },
];
  const [selectedFilter, setSelectedFilter] = useState('Last 2 Years');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="flex items-center text-sm bg-white border border-gray-200 rounded-md px-3 py-1"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedFilter}
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {['Last Year', 'Last 2 Years', 'Last 5 Years', 'All Time'].map((option) => (
                  <div 
                    key={option}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedFilter(option);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Maximize2 className="h-5 w-5 text-gray-500 cursor-pointer" />
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              domain={[0, 'dataMax + 10']}
            />
            <Tooltip
              formatter={(value) => [`${value}`, '']}
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                borderRadius: "4px"
              }}
            />
            <Bar 
              dataKey="2022" 
              fill="#0F4C5C" 
              radius={[4, 4, 0, 0]} 
              barSize={15}
              label={{ 
                position: 'top', 
                fill: '#666', 
                fontSize: 10
              }}
            />
            <Bar 
              dataKey="2023" 
              fill="#D8BFD8" 
              radius={[4, 4, 0, 0]} 
              barSize={15}
              label={{ 
                position: 'top', 
                fill: '#666', 
                fontSize: 10
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        {[
          { year: '2022', color: '#0F4C5C' },
          { year: '2023', color: '#D8BFD8' }
        ].map((item) => (
          <div key={item.year} className="flex items-center">
            <div 
              className="w-3 h-3 mr-2" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm text-gray-700">{item.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupedBarChart;