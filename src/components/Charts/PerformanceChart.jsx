import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";

const PerformanceChart = () => {
  const [yearFilter, setYearFilter] = useState("8 Years");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Performance data for all years
  const fullData = [
    { year: "2018", value: 10.5 },
    { year: "2019", value: 11.5 },
    { year: "2020", value: 12 },
    { year: "2021", value: 13 },
    { year: "2022", value: 12 },
    { year: "2023", value: 13.5 },
    { year: "2024", value: 14 },
    { year: "2025", value: 15 },
  ];

  // Filter data based on selected year range
  const getFilteredData = () => {
    if (yearFilter === "1 Year") {
      return fullData.slice(-1);
    } else if (yearFilter === "2 Years") {
      return fullData.slice(-2);
    } else if (yearFilter === "3 Years") {
      return fullData.slice(-3);
    } else {
      return fullData; // 8 Years (default)
    }
  };

  const data = getFilteredData();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectFilter = (filter) => {
    setYearFilter(filter);
    setDropdownOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-15">
        <h2 className="text-xl font-bold text-gray-800">My Performance</h2>
        <div className="relative">
          <button
            className="flex items-center border border-gray-300 rounded px-3 py-1 text-sm"
            onClick={toggleDropdown}
          >
            <span>Last {yearFilter}</span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 bg-white border rounded shadow-lg z-10">
              <ul className="py-1">
                <li
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectFilter("1 Year")}
                >
                  1 Year
                </li>
                <li
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectFilter("2 Years")}
                >
                  2 Years
                </li>
                <li
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectFilter("3 Years")}
                >
                  3 Years
                </li>
                <li
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectFilter("8 Years")}
                >
                  8 Years
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 10, bottom: 10, left: 10 }}
            barCategoryGap={10}
          >
            <CartesianGrid 
              horizontal={true} 
              vertical={false} 
              stroke="#e5e5e5" 
              strokeDasharray="3 3"
            />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#666' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={false}
              domain={[0, 18]}
            />
            <Bar 
              dataKey="value" 
              fill="#1B4D3E" 
              radius={[2, 2, 0, 0]} 
              barSize={60}
              label={{ 
                position: 'top', 
                fill: '#333',
                fontSize: 11,
                formatter: (value) => value
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Current year highlight */}
      <div className="flex justify-between px-10 pt-2">
        {data.map((item) => (
          <div 
            key={item.year} 
            className={`text-center mx-1 ${item.year === "2025" ? "bg-yellow-200 px-4 py-1 rounded" : ""}`}
            style={{ width: `${100/data.length}%`, maxWidth: 60 }}
          >
            {item.year === "2025" && (
              <span>{item.year}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;