import React from 'react';
import { Card, Typography } from '@mui/material';
import { Gauge } from '@mui/x-charts';

const DepartmentHeadcountChart = () => {

  return (
    <Card className="w-full max-w-sm p-6 shadow-sm rounded-lg border border-gray-200">
      <div className="flex flex-col items-left">
        <Typography variant="h6" className="font-medium text-gray-900 mb-2 ml-1">
          Employee by Department
        </Typography>
      </div>
      <div className="flex justify-center items-center mb-4 h-[250px] w-full">
        <div className="relative h-[200px] w-[400px] bg-gray">
          <Gauge
            value={70}  
            valueMax={200}
            startAngle={-110}
            endAngle={110}
            color='#1E4841'
            sx={{
              '& .MuiGauge-valueText': {
                fontSize: 40,
                transform: 'translate(0px, 0px)',
                backgroundColor: '#1E4841'
              },
              
            }}

            text={({ value, valueMax }) => `${value}`}
          />
        </div>
      </div>
    </Card >
  );
};

export default DepartmentHeadcountChart;