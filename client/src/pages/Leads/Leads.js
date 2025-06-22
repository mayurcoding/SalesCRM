import React, { useState } from 'react';
import './Leads.css';
import LeadsTable from '../../components/LeadsTable';
import Modal from '../../components/Modal';
import CSVUploader from '../../components/CSVUploader';

const Leads = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="leads-page">
      <div className="leads-header">
        <div className="breadcrumbs">
          Home &gt; Leads
        </div>
        <div className="header-actions">
            <button className="add-leads-btn" onClick={openModal}>Add Leads</button>
        </div>
      </div>
      <LeadsTable />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CSVUploader onCancel={closeModal} onNext={closeModal} />
      </Modal>
    </div>
  );
};

export default Leads; 