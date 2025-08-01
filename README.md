# Ethos Digital - Digital Marketing Agency Website

A modern, responsive website for Ethos Digital, featuring advanced React frontend with animated parallax backgrounds and professional design. Built with a full-stack architecture using React, Express.js, and PostgreSQL.

## 🚀 Live Demo

Visit the live website: [Coming Soon]

## ✨ Features

- **Modern React Architecture** - Built with React 18, TypeScript, and Vite
- **Animated Backgrounds** - Neural network patterns and geometric animations with parallax effects
- **Responsive Design** - Mobile-first approach with hamburger navigation
- **Contact Form** - Fully functional contact form with backend API integration
- **Professional UI** - Dark theme with cyan accents using shadcn/ui components
- **Performance Optimized** - Fast loading with modern build tools
- **Full-Stack Integration** - Express.js backend with PostgreSQL database
- **Type Safety** - End-to-end TypeScript with Zod validation

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool and dev server)
- Tailwind CSS with custom animations
- shadcn/ui components (Radix UI primitives)
- Wouter (lightweight routing)
- React Hook Form with Zod validation
- TanStack Query (data fetching and caching)
- Framer Motion (animations)

### Backend  
- Express.js with TypeScript
- PostgreSQL with Drizzle ORM
- RESTful API design
- Zod validation schemas
- Passport.js authentication ready
- WebSocket support for real-time features

### Development Tools
- TypeScript for type safety
- ESBuild for production bundling
- Cross-env for cross-platform compatibility
- Drizzle Kit for database migrations

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/chrisMac93/Ethos-Digital-website.git
cd Ethos-Digital-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components (shadcn/ui)
│   │   ├── pages/         # Page components  
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   └── index.css      # Global styles
│   └── index.html         # HTML entry point
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage interface
│   └── vite.ts           # Vite integration
├── shared/               # Shared schemas and types
├── attached_assets/      # Static assets
└── dist/                 # Production build output
```

## 🎨 Design Features

- **Hero Section**: Animated neural network background with floating data nodes
- **AI Advantage Section**: Hexagonal grid pattern with dynamic animations  
- **Services Showcase**: Clean presentation of digital marketing services
- **Contact Form**: Validated form with real-time feedback
- **Responsive Navigation**: Hamburger menu for all screen sizes
- **Dark Theme**: Professional dark theme with cyan accent colors
- **Smooth Animations**: Hardware-accelerated CSS animations and transitions

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel** (Recommended for full-stack)
- **Railway** (Full-stack with database)
- **Render** (Full-stack with PostgreSQL)
- **Netlify** (Frontend only - requires separate backend)

### Environment Variables
For production deployment, you'll need:

**Backend (.env in root):**
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `PORT` - Server port (defaults to 3000)

**Frontend (.env.local in root):**
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### CMS Setup
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL commands from the setup instructions to create tables
3. Add your environment variables
4. Access the CMS at `/admin` route

## 📧 Contact

For inquiries about Ethos Digital services, use the contact form on the website or reach out directly.

## 📄 License

This project is proprietary and confidential.

---

Built with ❤️ by Ethos Digital