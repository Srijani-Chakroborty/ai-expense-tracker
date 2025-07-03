import React from 'react'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white shadow-md p-2 rounded-lg border border-gray-300">
        <p className="text-xs font-semibold text-purple-700 mb-1">{name}</p>
        <p className="text-sm text-gray-500">
          Amount:
          <span className="text-sm font-medium text-gray-900">${value}</span>
        </p>
      </div>
    );
  }
};

export default CustomTooltip;