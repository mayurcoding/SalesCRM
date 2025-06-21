const express = require('express');
const router = express.Router();
const {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  assignLead,
  closeLead,
  uploadCSVLeads,
  getLeadStats
} = require('../controllers/leadController');
const { auth, adminAuth } = require('../middleware/auth');

// Lead CRUD and search
router.get('/', auth, getLeads);
router.get('/stats', auth, getLeadStats);
router.get('/:id', auth, getLead);
router.post('/', auth, createLead);
router.put('/:id', auth, updateLead);
router.delete('/:id', auth, deleteLead);

// Assignment and closing
router.put('/:id/assign', adminAuth, assignLead);
router.put('/:id/close', auth, closeLead);

// CSV upload
router.post('/upload-csv', adminAuth, uploadCSVLeads);

module.exports = router; 