const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getActiveEmployees
} = require('../controllers/employeeController');
const { adminAuth } = require('../middleware/auth');

// All routes are admin protected
router.get('/', adminAuth, getEmployees);
router.get('/active', adminAuth, getActiveEmployees);
router.get('/:id', adminAuth, getEmployee);
router.post('/', adminAuth, createEmployee);
router.put('/:id', adminAuth, updateEmployee);
router.delete('/:id', adminAuth, deleteEmployee);

module.exports = router; 