const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['lead_assigned', 'lead_closed', 'lead_added', 'employee_added', 'employee_updated'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead'
  },
  targetEmployeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying of recent activities
activitySchema.index({ createdAt: -1 });

module.exports = mongoose.model('Activity', activitySchema); 