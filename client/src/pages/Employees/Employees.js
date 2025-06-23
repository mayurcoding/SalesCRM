import React, { useState } from 'react';
import './Employees.css';
import EmployeeListTable from './EmployeeListTable';
import Modal from '../../components/common/Modal';
import AddEmployeeForm from './AddEmployeeForm';

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="employees-page">
      <div className="page-header">
        <div className="breadcrumbs">
          Home &gt; Employees
        </div>
        <button className="add-employees-btn" onClick={() => setIsModalOpen(true)}>Add Employees</button>
      </div>
      <EmployeeListTable />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddEmployeeForm onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Employees; 