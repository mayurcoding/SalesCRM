import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeHome.css';

const EmployeeHome = () => {
  const navigate = useNavigate();

  return (
    <div className="employee-home-page">
      <nav className="employee-nav">
        <div className="nav-item active" onClick={() => navigate('/employee-home')}>
          <p>🏠</p>
          <span>Home</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/employee-leads')}>
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
      <main className="employee-main-content">
        <div className="header-blue">
          <div className="logo">CanovaCRM</div>
          <div className="greeting">Good Morning</div>
          <div className="user-name">Rajesh Mehta</div>
        </div>

        <div className="content-grid">
          <div className="timings">
            <h2>Timings</h2>
            <div className="timing-card">
              <div className="check-in-out">
                <div>
                  <p>Check in</p>
                  <span>--:--</span>
                </div>
                <div>
                  <p>Check Out</p>
                  <span>--:--</span>
                </div>
              </div>
              <div className="timing-toggle"></div>
            </div>
          </div>

          <div className="break-section">
            <div className="break-card">
              <div className="break-header">
                <h3>Break</h3>
                <span>--:--</span>
                <div className="break-toggle"></div>
              </div>
              <div className="break-list">
                <div className="break-item">
                  <div>
                    <p>Break</p>
                    <span>01:25 pm</span>
                  </div>
                  <div>
                    <p>Ended</p>
                    <span>02:15 PM</span>
                  </div>
                  <div>
                    <p>Date</p>
                    <span>10/04/25</span>
                  </div>
                </div>
                <div className="break-item">
                  <div>
                    <p>Break</p>
                    <span>01:00 pm</span>
                  </div>
                  <div>
                    <p>Ended</p>
                    <span>02:05 PM</span>
                  </div>
                  <div>
                    <p>Date</p>
                    <span>09/04/25</span>
                  </div>
                </div>
                <div className="break-item">
                  <div>
                    <p>Break</p>
                    <span>01:05 pm</span>
                  </div>
                  <div>
                    <p>Ended</p>
                    <span>02:30 PM</span>
                  </div>
                  <div>
                    <p>Date</p>
                    <span>08/04/25</span>
                  </div>
                </div>
                <div className="break-item">
                  <div>
                    <p>Break</p>
                    <span>01:10 pm</span>
                  </div>
                  <div>
                    <p>Ended</p>
                    <span>02:00 PM</span>
                  </div>
                  <div>
                    <p>Date</p>
                    <span>07/04/25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-card">
              <ul>
                <li>You were assigned 3 more new lead - 1 hour ago</li>
                <li>You Closed a deal today - 2 hours ago</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeHome; 