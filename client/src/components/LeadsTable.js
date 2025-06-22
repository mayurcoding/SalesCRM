import React from 'react';
import './LeadsTable.css';

const LeadsTable = () => {
    const data = [
        { no: '01', name: 'CSV0225', date: '01/03/2025', noOfLeads: 250, assignedLeads: 213, unassignedLeads: 30 },
    ];

  return (
    <div className="leads-table-container">
      <table className="leads-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Date</th>
            <th>No. of Leads</th>
            <th>Assigned Leads</th>
            <th>Unassigned Leads</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.no}>
              <td>{row.no}</td>
              <td>{row.name}</td>
              <td>{row.date}</td>
              <td>{row.noOfLeads}</td>
              <td>{row.assignedLeads}</td>
              <td>{row.unassignedLeads}</td>
              <td>
                <button className="actions-btn">&hellip;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable; 