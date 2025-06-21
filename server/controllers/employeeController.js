const Employee = require('../models/Employee');
const Activity = require('../models/Activity');

// @desc    Get all employees with pagination and search
// @route   GET /api/employees
// @access  Private (Admin)
const getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    // Build search query
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { preferredLanguage: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Build sort query
    const sortQuery = {};
    sortQuery[sortBy] = sortOrder;

    const employees = await Employee.find(searchQuery)
      .select('-password')
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    const total = await Employee.countDocuments(searchQuery);

    res.json({
      employees,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Private (Admin)
const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).select('-password');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    console.error('Get employee error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new employee
// @route   POST /api/employees
// @access  Private (Admin)
const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, location, preferredLanguage, role } = req.body;

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    // Create employee with default password as last name
    const employee = new Employee({
      firstName,
      lastName,
      email,
      location,
      preferredLanguage,
      role: role || 'employee',
      password: lastName // Will be hashed by pre-save middleware
    });

    const savedEmployee = await employee.save();

    // Log activity
    await Activity.create({
      type: 'employee_added',
      description: `${req.employee.getFullName()} added new employee ${savedEmployee.getFullName()}`,
      userId: req.employee._id,
      targetEmployeeId: savedEmployee._id
    });

    res.status(201).json({
      _id: savedEmployee._id,
      firstName: savedEmployee.firstName,
      lastName: savedEmployee.lastName,
      email: savedEmployee.email,
      location: savedEmployee.location,
      preferredLanguage: savedEmployee.preferredLanguage,
      role: savedEmployee.role,
      status: savedEmployee.status
    });
  } catch (error) {
    console.error('Create employee error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private (Admin)
const updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, location, preferredLanguage, status } = req.body;

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Update fields (language and location cannot be changed in edit mode)
    if (firstName) employee.firstName = firstName;
    if (lastName) employee.lastName = lastName;
    if (email) employee.email = email;
    if (status) employee.status = status;

    const updatedEmployee = await employee.save();

    // Log activity
    await Activity.create({
      type: 'employee_updated',
      description: `${req.employee.getFullName()} updated employee ${updatedEmployee.getFullName()}`,
      userId: req.employee._id,
      targetEmployeeId: updatedEmployee._id
    });

    res.json({
      _id: updatedEmployee._id,
      firstName: updatedEmployee.firstName,
      lastName: updatedEmployee.lastName,
      email: updatedEmployee.email,
      location: updatedEmployee.location,
      preferredLanguage: updatedEmployee.preferredLanguage,
      role: updatedEmployee.role,
      status: updatedEmployee.status
    });
  } catch (error) {
    console.error('Update employee error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private (Admin)
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Check if employee has assigned leads
    if (employee.assignedLeads && employee.assignedLeads.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete employee with assigned leads. Please reassign leads first.' 
      });
    }

    await Employee.findByIdAndDelete(req.params.id);

    // Log activity
    await Activity.create({
      type: 'employee_updated',
      description: `${req.employee.getFullName()} deleted employee ${employee.getFullName()}`,
      userId: req.employee._id,
      targetEmployeeId: employee._id
    });

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get active employees for lead assignment
// @route   GET /api/employees/active
// @access  Private (Admin)
const getActiveEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ status: 'active' })
      .select('firstName lastName location preferredLanguage')
      .sort({ firstName: 1, lastName: 1 });

    res.json(employees);
  } catch (error) {
    console.error('Get active employees error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getActiveEmployees
}; 