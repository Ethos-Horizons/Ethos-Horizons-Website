# Admin Dashboard - Detailed Development Prompt

## Project Overview
Create a comprehensive admin dashboard for Ethos Digital Partners that provides complete oversight of the agency's operations, client management, financial tracking, and business intelligence. This system will serve as the central command center for agency leadership and operations management.

## Business Context
- **Agency**: Ethos Digital Partners (startup digital marketing agency)
- **Target Users**: Agency owners, managers, and key team members
- **Purpose**: Complete business oversight and operational management
- **Scale**: Designed to grow from startup to mid-size agency
- **Integration**: Connects with Client Portal and AI Agent Dashboard

## Core Requirements

### 1. Business Intelligence & Analytics
- **Financial Dashboard**:
  - Revenue tracking and forecasting
  - Profit margin analysis
  - Client profitability metrics
  - Cash flow monitoring
  - Expense tracking and categorization
- **Client Analytics**:
  - Client acquisition metrics
  - Client retention rates
  - Lifetime value calculations
  - Service utilization analysis
  - Client satisfaction scores
- **Operational Metrics**:
  - Team productivity tracking
  - Project completion rates
  - Resource utilization
  - Time tracking and billing
  - Performance benchmarks

### 2. Client Management System
- **Client Overview**:
  - Complete client database
  - Service history and contracts
  - Communication logs
  - Document management
  - Client health scoring
- **Contract Management**:
  - Contract creation and tracking
  - Renewal notifications
  - Service level agreements
  - Pricing and rate management
  - Contract performance tracking
- **Client Lifecycle Management**:
  - Lead tracking and conversion
  - Onboarding process management
  - Account growth opportunities
  - Churn risk assessment
  - Upselling/cross-selling tracking

### 3. Team Management & HR
- **Employee Management**:
  - Team member profiles and roles
  - Performance tracking and reviews
  - Time tracking and attendance
  - Skill matrix and training needs
  - Workload distribution
- **Project Assignment**:
  - Resource allocation
  - Capacity planning
  - Skill-based task assignment
  - Workload balancing
  - Team collaboration tracking
- **Performance Management**:
  - KPI tracking and reporting
  - Goal setting and monitoring
  - Performance reviews
  - Recognition and rewards
  - Professional development tracking

### 4. Financial Management
- **Accounting Integration**:
  - QuickBooks/Xero integration
  - Automated financial reporting
  - Expense management
  - Tax preparation support
  - Financial compliance tracking
- **Billing & Invoicing**:
  - Automated invoice generation
  - Payment tracking and reminders
  - Revenue recognition
  - Collections management
  - Financial reporting
- **Budget Management**:
  - Budget planning and tracking
  - Cost center management
  - Variance analysis
  - Financial forecasting
  - Investment planning

### 5. Operations Management
- **Project Portfolio Management**:
  - Project pipeline overview
  - Resource allocation
  - Timeline management
  - Risk assessment
  - Portfolio optimization
- **Process Management**:
  - Standard operating procedures
  - Workflow automation
  - Quality control processes
  - Compliance monitoring
  - Continuous improvement tracking
- **Vendor Management**:
  - Vendor database and relationships
  - Contract management
  - Performance tracking
  - Cost analysis
  - Vendor evaluation

### 6. Marketing & Sales Management
- **Lead Management**:
  - Lead tracking and scoring
  - Conversion funnel analysis
  - Sales pipeline management
  - Lead source attribution
  - ROI tracking by channel
- **Marketing Campaign Management**:
  - Campaign planning and execution
  - Performance tracking
  - Budget allocation
  - A/B testing management
  - ROI analysis
- **Sales Performance**:
  - Sales team performance
  - Commission tracking
  - Sales forecasting
  - Territory management
  - Sales process optimization

### 7. Compliance & Risk Management
- **Regulatory Compliance**:
  - GDPR compliance tracking
  - Industry-specific regulations
  - Audit trail management
  - Compliance reporting
  - Risk assessment
- **Data Security**:
  - Security monitoring
  - Access control management
  - Data backup verification
  - Incident response tracking
  - Security training management
- **Legal Management**:
  - Contract tracking
  - Legal document management
  - Compliance deadlines
  - Risk mitigation strategies
  - Insurance tracking

## Technical Requirements

### Frontend
- **Framework**: React with TypeScript
- **UI Library**: Tailwind CSS + shadcn/ui components
- **State Management**: React Query + Zustand
- **Charts**: Recharts or Chart.js
- **Data Tables**: TanStack Table
- **File Management**: React Dropzone
- **Calendar**: React Big Calendar
- **Notifications**: Real-time toast system

### Backend
- **Framework**: Node.js with Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT + Passport.js
- **File Storage**: AWS S3
- **Email**: Nodemailer with templates
- **PDF Generation**: Puppeteer
- **Cron Jobs**: Node-cron for automation
- **Caching**: Redis for performance

