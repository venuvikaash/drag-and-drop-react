import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown, Maximize2 } from 'lucide-react';

const LinearChart = () => {
  const [selectedYear, setSelectedYear] = useState('Last 3 Years');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Corrected data to match the image with proper stacking values
  const data = [
    {
      name: 'Technology',
      '2022': 79.06,
      '2023': 27.95,
      '2024': 5.76,
    },
    {
      name: 'Car Brands',
      '2022': 65.71,
      '2023': 33.73,
      '2024': 87.98,
    },
    {
      name: 'Airlines',
      '2022': 59.59,
      '2023': 17.6,
      '2024': 48.01,
    },
    {
      name: 'Energy',
      '2022': 48.53,
      '2023': 28.68,
      '2024': 19.83,
    },
    {
      name: 'Technology',
      '2022': 67.94,
      '2023': 18.39,
      '2024': 35.37,
    },
    {
      name: 'Car Brands',
      '2022': 27.37,
      '2023': 95.53,
      '2024': 56.65,
    },
    {
      name: 'Airlines',
      '2022': 96.99,
      '2023': 98.42,
      '2024': 75.47,
    },
    {
      name: 'Energy',
      '2022': 48.82,
      '2023': 12.94,
      '2024': 82.53,
    },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectYear = (year) => {
    setSelectedYear(year);
    setIsDropdownOpen(false);
  };

  // Custom tooltip that shows the value
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm">
              <span style={{ color: entry.color }}>{entry.name}: </span>
              <span className="font-medium">{entry.value.toFixed(2)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm w-full max-w-4xl !h-[380px] overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Revenue Overview</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="flex items-center justify-between px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm min-w-32"
            >
              <span>{selectedYear}</span>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-10">
                <ul className="py-1">
                  <li 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => selectYear('Last 1 Year')}
                  >
                    Last 1 Year
                  </li>
                  <li 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => selectYear('Last 2 Years')}
                  >
                    Last 2 Years
                  </li>
                  <li 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => selectYear('Last 3 Years')}
                  >
                    Last 3 Years
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Maximize2 className="h-5 w-5 text-gray-500 cursor-pointer" />
        </div>
      </div>
      
      <div className="h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 20,
            }}
            barCategoryGap={30}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#4B5563', fontSize: 12 }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#4B5563', fontSize: 12 }}
              domain={[0, 300]}
              ticks={[0, 60, 120, 180, 240, 300]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span style={{ color: '#4B5563', fontSize: '12px' }}>{value}</span>}
            />
            <Bar dataKey="2022" stackId="a" name="2022" fill="#c4b5fd" radius={[4, 4, 0, 0]} barSize={25} />
            <Bar dataKey="2023" stackId="a" name="2023" fill="#4ade80" radius={[0, 0, 0, 0]} barSize={25} />
            <Bar dataKey="2024" stackId="a" name="2024" fill="#064e3b" radius={[0, 0, 0, 0]} barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LinearChart;