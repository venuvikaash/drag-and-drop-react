import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MenuItem, FormControl, Select } from "@mui/material";

const sampleData = [
  { category: "Technology", year: "2020", value: 45 },
  { category: "Technology", year: "2021", value: 55 },
  { category: "Technology", year: "2022", value: 60 },
  { category: "Technology", year: "2023", value: 75 },
  { category: "Technology", year: "2024", value: 65 },
  { category: "Car Brands", year: "2020", value: 30 },
  { category: "Car Brands", year: "2021", value: 35 },
  { category: "Car Brands", year: "2022", value: 45 },
  { category: "Car Brands", year: "2023", value: 70 },
  { category: "Car Brands", year: "2024", value: 35 },
  { category: "Airlines", year: "2020", value: 25 },
  { category: "Airlines", year: "2021", value: 30 },
  { category: "Airlines", year: "2022", value: 38 },
  { category: "Airlines", year: "2023", value: 80 },
  { category: "Airlines", year: "2024", value: 53 },
];

const HorizontalBarChart = ({ data = sampleData }) => {
  const allYears = useMemo(() => {
    const years = [...new Set(data.map((item) => item.year))];
    return years.sort((a, b) => b - a);
  }, [data]);

  const yearRangeOptions = useMemo(() => {
    if (allYears.length === 0) return [];

    const options = [];

    if (allYears.length >= 3) {
      options.push({ value: "last3", label: "Last 3 Years" });
    }

    if (allYears.length >= 2) {
      options.push({ value: "last2", label: "Last 2 Years" });
    }

    if (allYears.length >= 5) {
      options.push({ value: "last5", label: "Last 5 Years" });
    }

    options.push({ value: "all", label: "All Years" });

    return options;
  }, [allYears]);

  const [selectedRange, setSelectedRange] = useState(
    yearRangeOptions.length > 0 ? yearRangeOptions[0].value : "all"
  );

  const yearsToDisplay = useMemo(() => {
    if (selectedRange === "all") return allYears;

    const count =
      selectedRange === "last2"
        ? 2
        : selectedRange === "last3"
        ? 3
        : selectedRange === "last5"
        ? 5
        : allYears.length;

    return allYears.slice(0, Math.min(count, allYears.length));
  }, [selectedRange, allYears]);

  const colorMap = useMemo(() => {
    const colors = [
      "#2ECC71",
      "#9B59B6",
      "#2C3E50",
      "#E74C3C",
      "#3498DB",
      "#F39C12",
    ];

    const map = {};
    allYears.forEach((year, index) => {
      map[year] = colors[index % colors.length];
    });

    return map;
  }, [allYears]);

  const processedData = useMemo(() => {
    const categories = [...new Set(data.map((item) => item.category))];

    const filteredData = data.filter((item) =>
      yearsToDisplay.includes(item.year)
    );

    return categories.map((category) => {
      const result = { category };

      yearsToDisplay.forEach((year) => {
        const matchingItem = filteredData.find(
          (item) => item.category === category && item.year === year
        );
        if (matchingItem) {
          result[year] = matchingItem.value;
        } else {
          result[year] = 0;
        }
      });

      return result;
    });
  }, [data, yearsToDisplay]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm overflow-hidden !h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Revenue Overview</h2>

        <div className="flex items-center gap-2">
          <FormControl size="small" className="min-w-32">
            <Select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              displayEmpty
              className="bg-white"
            >
              {yearRangeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
            <XAxis type="number" domain={[0, 100]} tickCount={6} />
            <YAxis dataKey="category" type="category" width={80} />
            <Tooltip
              formatter={(value) => [`${value}%`, "Revenue"]}
              labelFormatter={(category) => `Category: ${category}`}
            />
            <Legend />

            {yearsToDisplay.map((year) => (
              <Bar
                key={year}
                dataKey={year}
                fill={colorMap[year]}
                name={year}
                barSize={10}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HorizontalBarChart;
