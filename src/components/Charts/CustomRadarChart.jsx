import React, { useEffect, useRef, useState } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { ChevronDown } from 'lucide-react';

const CustomRadarChart = () => {
  const chartContainerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  
  const data = [
    {
      subject: 'Technology',
      2022: 40,
      2023: 50,
      2024: 80
    },
    {
      subject: 'Sales',
      2022: 50,
      2023: 80,
      2024: 70
    },
    {
      subject: 'Car Brands',
      2022: 60,
      2023: 90,
      2024: 70
    },
    {
      subject: 'Marketing',
      2022: 40,
      2023: 60,
      2024: 60
    },
    {
      subject: 'Airlines',
      2022: 55,
      2023: 75,
      2024: 65
    },
    {
      subject: 'Energy',
      2022: 45,
      2023: 65,
      2024: 55
    }
  ];

  // Color palette as specified
  const colorPalette = {
    purple2022: '#C8ABFE',
    green2023: '#3CDF8A',
    green2023Opacity: '#3CDF8A4D',
    darkGreen2024: '#1E4841',
    darkGreenOpacity: '#1E48414D',
    black: '#000000',
    blackOpacity80: '#000000B2',
    blackOpacity50: '#00000080'
  };

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

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 !h-[530px] flex flex-col overflow-hidden" ref={chartContainerRef}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Revenue Overview</h2>
        <button className="flex items-center text-gray-600 border rounded-md px-3 py-1 hover:bg-gray-50 transition-colors">
          Last 3 Years 
          <ChevronDown className="ml-2 w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%" maxHeight={500}>
          <RadarChart 
            data={data}
            startAngle={90}
            innerRadius="10%"
            outerRadius="80%"
            margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
          >
            <PolarGrid 
              stroke={colorPalette.blackOpacity50}
              strokeOpacity={0.5}
            />
            <PolarAngleAxis 
              dataKey="subject" 
              stroke={colorPalette.black}
              tick={{ fontSize: 12, fill: '#333' }}
              tickLine={false}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tickCount={4}
              stroke={colorPalette.blackOpacity80}
              tick={{ fontSize: 12, fill: '#666' }}
              strokeOpacity={0.7}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                padding: '10px'
              }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
            />
            <Legend 
              verticalAlign="top" 
              align="right"
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ fontSize: '12px', paddingBottom: '10px' }}
            />
            <Radar 
              name="2022" 
              dataKey="2022" 
              stroke={colorPalette.purple2022} 
              fill={colorPalette.purple2022} 
              fillOpacity={0.4}
              strokeWidth={2}
              animationBegin={0}
              animationDuration={1500}
            />
            <Radar 
              name="2023" 
              dataKey="2023" 
              stroke={colorPalette.green2023} 
              fill={colorPalette.green2023}
              fillOpacity={0.4}
              strokeWidth={2}
              animationBegin={200}
              animationDuration={1500}
            />
            <Radar 
              name="2024" 
              dataKey="2024" 
              stroke={colorPalette.darkGreen2024} 
              fill={colorPalette.darkGreen2024}
              fillOpacity={0.4}
              strokeWidth={2}
              animationBegin={400}
              animationDuration={1500}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomRadarChart;