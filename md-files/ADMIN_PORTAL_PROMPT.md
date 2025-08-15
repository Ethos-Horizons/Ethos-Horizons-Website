# Admin/Client Portal Application - Development Prompt

## 🏠 **Project Overview**
Create a comprehensive business management system that serves as the "interior" of our business operations. This is a unified platform for both admin management and client self-service, enabling seamless business operations, client onboarding, project management, and financial tracking.

## 🎯 **Core Purpose**
- **For Clients:** Complete business dashboard with website development preview, analytics, service management, and billing
- **For Admins:** Client management, project oversight, financial tracking, and business operations
- **Integration:** Seamless connection with AI Agent Dashboard for automated services

## 🏗️ **Architecture**

### **Technology Stack**
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL (Supabase)
- **Authentication:** Supabase Auth with Google OAuth
- **Real-time:** WebSocket for live updates
- **File Storage:** Supabase Storage
- **Payment Processing:** Stripe integration
- **Analytics:** Custom dashboard + third-party integrations

### **Key Features**

#### **1. Client Onboarding & Account Management**
- **Account Creation:** Seamless signup from website "Get Started" button
- **Business Profile Setup:** Company info, industry, goals, budget
- **Service Selection:** Choose from available services and packages
- **Budget Configuration:** Set marketing budgets and payment methods
- **Onboarding Wizard:** Step-by-step setup process

#### **2. Website Development Management**
- **Development Preview:** Live preview of website under development
- **Commenting System:** Clients can leave feedback on specific sections
- **Revision Tracking:** Version control for website changes
- **Approval Workflows:** Content approval and deployment management
- **Domain Management:** Domain suggestions, registration, and DNS setup

#### **3. Analytics Dashboard**
- **Website Analytics:** Traffic, conversions, performance metrics
- **Social Media Analytics:** Engagement, reach, follower growth
- **Marketing Campaign ROI:** Track spending vs. results
- **Client Satisfaction:** Feedback and satisfaction scores
- **Custom Reports:** Generate and schedule reports

#### **4. Service Management**
- **Service Catalog:** Available services with pricing
- **Subscription Management:** Add/remove services, upgrade/downgrade
- **Usage Tracking:** API usage, service utilization
- **Service Requests:** Submit and track service requests
- **Automated Workflows:** AI agent integration for routine tasks

#### **5. Financial Management**
- **Billing Dashboard:** Invoice history, payment status
- **Budget Tracking:** Marketing budget allocation and monitoring
- **Payment Processing:** Stripe integration for payments
- **Automated Billing:** Recurring payments and invoicing
- **Cost Analysis:** API usage costs, service costs per client

#### **6. Communication Hub**
- **Client Portal:** Secure messaging between clients and team
- **Notification System:** Email, SMS, and in-app notifications
- **File Sharing:** Secure document and asset sharing
- **Meeting Scheduling:** Calendar integration for consultations
- **Knowledge Base:** Self-service resources and FAQs

#### **7. Admin Management**
- **Client Overview:** All clients, services, and status
- **Project Management:** Track all active projects and deadlines
- **Team Management:** Assign tasks, track workload
- **Financial Overview:** Revenue, expenses, profitability
- **Performance Metrics:** Team productivity, client satisfaction

## 🔄 **User Flows**

### **Client Journey**
1. **Website Visit** → Chatbot interaction → Lead capture
2. **"Get Started" Button** → Account creation → Admin Portal
3. **Onboarding Process** → Business profile → Service selection → Budget setup
4. **Development Phase** → Website preview → Feedback system → Revisions
5. **Live Phase** → Analytics → Ongoing management → Service expansion

### **Admin Workflow**
1. **Lead Management** → Review new leads → Contact prospects
2. **Client Onboarding** → Guide through setup → Service configuration
3. **Project Management** → Track development → Client communication
4. **Service Delivery** → Monitor performance → Client support
5. **Business Growth** → Analyze metrics → Optimize operations

## 🎨 **UI/UX Design**

