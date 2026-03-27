import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import '../styles/WasteChart.css';

const COLORS = {
  Organic: '#10b981',
  Plastic: '#f59e0b',
  Metal: '#6366f1',
  Unknown: '#9ca3af'
};

const WasteChart = ({ data }) => {
  const chartData = data.map(item => ({
    name: item._id,
    value: item.count
  }));

  return (
    <div className="waste-chart">
      <h2>Waste Category Distribution</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS.Unknown} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="no-data">No data available yet. Upload waste images to see analytics.</p>
      )}
    </div>
  );
};

export default WasteChart;
