import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const CustomGaugeChart = () => {
  const [data] = useState({ department: "Technology", value: 70 });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Calculate the values for the gauge chart
  const gaugeValue = data.value;
  const remainingValue = 100 - gaugeValue;
  
  const chartData = [
    { name: 'Value', value: gaugeValue },
    { name: 'Remaining', value: remainingValue }
  ];
  
  // Colors for the pie chart sections
  const COLORS = ['#1e4d45', '#f0f0f0'];
  
  // Sample departments for the dropdown
  const departments = ["Technology", "Marketing", "Finance", "Human Resources", "Operations"];
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md w-full !h-[350px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Employee by Department</h2>
        
        <div className="relative">
          <button 
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
            onClick={toggleDropdown}
          >
            {data.department}
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <ul className="py-1">
                {departments.map((dept, index) => (
                  <li 
                    key={index} 
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {dept}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="70%"
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={0}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Value displayed in the center of the gauge */}
        <div className="absolute inset-0 flex items-center justify-center mt-8">
          <span className="text-5xl font-bold">{data.value}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomGaugeChart;