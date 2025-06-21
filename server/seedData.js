const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Employee = require('./models/Employee');
const Lead = require('./models/Lead');
const Activity = require('./models/Activity');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Employee.deleteMany({});
    await Lead.deleteMany({});
    await Activity.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin', 10);
    const admin = new Employee({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@canovacrm.com',
      location: 'New York',
      preferredLanguage: 'English',
      password: adminPassword,
      role: 'admin',
      status: 'active'
    });
    await admin.save();
    console.log('Created admin user');

    // Create sample employees
    const employees = [
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@canovacrm.com',
        location: 'New York',
        preferredLanguage: 'English',
        password: 'Smith',
        role: 'employee',
        status: 'active'
      },
      {
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.garcia@canovacrm.com',
        location: 'Los Angeles',
        preferredLanguage: 'Spanish',
        password: 'Garcia',
        role: 'employee',
        status: 'active'
      },
      {
        firstName: 'David',
        lastName: 'Chen',
        email: 'david.chen@canovacrm.com',
        location: 'San Francisco',
        preferredLanguage: 'Mandarin',
        password: 'Chen',
        role: 'employee',
        status: 'active'
      },
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@canovacrm.com',
        location: 'Chicago',
        preferredLanguage: 'English',
        password: 'Johnson',
        role: 'employee',
        status: 'active'
      }
    ];

    for (const empData of employees) {
      const empPassword = await bcrypt.hash(empData.password, 10);
      const employee = new Employee({
        ...empData,
        password: empPassword
      });
      await employee.save();
    }
    console.log('Created sample employees');

    // Create sample leads
    const leads = [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@company.com',
        phone: '+1-555-0101',
        company: 'TechCorp',
        source: 'Website',
        location: 'New York',
        preferredLanguage: 'English',
        status: 'open',
        type: 'hot'
      },
      {
        name: 'Bob Wilson',
        email: 'bob.wilson@startup.com',
        phone: '+1-555-0102',
        company: 'StartupXYZ',
        source: 'Referral',
        location: 'Los Angeles',
        preferredLanguage: 'English',
        status: 'open',
        type: 'warm'
      },
      {
        name: 'Carlos Rodriguez',
        email: 'carlos.rodriguez@business.com',
        phone: '+1-555-0103',
        company: 'Business Inc',
        source: 'Cold Call',
        location: 'Miami',
        preferredLanguage: 'Spanish',
        status: 'closed',
        type: 'hot',
        closedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        name: 'Li Wei',
        email: 'li.wei@enterprise.com',
        phone: '+1-555-0104',
        company: 'Enterprise Corp',
        source: 'Website',
        location: 'San Francisco',
        preferredLanguage: 'Mandarin',
        status: 'open',
        type: 'cold'
      }
    ];

    for (const leadData of leads) {
      const lead = new Lead(leadData);
      await lead.save();
    }
    console.log('Created sample leads');

    // Create sample activities
    const activities = [
      {
        type: 'employee_added',
        description: 'Admin User added new employee John Smith',
        userId: admin._id,
        targetEmployeeId: (await Employee.findOne({ email: 'john.smith@canovacrm.com' }))._id
      },
      {
        type: 'lead_added',
        description: 'Admin User added new lead Alice Johnson',
        userId: admin._id,
        leadId: (await Lead.findOne({ email: 'alice.johnson@company.com' }))._id
      },
      {
        type: 'lead_closed',
        description: 'Admin User closed lead Carlos Rodriguez',
        userId: admin._id,
        leadId: (await Lead.findOne({ email: 'carlos.rodriguez@business.com' }))._id
      }
    ];

    for (const activityData of activities) {
      const activity = new Activity(activityData);
      await activity.save();
    }
    console.log('Created sample activities');

    console.log('Data seeding completed successfully!');
    console.log('\nDemo Credentials:');
    console.log('Admin: admin@canovacrm.com / admin');
    console.log('Employee: john.smith@canovacrm.com / Smith');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedData();
}

module.exports = seedData; 