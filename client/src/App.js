import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Leads from './pages/Leads/Leads';
import Employees from './pages/Employees/Employees';
import Settings from './pages/Settings/Settings';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EmployeeHome from './pages/EmployeeHome/EmployeeHome';
import RoleSelection from './pages/RoleSelection/RoleSelection';
import EmployeeLeads from './pages/EmployeeLeads/EmployeeLeads';
import EmployeeSchedule from './pages/EmployeeSchedule/EmployeeSchedule';
import EmployeeProfile from './pages/EmployeeProfile/EmployeeProfile';

// Mock user data for admin access
const mockUser = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@canovacrm.com',
  role: 'admin',
  location: 'New York',
  preferredLanguage: 'English',
  status: 'active'
};

// Main App Layout
const AppLayout = () => {
  return (
    <div className="app-container">
      <Sidebar user={mockUser} />
      <div className="main-content">
        <Header user={mockUser} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/employee-home" element={<EmployeeHome />} />
        <Route path="/employee-leads" element={<EmployeeLeads />} />
        <Route path="/employee-schedule" element={<EmployeeSchedule />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