### Database Schema (Key Tables)
```sql
-- Business Intelligence
financial_data (id, period, revenue, expenses, profit, cash_flow)
client_metrics (id, client_id, ltv, retention_score, satisfaction_score)
operational_metrics (id, metric_type, value, date, team_id)

-- Client Management
clients (id, name, industry, status, acquisition_date, contract_value)
client_contracts (id, client_id, service_type, start_date, end_date, value)
client_communications (id, client_id, type, content, date, user_id)

-- Team Management
employees (id, name, role, department, hire_date, salary, performance_score)
time_entries (id, employee_id, project_id, hours, date, description)
performance_reviews (id, employee_id, reviewer_id, score, feedback, date)

-- Financial Management
invoices (id, client_id, amount, status, due_date, paid_date)
expenses (id, category, amount, date, description, approved_by)
budgets (id, department, period, planned, actual, variance)

-- Operations
projects (id, client_id, name, status, start_date, end_date, budget)
project_tasks (id, project_id, assigned_to, title, status, due_date)
processes (id, name, description, steps, owner, status)

-- Marketing & Sales
leads (id, source, status, value, assigned_to, created_date)
sales_opportunities (id, lead_id, value, probability, expected_close)
marketing_campaigns (id, name, budget, start_date, end_date, roi)
```

### Key Features to Implement

#### Phase 1: Core Business Intelligence (6-8 weeks)
1. **Financial Dashboard**
   - Revenue and expense tracking
   - Profit margin analysis
   - Cash flow monitoring
   - Basic financial reporting

2. **Client Management**
   - Client database and profiles
   - Contract tracking
   - Basic client analytics
   - Communication logging

3. **Team Management**
   - Employee profiles and roles
   - Basic time tracking
   - Performance metrics
   - Resource allocation

#### Phase 2: Advanced Analytics (8-10 weeks)
1. **Advanced Reporting**
   - Custom dashboard builder
   - Automated report generation
   - Data visualization
   - Export capabilities

2. **Operational Management**
   - Project portfolio management
   - Process automation
   - Quality control
   - Vendor management

3. **Marketing & Sales**
   - Lead management system
   - Sales pipeline tracking
   - Campaign management
   - ROI analysis

#### Phase 3: Automation & Integration (6-8 weeks)
1. **System Integration**
   - Client Portal integration
   - AI Agent Dashboard integration
   - Third-party tool connections
   - Data synchronization

2. **Automation Features**
   - Automated reporting
   - Workflow automation
   - Alert systems
   - Predictive analytics

## Security & Compliance
- **Access Control**: Role-based permissions with audit logging
- **Data Encryption**: All sensitive data encrypted at rest and in transit
- **Compliance**: GDPR, SOC 2, and industry-specific compliance
- **Backup**: Automated data backup and disaster recovery
- **Monitoring**: Security monitoring and incident response

## Performance Requirements
- **Response Time**: < 2 seconds for dashboard loads
- **Uptime**: 99.9% availability
- **Scalability**: Support for 50+ concurrent users
- **Data Processing**: Handle large datasets efficiently

## Integration Points
- **Client Portal**: Real-time data synchronization
- **AI Agent Dashboard**: Performance and usage metrics
- **Accounting Software**: QuickBooks/Xero integration
- **CRM Systems**: Salesforce/HubSpot integration
- **Communication Tools**: Slack/Teams integration
- **File Storage**: Google Drive/Dropbox integration

## Success Metrics
- **Efficiency**: 40% reduction in administrative tasks
- **Visibility**: Real-time business insights
- **Decision Making**: Data-driven strategic decisions
- **Compliance**: 100% regulatory compliance
- **Growth**: Improved operational scalability

## Future Considerations
- **Mobile App**: Native mobile application
- **API Platform**: Public API for integrations
- **White-label**: Customizable for other agencies
- **Advanced AI**: Predictive analytics and automation
- **Multi-location**: Support for multiple office locations

## Development Timeline
- **Phase 1**: 6-8 weeks (Core BI and management)
- **Phase 2**: 8-10 weeks (Advanced analytics and operations)
- **Phase 3**: 6-8 weeks (Automation and integration)
- **Total**: 20-26 weeks for full implementation

## Risk Mitigation
- **Data Security**: Comprehensive security measures
- **User Adoption**: Intuitive interface and training
- **Integration Complexity**: Phased integration approach
- **Performance**: Scalable architecture design
- **Compliance**: Regular compliance audits and updates

This admin dashboard should provide complete visibility into all aspects of the agency's operations, enabling data-driven decision making and efficient management as the business scales from startup to a larger operation. The system should be designed with flexibility to adapt to changing business needs and regulatory requirements. 