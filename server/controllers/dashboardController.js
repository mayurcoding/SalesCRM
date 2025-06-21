const Lead = require('../models/Lead');
const Employee = require('../models/Employee');
const Activity = require('../models/Activity');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    // Get lead statistics
    const totalLeads = await Lead.countDocuments();
    const assignedLeads = await Lead.countDocuments({ assignedTo: { $exists: true, $ne: null } });
    const unassignedLeads = totalLeads - assignedLeads;
    const closedLeads = await Lead.countDocuments({ status: 'closed' });
    const conversionRate = totalLeads > 0 ? ((closedLeads / totalLeads) * 100).toFixed(1) : 0;

    // Get employee statistics
    const activeEmployees = await Employee.countDocuments({ status: 'active' });

    // Get leads assigned this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const leadsAssignedThisWeek = await Lead.countDocuments({
      assignedDate: { $gte: oneWeekAgo }
    });

    res.json({
      unassignedLeads: unassignedLeads.toString(),
      leadsAssignedThisWeek: leadsAssignedThisWeek.toString(),
      activeSalespeople: activeEmployees.toString(),
      conversionRate: `${conversionRate}%`
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get sales analytics data
// @route   GET /api/dashboard/analytics
// @access  Private
const getSalesAnalytics = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const analyticsData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      // Get total sales (closed leads) for this day
      const salesCount = await Lead.countDocuments({
        closedDate: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      });

      // Get cumulative sales up to this day
      const cumulativeSales = await Lead.countDocuments({
        closedDate: { $lte: endOfDay }
      });

      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      analyticsData.push({
        name: dayName,
        sales: salesCount,
        cumulativeSales: cumulativeSales
      });
    }

    res.json(analyticsData);
  } catch (error) {
    console.error('Get sales analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get recent activities
// @route   GET /api/dashboard/activities
// @access  Private
const getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('userId', 'firstName lastName')
      .populate('leadId', 'name')
      .populate('targetEmployeeId', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(10);

    const formattedActivities = activities.map(activity => {
      let description = activity.description;
      
      // Format time ago
      const timeAgo = getTimeAgo(activity.createdAt);
      
      return {
        id: activity._id,
        text: `${description} - ${timeAgo}`,
        type: activity.type,
        createdAt: activity.createdAt
      };
    });

    res.json(formattedActivities);
  } catch (error) {
    console.error('Get recent activities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get employees table data
// @route   GET /api/dashboard/employees
// @access  Private
const getDashboardEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ status: 'active' })
      .select('firstName lastName email location preferredLanguage')
      .populate('assignedLeads')
      .limit(5);

    const employeesWithStats = employees.map(employee => {
      const assignedLeadsCount = employee.assignedLeads ? employee.assignedLeads.length : 0;
      
      return {
        _id: employee._id,
        name: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        location: employee.location,
        preferredLanguage: employee.preferredLanguage,
        assignedLeads: assignedLeadsCount
      };
    });

    res.json(employeesWithStats);
  } catch (error) {
    console.error('Get dashboard employees error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to format time ago
const getTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

module.exports = {
  getDashboardStats,
  getSalesAnalytics,
  getRecentActivities,
  getDashboardEmployees
}; 