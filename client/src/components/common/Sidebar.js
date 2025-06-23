import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ user }) => {
    // Get user initials for avatar
    const getUserInitials = () => {
        if (!user) return 'U';
        return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
    };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>CanovaCRM</h2>
      </div>
      <ul className="sidebar-menu">
        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
        <li><NavLink to="/leads" className={({ isActive }) => isActive ? 'active' : ''}>Leads</NavLink></li>
        <li><NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>Employees</NavLink></li>
        <li><NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink></li>
      </ul>
      <div className="sidebar-bottom">
        <p className="profile-label">Profile</p>
        <div className="profile-section">
            <div className="profile-avatar">{getUserInitials()}</div>
            <div className="profile-info">
                <p className="profile-name">{user ? `${user.firstName} ${user.lastName}` : 'User'}</p>
                <p className="profile-email">{user?.email || 'user@example.com'}</p>
                <p className="profile-role">{user?.role || 'Employee'}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 