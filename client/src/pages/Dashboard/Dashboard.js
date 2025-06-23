import React, { useState } from 'react';
import './Dashboard.css';
import StatsCard from '../../components/dashboard/StatsCard';
import SalesAnalytics from '../../components/dashboard/SalesAnalytics';
import RecentActivity from '../../components/dashboard/RecentActivity';
import EmployeesTable from '../../components/employee/EmployeesTable';

const Dashboard = () => {
  // Mock data for demonstration
  const [stats] = useState({
    unassignedLeads: '12',
    leadsAssignedThisWeek: '24',
    activeSalespeople: '5',
    conversionRate: '32%'
  });

  const [analytics] = useState([
    { name: 'Mon', sales: 15, cumulativeSales: 15 },
    { name: 'Tue', sales: 22, cumulativeSales: 37 },
    { name: 'Wed', sales: 18, cumulativeSales: 55 },
    { name: 'Thu', sales: 25, cumulativeSales: 80 },
    { name: 'Fri', sales: 30, cumulativeSales: 110 },
    { name: 'Sat', sales: 12, cumulativeSales: 122 },
    { name: 'Sun', sales: 8, cumulativeSales: 130 }
  ]);

  const [activities] = useState([
    { id: 1, text: 'Admin User assigned lead Alice Johnson to John Smith - 1 hour ago' },
    { id: 2, text: 'John Smith closed lead Carlos Rodriguez - 2 hours ago' },
    { id: 3, text: 'Admin User added new employee Maria Garcia - 3 hours ago' },
    { id: 4, text: 'Sarah Johnson updated lead status to hot - 4 hours ago' },
    { id: 5, text: 'David Chen scheduled call with Li Wei - 5 hours ago' }
  ]);

  const [employees] = useState([
    {
      _id: '1',
      name: 'John Smith',
      email: 'john.smith@canovacrm.com',
      location: 'New York',
      preferredLanguage: 'English',
      assignedLeads: 5
    },
    {
      _id: '2',
      name: 'Maria Garcia',
      email: 'maria.garcia@canovacrm.com',
      location: 'Los Angeles',
      preferredLanguage: 'Spanish',
      assignedLeads: 3
    },
    {
      _id: '3',
      name: 'David Chen',
      email: 'david.chen@canovacrm.com',
      location: 'San Francisco',
      preferredLanguage: 'Mandarin',
      assignedLeads: 8
    },
    {
      _id: '4',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@canovacrm.com',
      location: 'Chicago',
      preferredLanguage: 'English',
      assignedLeads: 6
    }
  ]);

  return (
    <div className="dashboard">
      <div className="stats-container">
        <StatsCard title="Unassigned Leads" value={stats.unassignedLeads} />
        <StatsCard title="Leads Assigned This Week" value={stats.leadsAssignedThisWeek} />
        <StatsCard title="Active Salespeople" value={stats.activeSalespeople} />
        <StatsCard title="Conversion Rate" value={stats.conversionRate} />
      </div>
      <div className="dashboard-main">
        <div className="dashboard-chart-area">
            <SalesAnalytics data={analytics} />
        </div>
        <div className="dashboard-activity-area">
            <RecentActivity activities={activities} />
        </div>
      </div>
      <EmployeesTable employees={employees} />
    </div>
  );
};

export default Dashboard; 