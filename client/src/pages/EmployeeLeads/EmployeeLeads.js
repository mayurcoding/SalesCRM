import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeLeads.css';

const leadsData = [
  {
    name: 'Mayur Rastogi',
    email: 'mayurrastogi@gmail.com',
    date: 'April 04, 2025',
    status: 'Ongoing',
    statusColor: 'orange',
  },
  {
    name: 'Mishika Rastogi  ',
    email: 'mishikarastogi@gmail.com',
    date: 'April 04, 2025',
    status: 'Ongoing',
    statusColor: 'yellow',
  },
  {
    name: 'Mishika Kapoor ',
    email: 'mishikakapoor@gmail.com',
    date: 'April 04, 2025',
    status: 'Closed',
    statusColor: 'gray',
  },
];

const EmployeeLeads = () => {
  const navigate = useNavigate();

  return (
    <div className="employee-leads-page">
      <nav className="employee-nav">
        <div className="nav-item" onClick={() => navigate('/employee-home')}>
          <p>🏠</p>
          <span>Home</span>
        </div>
        <div className="nav-item active" onClick={() => navigate('/employee-leads')}>
          <p>👥</p>
          <span>Leads</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/employee-schedule')}>
          <p>📅</p>
          <span>Schedule</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/employee-profile')}>
          <p>👤</p>
          <span>Profile</span>
        </div>
      </nav>

      <main className="employee-leads-content">
        <div className="header-blue">
          <div className="logo">CanovaCRM</div>
          <div className="page-title">
            <button className="back-btn" onClick={() => navigate(-1)}>{'<'}</button>
            <h1>Leads</h1>
          </div>
        </div>
        <div className="leads-list-container">
          <div className="search-container">
            <input type="text" placeholder="Search" />
            <button className="filter-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6h16M7 12h10M10 18h4" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="leads-list">
            {leadsData.map((lead, index) => (
              <div key={index} className="lead-card">
                <div className="lead-card-indicator" style={{backgroundColor: lead.statusColor === 'gray' ? '#ccc' : lead.statusColor}}></div>
                <div className="lead-info">
                  <div className="lead-name">{lead.name}</div>
                  <div className="lead-email">{lead.email}</div>
                  <div className="lead-date-container">
                    <span className="date-label">date</span>
                    <div className="lead-date">
                      <span>🗓️</span> {lead.date}
                    </div>
                  </div>
                </div>
                <div className="lead-status-and-actions">
                  <div className={`status-ring status-${lead.statusColor}`}>
                    <span>{lead.status}</span>
                  </div>
                  <div className="action-icons">
                    <button className="icon-btn">📝</button>
                    <button className="icon-btn">🕓</button>
                    <button className="icon-btn">✔️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeLeads; 