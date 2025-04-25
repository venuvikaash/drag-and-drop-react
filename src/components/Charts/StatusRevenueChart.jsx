import React from 'react';
import { Card, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';

const StatusRevenueChart = () => {

    return (
        <Card className="w-full max-w-sm p-6 pl-2 shadow-sm rounded-lg border border-gray-200">
            <div className="flex flex-col items-left">
                <Typography variant="h6" className="font-semibold mb-2 ml-1">
                    Revenue Overview
                </Typography>
            </div>
            <div className="flex justify-center items-center mb-4 h-[250px] w-full">
                <div className="relative h-[200px] w-[400px] bg-gray">
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                                data: [10, 7, 5, 4, 2, -3],
                                area: true,
                                baseline: 'min',
                            },
                        ]}
                        height={300}
                    />
                </div>
            </div>
        </Card >
    );
};

export default StatusRevenueChart;