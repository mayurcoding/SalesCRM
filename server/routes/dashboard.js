const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getSalesAnalytics,
  getRecentActivities,
  getDashboardEmployees
} = require('../controllers/dashboardController');
const { auth } = require('../middleware/auth');

router.get('/stats', auth, getDashboardStats);
router.get('/analytics', auth, getSalesAnalytics);
router.get('/activities', auth, getRecentActivities);
router.get('/employees', auth, getDashboardEmployees);

module.exports = router; 