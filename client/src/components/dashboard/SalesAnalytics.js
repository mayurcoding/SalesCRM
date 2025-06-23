import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './SalesAnalytics.css';

const SalesAnalytics = ({ data = [] }) => {
  // Custom tooltip to show total sales
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="sales">{`Sales: ${payload[0].value}`}</p>
          <p className="cumulative">{`Total Sales: ${payload[0].payload.cumulativeSales}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="sales-analytics">
      <h2>Sales Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="sales" fill="#667eea" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesAnalytics; 