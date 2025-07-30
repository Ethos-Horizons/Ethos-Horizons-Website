# Client Portal Application - Detailed Development Prompt

## Project Overview
Create a comprehensive client portal web application for Ethos Digital Partners, a digital marketing agency. This portal will serve as the primary interface for clients to view their projects, reports, and communicate with the agency.

## Business Context
- **Agency**: Ethos Digital Partners (startup digital marketing agency)
- **Target Users**: Local business clients (restaurants, retail, service businesses)
- **Services**: SEO, PPC, Web Development, Content Marketing, Social Media, AI-powered automation
- **Business Model**: One-time setup fees + monthly retainers

## Core Requirements

### 1. Authentication & User Management
- **Client Registration**: Invite-based system (clients get email invitations)
- **Secure Login**: Email/password with 2FA option
- **Role-based Access**: 
  - Client (view their own data)
  - Agency Member (view assigned clients)
  - Admin (full access)
- **Profile Management**: Client can update contact info, preferences

### 2. Dashboard & Overview
- **Client Dashboard**: 
  - Project status overview
  - Recent activity feed
  - Quick stats (traffic, conversions, etc.)
  - Upcoming tasks/deadlines
  - Recent reports
- **Agency Dashboard**:
  - Client overview table
  - Project status board
  - Revenue tracking
  - Task management
  - Performance metrics

### 3. Project Management
- **Project Overview**:
  - Project details and timeline
  - Service breakdown (SEO, PPC, etc.)
  - Budget tracking
  - Milestone tracking
- **Task Management**:
  - Task creation and assignment
  - Status updates (To Do, In Progress, Review, Complete)
  - File attachments
  - Comments and communication
- **File Management**:
  - Document upload/download
  - Version control
  - Client approval workflow

### 4. Reporting & Analytics
- **Performance Reports**:
  - SEO rankings and traffic
  - PPC campaign performance
  - Social media metrics
  - Website analytics
- **Custom Dashboards**:
  - Drag-and-drop widget system
  - Real-time data updates
  - Export capabilities (PDF, Excel)
- **Automated Reports**:
  - Monthly/quarterly report generation
  - Email delivery to clients
  - Scheduled report creation

### 5. Communication System
- **Internal Messaging**:
  - Client ↔ Agency communication
  - File sharing
  - Message threading
  - Read receipts
- **Notification System**:
  - Email notifications
  - In-app notifications
  - SMS alerts (optional)
- **Meeting Scheduling**:
  - Calendar integration
  - Video call links
  - Meeting notes

### 6. Billing & Invoicing
- **Invoice Management**:
  - Generate invoices
  - Payment tracking
  - Payment history
  - Late payment reminders
- **Retainer Management**:
  - Monthly retainer tracking
  - Service usage monitoring
  - Budget alerts
- **Payment Integration**:
  - Stripe/PayPal integration
  - Automatic recurring payments
  - Payment receipt generation

### 7. Content Management
- **Content Calendar**:
  - Social media posts
  - Blog content
  - Email campaigns
  - Content approval workflow
- **Asset Library**:
  - Brand assets storage
  - Image/video management
  - File organization
- **Content Performance**:
  - Engagement metrics
  - A/B testing results
  - Content recommendations

## Technical Requirements

### Frontend
- **Framework**: React with TypeScript
- **UI Library**: Tailwind CSS + shadcn/ui components
- **State Management**: React Query + Zustand
- **Charts**: Recharts or Chart.js
- **File Upload**: React Dropzone
- **Calendar**: React Big Calendar
- **Real-time**: WebSocket or Server-Sent Events

### Backend
- **Framework**: Node.js with Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT + Passport.js
- **File Storage**: AWS S3 or similar
- **Email**: Nodemailer with templates
- **PDF Generation**: Puppeteer or similar
- **Cron Jobs**: Node-cron for automated tasks

### Database Schema (Key Tables)
```sql
-- Users & Authentication
users (id, email, password_hash, role, company_id, created_at)
companies (id, name, industry, contact_info, settings)
user_sessions (id, user_id, token, expires_at)

-- Projects & Tasks
projects (id, company_id, name, description, status, budget, timeline)
tasks (id, project_id, assigned_to, title, description, status, due_date)
task_comments (id, task_id, user_id, content, created_at)

-- Files & Assets
files (id, project_id, filename, filepath, file_type, uploaded_by)
file_versions (id, file_id, version, changes, created_at)

-- Reports & Analytics
reports (id, project_id, report_type, data, generated_at)
analytics_data (id, project_id, metric_type, value, date)

-- Communication
messages (id, project_id, sender_id, content, read_at)
notifications (id, user_id, type, content, read_at)

-- Billing
invoices (id, company_id, amount, status, due_date, paid_at)
payments (id, invoice_id, amount, method, transaction_id)
```

### Key Features to Implement

#### Phase 1: Core Functionality
1. **Authentication System**
   - User registration/login
   - Role-based access control
   - Password reset functionality

2. **Basic Dashboard**
   - Client overview
   - Project status cards
   - Recent activity feed

3. **Project Management**
   - Project creation and editing
   - Basic task management
   - File upload/download

#### Phase 2: Advanced Features
1. **Reporting System**
   - Custom dashboard builder
   - Automated report generation
   - Data visualization

2. **Communication Tools**
   - Internal messaging
   - Notification system
   - Meeting scheduling

3. **Billing Integration**
   - Invoice generation
   - Payment processing
   - Financial reporting

#### Phase 3: Automation & AI
1. **Automated Tasks**
   - Report scheduling
   - Payment reminders
   - Status updates

2. **AI Integration**
   - Performance insights
   - Content recommendations
   - Predictive analytics

## Security Requirements
- **Data Encryption**: All sensitive data encrypted at rest and in transit
- **Access Control**: Role-based permissions with audit logging
- **API Security**: Rate limiting, input validation, CORS configuration
- **Compliance**: GDPR compliance for client data handling
- **Backup**: Automated database backups and disaster recovery

## Performance Requirements
- **Response Time**: < 2 seconds for page loads
- **Uptime**: 99.9% availability
- **Scalability**: Support for 100+ concurrent users
- **Mobile**: Responsive design for all screen sizes

## Integration Points
- **Marketing Tools**: Google Analytics, Google Ads, Facebook Ads APIs
- **Communication**: Email service (SendGrid/Mailgun), SMS service
- **Payment**: Stripe for payment processing
- **File Storage**: AWS S3 for file management
- **Calendar**: Google Calendar API for scheduling

## Deployment & DevOps
- **Environment**: Production, staging, development
- **CI/CD**: Automated testing and deployment
- **Monitoring**: Application performance monitoring
- **Logging**: Centralized logging system
- **Backup**: Automated database and file backups

## Success Metrics
- **User Adoption**: 80% of clients actively using portal within 30 days
- **Communication**: 50% reduction in email back-and-forth
- **Efficiency**: 30% reduction in project management time
- **Client Satisfaction**: Improved client retention rates

## Future Considerations
- **Mobile App**: Native iOS/Android applications
- **API Access**: Public API for third-party integrations
- **White-label**: Ability to customize for other agencies
- **Multi-tenant**: Support for multiple agency instances
- **AI Features**: Advanced analytics and automation

## Development Timeline
- **Phase 1**: 6-8 weeks (Core functionality)
- **Phase 2**: 8-10 weeks (Advanced features)
- **Phase 3**: 4-6 weeks (Automation & AI)
- **Total**: 18-24 weeks for full implementation

This client portal should be designed with scalability in mind, as the agency plans to grow from a startup to a larger operation. The system should be intuitive for non-technical clients while providing powerful tools for the agency team. 