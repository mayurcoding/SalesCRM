import React, { useState } from 'react';
import './EmployeeListTable.css';
import Pagination from '../../components/ui/Pagination';

const EmployeeListTable = () => {
    const [openMenuId, setOpenMenuId] = useState(null);

    const handleMenuToggle = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const employees = [
        { id: 1, name: 'Tanner Finsha', email: '@tannerfisher@gmail.com', employeeId: '#23454GH6J7YT6', assignedLeads: 5, closedLeads: 2, status: 'Active' },
        { id: 2, name: 'Emeto Winner', email: 'emetowinner@gmail.com', employeeId: '#23454GH8J7YT6', assignedLeads: 3, closedLeads: 1, status: 'Active' },
        { id: 3, name: 'Tassy Omah', email: 'tassyomah@gmail.com', employeeId: '#23454GH6J7YT6', assignedLeads: 5, closedLeads: 0, status: 'Inactive' },
        { id: 4, name: 'James Muriel', email: 'jamesmuriel@aerten.finance', employeeId: '#23454GH6J7YT6', assignedLeads: 2, closedLeads: 0, status: 'Inactive' },
        { id: 5, name: 'Emeto Winner', email: 'emetowinner@gmail.com', employeeId: '#23454GH6J7YT6', assignedLeads: 1, closedLeads: 0, status: 'Inactive' },
        { id: 6, name: 'Tassy Omah', email: 'tassyomah@gmail.com', employeeId: '#23454GH6J7YT6', assignedLeads: 8, closedLeads: 3, status: 'Active' },
        { id: 7, name: 'James Muriel', email: 'jamesmuriel@aerten.finance', employeeId: '#23454GH6J7YT6', assignedLeads: 6, closedLeads: 4, status: 'Active' },
        { id: 8, name: 'Emeto Winner', email: 'emetowinner@gmail.com', employeeId: '#23454GH6J7YT6', assignedLeads: 4, closedLeads: 0, status: 'Inactive' },
    ];
    
    const getStatusClass = (status) => status === 'Active' ? 'status-active' : 'status-inactive';
    const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  return (
    <div className="table-container">
      <table className="employee-list-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Assigned Leads</th>
            <th>Closed Leads</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td><input type="checkbox" /></td>
              <td>
                <div className="employee-info">
                    <div className="employee-avatar">{getInitials(emp.name)}</div>
                    <div>
                        <div>{emp.name}</div>
                        <div className="employee-email">{emp.email}</div>
                    </div>
                </div>
              </td>
              <td className="employee-id-cell">{emp.employeeId}</td>
              <td>{emp.assignedLeads}</td>
              <td>{emp.closedLeads}</td>
              <td><span className={getStatusClass(emp.status)}>{emp.status}</span></td>
              <td className="actions-cell">
                <button className="actions-btn" onClick={() => handleMenuToggle(emp.id)}>&hellip;</button>
                {openMenuId === emp.id && (
                    <div className="actions-menu">
                        <button><span>✏️</span> Edit</button>
                        <button><span>🗑️</span> Delete</button>
                    </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default EmployeeListTable; 