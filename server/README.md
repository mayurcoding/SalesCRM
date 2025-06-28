# Sales CRM - Backend (Node.js/Express)

## Project Structure & Documentation
This README covers the Node.js/Express backend of the Sales CRM project. It includes API documentation, models, setup, and usage for the server app.

- For a high-level project overview and setup, see the [root README](../README.md)
- For frontend/client details, see [../client/README.md](../client/README.md)

The backend API server for the Sales CRM system built with Node.js, Express.js, and MongoDB. Provides comprehensive RESTful APIs for lead management, employee management, authentication, and analytics.

## 🚀 Features

### Authentication & Authorization
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for user passwords
- **Role-based Access**: Admin and Employee role management
- **Session Management**: Secure session handling
- **Middleware Protection**: Route protection with auth middleware

### Lead Management
- **CRUD Operations**: Complete lead lifecycle management
- **CSV Processing**: Bulk lead import with validation
- **Smart Distribution**: Automatic lead assignment algorithms
- **Search & Filter**: Advanced query capabilities
- **Status Tracking**: Lead status and type management

### Employee Management
- **Employee CRUD**: Full employee data management
- **Performance Tracking**: Employee metrics and analytics
- **Assignment Logic**: Lead distribution based on preferences
- **Role Management**: Admin and Employee role handling

### Dashboard & Analytics
- **Real-time Statistics**: Live dashboard data
- **Sales Analytics**: Performance metrics and charts
- **Activity Tracking**: User activity logging
- **Data Aggregation**: Complex data queries and grouping

## 🛠️ Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token authentication
- **bcryptjs**: Password hashing
- **csv-parser**: CSV file processing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## 📁 Project Structure

```
server/
├── controllers/           # Business logic handlers
│   ├── authController.js  # Authentication logic
│   ├── dashboardController.js # Dashboard data
│   ├── employeeController.js  # Employee management
│   └── leadController.js      # Lead management
├── models/               # MongoDB schemas
│   ├── Activity.js       # Activity tracking model
│   ├── Employee.js       # Employee data model
│   └── Lead.js           # Lead data model
├── routes/               # API route definitions
│   ├── auth.js           # Authentication routes
│   ├── dashboard.js      # Dashboard routes
│   ├── employees.js      # Employee routes
│   └── leads.js          # Lead routes
├── middleware/           # Custom middleware
│   └── auth.js           # Authentication middleware
├── seedData.js           # Database seeding script
├── index.js              # Server entry point
└── package.json          # Dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the server directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/salecrm
   JWT_SECRET=your_super_secret_jwt_key_123
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the API**
   - API Base URL: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

## 📊 Recent Updates (Last 4 Hours)

### ✅ New API Endpoints
- **Authentication Routes**: Login, profile management
- **Dashboard Routes**: Statistics, analytics, activities
- **Lead Routes**: CRUD operations, CSV upload, search
- **Employee Routes**: Employee management, performance tracking

### ✅ Enhanced Features
- **Complete CRUD Operations**: Full data management for all entities
- **CSV Processing**: Advanced file upload with validation
- **Smart Lead Distribution**: Algorithm-based assignment
- **Real-time Analytics**: Live dashboard data
- **Error Handling**: Comprehensive error management
- **Data Validation**: Input validation and sanitization

### ✅ Database Improvements
- **MongoDB Integration**: Proper database connection
- **Schema Design**: Optimized data models
- **Data Seeding**: Sample data for testing
- **Indexing**: Performance optimization
- **Relationships**: Proper data relationships

## 🔧 API Endpoints

### Authentication
```
POST   /api/auth/login          # User login
GET    /api/auth/profile        # Get user profile
PUT    /api/auth/profile        # Update profile
POST   /api/auth/logout         # User logout
```

### Dashboard
```
GET    /api/dashboard/stats     # Dashboard statistics
GET    /api/dashboard/analytics # Sales analytics
GET    /api/dashboard/activities # Recent activities
GET    /api/dashboard/employees # Employee data
```

### Leads
```
GET    /api/leads              # Get all leads (with pagination/search)
POST   /api/leads              # Create new lead
GET    /api/leads/:id          # Get specific lead
PUT    /api/leads/:id          # Update lead
DELETE /api/leads/:id          # Delete lead
POST   /api/leads/upload-csv   # Upload CSV leads
```

### Employees
```
GET    /api/employees          # Get all employees
POST   /api/employees          # Create employee
GET    /api/employees/:id      # Get specific employee
PUT    /api/employees/:id      # Update employee
DELETE /api/employees/:id      # Delete employee
```

## 🗄️ Database Models

### Employee Model
```javascript
{
  name: String,
  email: String,
  phone: String,
  role: String,
  department: String,
  location: String,
  languages: [String],
  status: String,
  assignedLeads: [Lead],
  performance: {
    totalLeads: Number,
    convertedLeads: Number,
    conversionRate: Number
  }
}
```

### Lead Model
```javascript
{
  name: String,
  email: String,
  phone: String,
  company: String,
  status: String,
  type: String,
  source: String,
  assignedTo: Employee,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Activity Model
```javascript
{
  user: Employee,
  action: String,
  description: String,
  entity: String,
  entityId: String,
  timestamp: Date
}
```

## 🔒 Security Features

### Authentication
- JWT token-based authentication
- Password hashing with bcrypt
- Token expiration and refresh
- Secure session management

### Authorization
- Role-based access control
- Route protection middleware
- Admin-only operations
- Employee-specific permissions

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration

## 📊 Data Processing

### CSV Upload Processing
```javascript
// Features:
- File validation (size, type, format)
- Data parsing and cleaning
- Duplicate detection
- Error handling and reporting
- Batch processing
- Progress tracking
```

### Lead Distribution Algorithm
```javascript
// Logic:
- Employee availability check
- Location-based matching
- Language preference matching
- Workload balancing
- Priority-based assignment
```

### Analytics Aggregation
```javascript
// Metrics:
- Sales performance
- Conversion rates
- Employee productivity
- Lead source analysis
- Time-based trends
```

## 🚀 Performance Optimizations

### Database
- **Indexing**: Strategic database indexes
- **Aggregation**: Efficient data queries
- **Pagination**: Large dataset handling
- **Caching**: Redis integration ready

### API
- **Compression**: Response compression
- **Rate Limiting**: API rate limiting
- **Caching**: Response caching
- **Load Balancing**: Horizontal scaling ready

## 🧪 Testing

### Available Scripts
```bash
npm test          # Run test suite
npm run dev       # Development mode with nodemon
npm run start     # Production start
npm run seed      # Seed database with sample data
```

### Testing Strategy
- Unit tests for controllers
- Integration tests for routes
- Database connection tests
- API endpoint testing

## 📦 Deployment

### Environment Variables
```env
# Production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/salecrm
JWT_SECRET=your_production_secret_key
PORT=5000
NODE_ENV=production
```

### Deployment Options
- **Heroku**: Easy deployment with Git
- **Render**: Free Node.js hosting
- **Railway**: Modern deployment platform
- **AWS EC2**: Scalable cloud hosting
- **DigitalOcean**: VPS hosting

### Docker Support
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔍 Monitoring & Logging

### Logging
- Request/response logging
- Error tracking
- Performance monitoring
- User activity logging

### Health Checks
- Database connectivity
- API endpoint health
- System resources
- External service status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with Node.js, Express.js, and MongoDB** 