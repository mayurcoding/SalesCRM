import React from 'react';
import './EmployeesTable.css';

const EmployeesTable = ({ employees = [] }) => {
  if (!employees || employees.length === 0) {
    return (
      <div className="employees-table-container">
        <h3>Recent Employees</h3>
        <p className="no-employees">No employees found</p>
      </div>
    );
  }

  return (
    <div className="employees-table-container">
      <h3>Recent Employees</h3>
      <div className="employees-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Language</th>
              <th>Assigned Leads</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.location}</td>
                <td>{employee.preferredLanguage}</td>
                <td>{employee.assignedLeads}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesTable; 