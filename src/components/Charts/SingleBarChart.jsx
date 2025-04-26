// SingleBarChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SingleBarChart = ({ title = "Revenue Overview" }) => {
  const data = [
    { name: "Technology", value: 69.3 },
    { name: "Car Brands", value: 79.59 },
    { name: "Airlines", value: 79.82 },
    { name: "Energy", value: 15.39 },
    { name: "Technology", value: 56.66 },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#666" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#666" }}
              domain={[0, "dataMax + 10"]}
            />
            <Tooltip
              formatter={(value) => [`${value}`, ""]}
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                borderRadius: "4px",
              }}
            />
            <Bar
              dataKey="value"
              fill="#0F4C5C"
              radius={[4, 4, 0, 0]}
              barSize={35}
              label={{
                position: "top",
                fill: "#666",
                fontSize: 12,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        {["2022", "2023"].map((year, index) => (
          <div key={year} className="flex items-center">
            <div
              className={`w-3 h-3 mr-2 ${
                index === 0 ? "bg-teal-800" : "bg-purple-300"
              }`}
            ></div>
            <span className="text-sm text-gray-700">{year}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleBarChart;
