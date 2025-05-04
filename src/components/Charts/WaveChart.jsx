import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart
} from 'recharts';
import { Maximize2, ChevronDown } from 'lucide-react';

const WaveChart = () => {

  const [data] = useState([
    { name: 'Technology', '2022': 30, '2023': 45, '2024': 70 },
    { name: 'Car Brands', '2022': 80, '2023': 85, '2024': 75 },
    { name: 'Airlines', '2022': 20, '2023': 40, '2024': 30 },
    { name: 'Energy', '2022': 35, '2023': 20, '2024': 60 },
    { name: 'Technology', '2022': 60, '2023': 50, '2024': 90 },
    { name: 'Car Brands', '2022': 70, '2023': 80, '2024': 60 },
    { name: 'Airlines', '2022': 40, '2023': 30, '2024': 70 },
    { name: 'Energy', '2022': 50, '2023': 90, '2024': 40 }
  ]);


  const [selectedFilter, setSelectedFilter] = useState('Last 3 Years');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-sm !h-[380px] overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Revenue Overview</h2>
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
                {['Last Year', 'Last 3 Years', 'Last 5 Years', 'All Time'].map((option) => (
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

      <div className="h-58">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
            <defs>
              <linearGradient id="color2022" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="color2023" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="color2024" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8c9bae" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8c9bae" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                borderRadius: "4px"
              }}
              formatter={(value) => [`${value}`, '']}
            />

            <Area
              type="monotone"
              dataKey="2024"
              fill="url(#color2024)"
              stroke="#8c9bae"
              strokeWidth={0}
              fillOpacity={0.3}
            />

            <Line
              type="monotone"
              dataKey="2022"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 5, fill: 'white', stroke: '#8884d8', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="2023"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 5, fill: 'white', stroke: '#82ca9d', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="2024"
              stroke="#8c9bae"
              strokeWidth={2}
              dot={{ r: 5, fill: 'white', stroke: '#8c9bae', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        {[
          { year: '2022', color: '#8884d8' },
          { year: '2023', color: '#82ca9d' },
          { year: '2024', color: '#8c9bae' }
        ].map((item) => (
          <div key={item.year} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm text-gray-700">{item.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaveChart;