import React from 'react';
import { PieChart , Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const CustomPieChart = () => {
  
  const data=[
    { name: 'Engineering', value: 30, color: '#1E3A4C' },
    { name: 'Marketing', value: 15, color: '#F5A8A3' },
    { name: 'Sales', value: 25, color: '#D8CEF9' },
    { name: 'Customer Support', value: 10, color: '#A8E6CF' },
    { name: 'Operations', value: 10, color: '#FF4242' },
    { name: 'HR', value: 10, color: '#9C59B6' }
  ];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  
  const isValid = Math.abs(total - 100) < 0.001;
  
  if (!isValid) {
    console.warn("Warning: Department percentages don't add up to 100%");
  }

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Employees by Department</h2>
      </div>
      
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Percentage']}
              labelFormatter={(index) => data[index].name}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Percentage labels positioned around the chart */}
        {data.map((item, index) => {
          
          const startAngle = 90 - (index * 360 / data.length);
          const angle = startAngle - (180 / data.length);
          const radians = (angle * Math.PI) / 180;
          const radius = 105; 
          
          const x = 50 + radius * Math.cos(radians);
          const y = 50 - radius * Math.sin(radians);
          
          return (
            <div 
              key={`label-${index}`}
              className="absolute bg-gray-100 rounded-full px-2 py-1 text-xs font-medium"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {`${item.value}%`}
            </div>
          );
        })}
        
        {/* Optional horizontal dotted line */}
        <div className="absolute w-full border-b border-dotted border-blue-200" style={{ top: '50%' }}></div>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-6">
        {data.map((item, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div className="w-4 h-4 mr-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm text-gray-700">{item.name}</span>
            <span className="ml-auto text-sm font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;