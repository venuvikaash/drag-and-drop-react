import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const StackedRevenueChart = () => {
  return (
    <div className="p-4 w-full h-full  rounded-md shadow-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Revenue Overview</h2>
        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
          <option>Last 6 Years</option>
        </select>
      </div>

      <div className="bg-white rounded-md p-1">
        <BarChart
          xAxis={[
            {
              scaleType: 'linear',
              
            },
          ]}
          yAxis={[
            {
              scaleType: 'band',
              data: ['Technology', 'Car Brands', 'Airlines'],
              categoryGapRatio: 0.4,
              width:80
            },
          ]}
          series={[
            { data: [64.28, 78.63, 30.78], color: '#004d40' },
            { data: [64.32, 16.4, 81.66], color: '#00e676' },
            { data: [17.97, 89.4, 12.09], color: '#ce93d8' },
          ]}
          height={300}
          width={450} // or more based on your layout
          layout="horizontal"
          margin={{ left: 1 }} // Add margin for y-axis labels
        />
      </div>

      <div className="flex justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-[#004d40] rounded-sm"></div>
          <span>2022</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-[#00e676] rounded-sm"></div>
          <span>2023</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-[#ce93d8] rounded-sm"></div>
          <span>2024</span>
        </div>
      </div>
    </div>
  );
};

export default StackedRevenueChart;