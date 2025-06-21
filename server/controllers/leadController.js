const Lead = require('../models/Lead');
const Employee = require('../models/Employee');
const Activity = require('../models/Activity');
const csv = require('csv-parser');
const fs = require('fs');

// @desc    Get all leads with pagination, search, and filters
// @route   GET /api/leads
// @access  Private
const getLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status || '';
    const type = req.query.type || '';
    const assignedTo = req.query.assignedTo || '';
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    // Build search query
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { source: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Add filters
    if (status) searchQuery.status = status;
    if (type) searchQuery.type = type;
    if (assignedTo) searchQuery.assignedTo = assignedTo;

    // Build sort query
    const sortQuery = {};
    sortQuery[sortBy] = sortOrder;

    const leads = await Lead.find(searchQuery)
      .populate('assignedTo', 'firstName lastName')
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    const total = await Lead.countDocuments(searchQuery);

    res.json({
      leads,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assignedTo', 'firstName lastName');

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new lead
// @route   POST /api/leads
// @access  Private
const createLead = async (req, res) => {
  try {
    const { name, email, phone, company, source, location, preferredLanguage, notes } = req.body;

    const lead = new Lead({
      name,
      email,
      phone,
      company,
      source,
      location,
      preferredLanguage,
      notes
    });

    const savedLead = await lead.save();

    // Log activity
    await Activity.create({
      type: 'lead_added',
      description: `${req.employee.getFullName()} added new lead ${savedLead.name}`,
      userId: req.employee._id,
      leadId: savedLead._id
    });

    res.status(201).json(savedLead);
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
const updateLead = async (req, res) => {
  try {
    const { name, email, phone, company, source, status, type, notes, scheduledCall } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Update fields
    if (name) lead.name = name;
    if (email) lead.email = email;
    if (phone) lead.phone = phone;
    if (company) lead.company = company;
    if (source) lead.source = source;
    if (status) lead.status = status;
    if (type) lead.type = type;
    if (notes) lead.notes = notes;
    if (scheduledCall) lead.scheduledCall = scheduledCall;

    // Set closed date if status is changed to closed
    if (status === 'closed' && lead.status !== 'closed') {
      lead.closedDate = new Date();
    }

    const updatedLead = await lead.save();

    res.json(updatedLead);
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    await Lead.findByIdAndDelete(req.params.id);

    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Assign lead to employee
// @route   PUT /api/leads/:id/assign
// @access  Private (Admin)
const assignLead = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const lead = await Lead.findById(req.params.id);
    const employee = await Employee.findById(employeeId);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    lead.assignedTo = employeeId;
    lead.assignedDate = new Date();
    await lead.save();

    // Add to employee's assigned leads
    employee.assignedLeads.push(lead._id);
    await employee.save();

    // Log activity
    await Activity.create({
      type: 'lead_assigned',
      description: `${req.employee.getFullName()} assigned lead ${lead.name} to ${employee.getFullName()}`,
      userId: req.employee._id,
      leadId: lead._id,
      targetEmployeeId: employeeId
    });

    res.json(lead);
  } catch (error) {
    console.error('Assign lead error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Close lead
// @route   PUT /api/leads/:id/close
// @access  Private
const closeLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Check if lead has scheduled call in the future
    if (lead.scheduledCall && lead.scheduledCall.date > new Date()) {
      return res.status(400).json({ 
        message: 'Cannot close lead with scheduled call in the future' 
      });
    }

    lead.status = 'closed';
    lead.closedDate = new Date();
    await lead.save();

    // Log activity
    await Activity.create({
      type: 'lead_closed',
      description: `${req.employee.getFullName()} closed lead ${lead.name}`,
      userId: req.employee._id,
      leadId: lead._id
    });

    res.json(lead);
  } catch (error) {
    console.error('Close lead error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Upload CSV leads
// @route   POST /api/leads/upload-csv
// @access  Private (Admin)
const uploadCSVLeads = async (req, res) => {
  try {
    const { leads, distributionType } = req.body;

    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ message: 'No leads data provided' });
    }

    const activeEmployees = await Employee.find({ status: 'active' });
    
    if (activeEmployees.length === 0) {
      return res.status(400).json({ message: 'No active employees available for assignment' });
    }

    const createdLeads = [];
    let employeeIndex = 0;

    for (const leadData of leads) {
      const lead = new Lead({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone || '',
        company: leadData.company || '',
        source: leadData.source || '',
        location: leadData.location || '',
        preferredLanguage: leadData.preferredLanguage || ''
      });

      // Assign lead based on distribution type
      if (distributionType === 'equal') {
        lead.assignedTo = activeEmployees[employeeIndex % activeEmployees.length]._id;
        employeeIndex++;
      } else if (distributionType === 'location_language') {
        // Priority: Language and Location Match
        const bestMatch = activeEmployees.find(emp => 
          emp.location === leadData.location && 
          emp.preferredLanguage === leadData.preferredLanguage
        );
        
        if (bestMatch) {
          lead.assignedTo = bestMatch._id;
        } else {
          // Fallback: Language or Location Match
          const partialMatch = activeEmployees.find(emp => 
            emp.location === leadData.location || 
            emp.preferredLanguage === leadData.preferredLanguage
          );
          
          if (partialMatch) {
            lead.assignedTo = partialMatch._id;
          } else {
            // Fallback: Equal distribution
            lead.assignedTo = activeEmployees[employeeIndex % activeEmployees.length]._id;
            employeeIndex++;
          }
        }
      }

      lead.assignedDate = new Date();
      const savedLead = await lead.save();
      createdLeads.push(savedLead);

      // Add to employee's assigned leads
      if (lead.assignedTo) {
        const employee = await Employee.findById(lead.assignedTo);
        employee.assignedLeads.push(savedLead._id);
        await employee.save();
      }

      // Log activity
      await Activity.create({
        type: 'lead_added',
        description: `${req.employee.getFullName()} added lead ${savedLead.name} via CSV upload`,
        userId: req.employee._id,
        leadId: savedLead._id
      });
    }

    res.status(201).json({
      message: `${createdLeads.length} leads created successfully`,
      leads: createdLeads
    });
  } catch (error) {
    console.error('Upload CSV leads error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get lead statistics
// @route   GET /api/leads/stats
// @access  Private
const getLeadStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const assignedLeads = await Lead.countDocuments({ assignedTo: { $exists: true, $ne: null } });
    const unassignedLeads = totalLeads - assignedLeads;
    const closedLeads = await Lead.countDocuments({ status: 'closed' });
    const conversionRate = totalLeads > 0 ? ((closedLeads / totalLeads) * 100).toFixed(1) : 0;

    res.json({
      totalLeads,
      assignedLeads,
      unassignedLeads,
      closedLeads,
      conversionRate: `${conversionRate}%`
    });
  } catch (error) {
    console.error('Get lead stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  assignLead,
  closeLead,
  uploadCSVLeads,
  getLeadStats
}; 