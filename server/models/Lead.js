const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  type: {
    type: String,
    enum: ['hot', 'warm', 'cold'],
    default: 'warm'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  location: {
    type: String,
    trim: true
  },
  preferredLanguage: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  scheduledCall: {
    date: Date,
    type: {
      type: String,
      enum: ['cold_call', 'referral'],
      default: 'cold_call'
    }
  },
  assignedDate: {
    type: Date,
    default: Date.now
  },
  closedDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
leadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for search functionality
leadSchema.index({ 
  name: 'text', 
  email: 'text', 
  company: 'text', 
  location: 'text' 
});

module.exports = mongoose.model('Lead', leadSchema); 