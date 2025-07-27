# Ethos Digital Partners Website

## Overview

This is a modern, responsive website for Ethos Digital Partners, a digital marketing agency. The application is built using a React frontend with TypeScript, Express.js backend, and PostgreSQL database with Drizzle ORM. The design utilizes Tailwind CSS with shadcn/ui components for a professional, dark-themed aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **API Design**: RESTful endpoints
- **Request Logging**: Custom middleware for API request tracking
- **Error Handling**: Centralized error handling middleware

### Database Layer
- **Database**: PostgreSQL (configured for production)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Connection**: @neondatabase/serverless for cloud database connectivity
- **Development Storage**: In-memory storage implementation for development

## Key Components

### Database Schema
- **Users Table**: Basic user authentication structure (id, username, password)
- **Contacts Table**: Contact form submissions (id, name, email, company, service, message, createdAt)
- **Validation**: Zod schemas for type-safe data validation

### API Endpoints
- `POST /api/contact` - Submit contact form with validation
- `GET /api/contacts` - Retrieve all contact submissions (admin endpoint)

### Frontend Features
- **Landing Page**: Modern single-page design showcasing services
- **Contact Form**: Validated form with service selection
- **Responsive Design**: Mobile-first approach with dark theme
- **Component Library**: Complete shadcn/ui component set for consistent UI

### Storage Interface
- **IStorage Interface**: Abstraction layer for data operations
- **MemStorage Implementation**: In-memory storage for development
- **Database Ready**: Prepared for PostgreSQL integration

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form on frontend
   - React Hook Form validates data using Zod schema
   - Form submission triggers API request to `/api/contact`
   - Backend validates data again using shared schema
   - Contact data is stored via storage interface
   - Success/error response sent back to frontend

2. **Data Validation**:
   - Shared Zod schemas ensure consistent validation between frontend and backend
   - Type safety maintained throughout the application stack

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for production
- **@tanstack/react-query**: Server state management
- **@hookform/resolvers**: Form validation integration
- **drizzle-orm & drizzle-zod**: Database ORM and validation
- **wouter**: Lightweight routing
- **zod**: Schema validation

### UI Dependencies
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle Kit handles schema migrations

### Environment Configuration
- **Development**: Uses in-memory storage and Vite dev server
- **Production**: Requires `DATABASE_URL` environment variable for PostgreSQL

### Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server
- `npm run db:push`: Push database schema changes

### File Structure
- `/client`: Frontend React application
- `/server`: Backend Express.js application  
- `/shared`: Shared schemas and types
- `/dist`: Production build output
- `/migrations`: Database migration files

The architecture is designed for scalability with clear separation of concerns, type safety throughout the stack, and modern development practices.

## Recent Changes

### January 27, 2025
- **Enhanced Visual Design**: Added animated background patterns with parallax effects
  - Hero section: Neural network circles with orbiting data nodes
  - AI section: Hexagonal grid pattern with floating elements
  - All animations use brand cyan/blue color scheme
- **UI Improvements**: 
  - Changed navbar to hamburger menu on all screen sizes
  - Updated company name from "Ethos Digital Partners" to "Ethos Digital"
  - Fixed chatbot z-index to stay above all content
  - Made chatbot icon larger and positioned lower in AI section
- **Content Strategy Updates**:
  - Removed fake testimonials section to maintain authenticity for startup phase
  - Added "Our Proven Process" section showcasing 4-step methodology
  - Enhanced "Why Choose Us" section emphasizing fresh perspective and personal attention
  - Moved pricing section to bottom after value demonstration
  - Repositioned navigation order: Services → AI → About → Process → Why Choose Us → Pricing
- **Technical Enhancements**:
  - Replaced problematic parallax backgrounds with reliable CSS animations
  - Added smooth scroll-based parallax effects to animated elements
  - Improved performance with hardware-accelerated transforms