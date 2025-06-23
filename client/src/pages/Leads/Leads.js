import React, { useState } from 'react';
import './Leads.css';
import LeadList from '../../components/lead/LeadList';
import Modal from '../../components/common/Modal';
import CSVUploader from '../../components/lead/CSVUploader';

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
      <LeadList />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CSVUploader onCancel={closeModal} onNext={closeModal} />
      </Modal>
    </div>
  );
};

export default Leads; 