### **Design Principles**
- **Professional & Trustworthy:** Clean, modern interface
- **User-Friendly:** Intuitive navigation and workflows
- **Responsive:** Works on all devices
- **Accessible:** WCAG compliant
- **Brand Consistent:** Matches website design language

### **Key Components**
- **Dashboard Cards:** Quick overview of key metrics
- **Data Tables:** Sortable, filterable data views
- **Charts & Graphs:** Interactive analytics visualizations
- **Modal Dialogs:** Quick actions and forms
- **Notification System:** Real-time updates and alerts
- **File Upload:** Drag-and-drop file management

## 🔧 **Technical Requirements**

### **Database Schema**
```sql
-- Core tables
users (id, email, role, business_info, created_at)
clients (id, user_id, business_name, industry, budget, status)
projects (id, client_id, type, status, start_date, end_date)
services (id, name, description, price, category)
subscriptions (id, client_id, service_id, status, start_date, end_date)

-- Financial tables
invoices (id, client_id, amount, status, due_date, paid_date)
payments (id, invoice_id, amount, method, status, created_at)
budgets (id, client_id, amount, spent, period)

-- Analytics tables
website_analytics (id, client_id, date, page_views, conversions, revenue)
social_analytics (id, client_id, platform, date, followers, engagement)
marketing_campaigns (id, client_id, name, budget, spent, results)

-- Communication tables
messages (id, sender_id, recipient_id, subject, content, read_at)
notifications (id, user_id, type, title, content, read_at)
```

### **API Endpoints**
```
# Authentication
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/profile

# Client Management
GET /api/clients
POST /api/clients
GET /api/clients/:id
PUT /api/clients/:id
DELETE /api/clients/:id

# Project Management
GET /api/projects
POST /api/projects
GET /api/projects/:id
PUT /api/projects/:id
POST /api/projects/:id/comments

# Analytics
GET /api/analytics/website/:clientId
GET /api/analytics/social/:clientId
GET /api/analytics/marketing/:clientId

# Financial
GET /api/invoices
POST /api/invoices
GET /api/payments
POST /api/payments
GET /api/budgets/:clientId

# Services
GET /api/services
POST /api/services
PUT /api/services/:id
DELETE /api/services/:id
```

### **Security Requirements**
- **Authentication:** JWT tokens with refresh
- **Authorization:** Role-based access control
- **Data Encryption:** Sensitive data encrypted at rest
- **API Security:** Rate limiting, input validation
- **File Security:** Secure file upload and storage

## 🚀 **Development Phases**

### **Phase 1: Core Foundation**
- User authentication and authorization
- Basic client and project management
- Simple dashboard layout
- Database schema implementation

### **Phase 2: Client Features**
- Client onboarding wizard
- Website development preview
- Basic analytics dashboard
- Communication system

### **Phase 3: Financial Integration**
- Stripe payment processing
- Billing and invoicing system
- Budget tracking
- Financial reporting

### **Phase 4: Advanced Analytics**
- Comprehensive analytics dashboard
- Custom reporting
- Performance monitoring
- Client satisfaction tracking

### **Phase 5: AI Integration**
- AI agent integration
- Automated workflows
- Smart recommendations
- Predictive analytics

## 📊 **Success Metrics**
- **Client Satisfaction:** >90% satisfaction score
- **User Adoption:** >80% of clients use portal regularly
- **Response Time:** <2 seconds for all operations
- **Uptime:** >99.9% availability
- **Security:** Zero security incidents

## 🔗 **Integration Points**
- **Website:** Seamless account creation from "Get Started" button
- **AI Agent Dashboard:** Agent assignment and task management
- **Payment Systems:** Stripe for processing, webhooks for updates
- **Analytics Services:** Google Analytics, social media APIs
- **Communication:** Email service, SMS service
- **File Storage:** Supabase Storage for assets and documents

## 📝 **Development Notes**
- Focus on scalability from day one
- Implement comprehensive error handling
- Build with mobile-first responsive design
- Ensure accessibility compliance
- Create comprehensive documentation
- Implement automated testing
- Plan for future AI agent integration

This system will be the central hub for all business operations, providing both clients and admins with the tools they need to succeed in their partnership. 