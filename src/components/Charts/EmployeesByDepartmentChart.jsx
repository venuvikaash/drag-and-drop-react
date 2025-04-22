import React, { useRef, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Maximize2 } from 'lucide-react';

const EmployeesByDepartmentChart = () => {
  const chartContainerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  
  const data = [
    { name: 'Option A', value: 20, color: '#1E3A4C' },
    { name: 'Option B', value: 20, color: '#F5AEA0' },
    { name: 'Option C', value: 25, color: '#FF9800' },
    { name: 'Option D', value: 25, color: '#A5E0C3' },
    { name: 'Option E', value: 10, color: '#FF5252' },
    { name: 'Option F', value: 10, color: '#B8B3E6' }
  ];

  // Force chart to resize when container size changes
  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        // Update container height for responsive sizing
        setContainerHeight(chartContainerRef.current.clientHeight);
        
        // Trigger redraw by forcing a state update
        const event = new Event('resize');
        window.dispatchEvent(event);
      }
    };

    // Initial size calculation
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    
    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      if (chartContainerRef.current) {
        resizeObserver.unobserve(chartContainerRef.current);
      }
    };
  }, []);

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
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center">
            <span 
              className="inline-block w-4 h-4 mr-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700">
              {entry.value} - {entry.payload.value}%
            </span>
          </div>
        ))}
      </div>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-gray-600">{`Value: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-[450px] flex flex-col" ref={chartContainerRef}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Employees by Department</h2>
        <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%" maxHeight={500}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={3}
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
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