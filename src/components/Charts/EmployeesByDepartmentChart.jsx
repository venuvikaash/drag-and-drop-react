import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Maximize2 } from 'lucide-react';

const EmployeesByDepartmentChart = () => {
  const data = [
    { name: 'Option A', value: 20, color: '#1E3A4C' },
    { name: 'Option B', value: 20, color: '#F5AEA0' },
    { name: 'Option C', value: 25, color: '#FF9800' },
    { name: 'Option D', value: 25, color: '#A5E0C3' },
    { name: 'Option E', value: 10, color: '#FF5252' },
    { name: 'Option F', value: 10, color: '#B8B3E6' }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontWeight="bold"
        fontSize="12"
      >
        {`${percent}%`}
      </text>
    );
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center mr-4 mb-4 w-[400px] h-[400px]">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center">
            <span 
              className="inline-block w-4 h-4 mr-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">
              {entry.value} - {entry.payload.value}%
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Employees by Department</h2>
        <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="relative h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              content={<CustomLegend />}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeesByDepartmentChart;