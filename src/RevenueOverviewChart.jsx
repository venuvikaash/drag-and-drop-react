import React, { useEffect, useRef } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ChevronDown } from 'lucide-react';

const RevenueOverviewChart = () => {
  const chartContainerRef = useRef(null);
  
  const data = [
    {
      sector: 'Technology',
      2022: 30,
      2023: 40,
      2024: 80
    },
    {
      sector: 'Car Brands',
      2022: 50,
      2023: 150,
      2024: 140
    },
    {
      sector: 'Airlines',
      2022: 80,
      2023: 180,
      2024: 140
    },
    {
      sector: 'Energy',
      2022: 50,
      2023: 110,
      2024: 120
    }
  ];

  // Force chart to resize when container size changes
  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        // Trigger redraw by forcing a state update
        const event = new Event('resize');
        window.dispatchEvent(event);
      }
    };

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

  return (
    <div className="bg-white rounded-b-lg p-6 shadow-md w-full h-full" ref={chartContainerRef}>
      {/* Custom SVG Filters for Glow Effect */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="glow-purple">
            <feGaussianBlur className="blur" result="coloredBlur" stdDeviation="4"></feGaussianBlur>
            <feMerge>
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
          <filter id="glow-green">
            <feGaussianBlur className="blur" result="coloredBlur" stdDeviation="4"></feGaussianBlur>
            <feMerge>
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
          <filter id="glow-black">
            <feGaussianBlur className="blur" result="coloredBlur" stdDeviation="4"></feGaussianBlur>
            <feMerge>
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Revenue Overview</h2>
        <button className="flex items-center text-gray-600 border rounded-md px-3 py-1">
          Last 3 Years 
          <ChevronDown className="ml-2 w-4 h-4" />
        </button>
      </div>
      
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#f0f0f0"
            />
            <XAxis 
              dataKey="sector" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px'
              }}
            />
            <Legend 
              verticalAlign="top" 
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '10px' }}
            />
            
            <Line 
              type="monotone" 
              dataKey="2022" 
              stroke="#8884d8" 
              strokeWidth={2}
              dot={{ r: 3 }}
              style={{ filter: 'url(#glow-purple)' }}
            />
            <Line 
              type="monotone" 
              dataKey="2023" 
              stroke="#00C17C" 
              strokeWidth={2}
              dot={{ r: 3 }}
              style={{ filter: 'url(#glow-green)' }}
            />
            <Line 
              type="monotone" 
              dataKey="2024" 
              stroke="#000000" 
              strokeWidth={2}
              dot={{ r: 3 }}
              style={{ filter: 'url(#glow-black)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueOverviewChart;