import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="stats-card">
      <div className="stats-card-icon">
        {/* Placeholder for an icon */}
        <span className="icon-placeholder"></span>
      </div>
      <div className="stats-card-info">
        <p className="stats-card-title">{title}</p>
        <h2 className="stats-card-value">{value}</h2>
      </div>
    </div>
  );
};

export default StatsCard; 