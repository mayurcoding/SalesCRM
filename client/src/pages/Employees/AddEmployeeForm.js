import React from 'react';
import './AddEmployeeForm.css';

const AddEmployeeForm = ({ onCancel }) => {
    const handleSave = (e) => {
        e.preventDefault();
        onCancel(); // For now, just close the modal
    }

    return (
        <div className="add-employee-form">
            <div className="modal-header">
                <h3>Add New Employee</h3>
                <button onClick={onCancel} className="close-btn">&times;</button>
            </div>
            <form onSubmit={handleSave}>
                <div className="form-group">
                    <label htmlFor="first-name">First name</label>
                    <input type="text" id="first-name" defaultValue="Mayur" />
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Last name</label>
                    <input type="text" id="last-name" defaultValue="Rastogi" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" defaultValue="mayurrastogi46@gmail.com" />
                </div>
                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <select id="location" defaultValue="bareilly">
                            <option>bareilly</option>
                            <option>Karnataka</option>
                            <option>California</option>
                        </select>
                    </div>
                     <span className="tooltip">Lead will be assigned on biases on location</span>
                </div>
                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="language">Preferred Language</label>
                        <select id="language" defaultValue="English">
                            <option>English</option>
                            <option>Tamil</option>
                        </select>
                    </div>
                    <span className="tooltip">Lead will be assigned on biases on language</span>
                </div>
                <div className="form-actions">
                    <button type="submit" className="save-btn">Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployeeForm; 