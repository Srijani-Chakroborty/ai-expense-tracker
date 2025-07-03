import React from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
const CustomBarChart = ({ data }) => {

    const getBarColor = (index) => {
        return index % 2 === 0 ? "#8884d8" : "#82ca9d";
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { category, amount } = payload[0].payload;
            return (
                <div className="bg-white shadow-md p-2 rounded-lg border border-gray-300">
                    <p className="text-xs font-semibold text-purple-700 mb-1">{category}</p>
                    <p className="text-sm text-gray-500">
                        Amount:{" "}
                        <span className="text-sm font-medium text-gray-900">${amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    }

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#555" }} />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke='none'/>
          <Tooltip cursor={{ fill: "transparent" }} content={CustomTooltip} />
          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart