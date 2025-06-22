import React from 'react';
import './RecentActivity.css';

const RecentActivity = ({ activities = [] }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="recent-activity">
        <h4>Recent Activity Feed</h4>
        <p className="no-activities">No recent activities</p>
      </div>
    );
  }

  return (
    <div className="recent-activity">
      <h4>Recent Activity Feed</h4>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>{activity.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity; 