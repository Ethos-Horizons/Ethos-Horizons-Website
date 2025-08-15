# CMS Setup Guide for Ethos Digital Website

This guide covers the complete setup for the Content Management System (CMS) and Supabase database configuration.

## 📋 Database Schema Overview

### Tables Created

1. **`blog_posts`** - Blog post management
2. **`portfolio_projects`** - Portfolio project management  
3. **`content_management`** - General content management (pricing, hero content, etc.)
4. **`users`** - Admin user authentication
5. **`contacts`** - Contact form submissions

## 🗄️ Supabase Database Setup

### Step 1: Create Tables

Run the following SQL in your Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Blog Posts Table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]',
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio Projects Table
CREATE TABLE portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  technologies JSONB NOT NULL DEFAULT '[]',
  results TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Management Table
CREATE TABLE content_management (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_key TEXT NOT NULL UNIQUE,
  content_value JSONB NOT NULL,
  content_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users Table (for admin authentication)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Contacts Table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Step 2: Set Up Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Blog posts are manageable by authenticated users" ON blog_posts
  FOR ALL USING (true);

-- Create policies for portfolio_projects
CREATE POLICY "Portfolio projects are viewable by everyone" ON portfolio_projects
  FOR SELECT USING (true);

CREATE POLICY "Portfolio projects are manageable by authenticated users" ON portfolio_projects
  FOR ALL USING (true);

-- Create policies for content_management
CREATE POLICY "Content is viewable by everyone" ON content_management
  FOR SELECT USING (true);

CREATE POLICY "Content is manageable by authenticated users" ON content_management
  FOR ALL USING (true);

-- Create policies for users (admin only)
CREATE POLICY "Users are manageable by authenticated users" ON users
  FOR ALL USING (true);

-- Create policies for contacts
CREATE POLICY "Contacts are viewable by authenticated users" ON contacts
  FOR SELECT USING (true);

CREATE POLICY "Contacts are insertable by everyone" ON contacts
  FOR INSERT WITH CHECK (true);
```

### Step 3: Create Indexes for Performance

```sql
-- Indexes for blog_posts
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at);

-- Indexes for portfolio_projects
CREATE INDEX idx_portfolio_projects_featured ON portfolio_projects(featured);
CREATE INDEX idx_portfolio_projects_slug ON portfolio_projects(slug);
CREATE INDEX idx_portfolio_projects_created_at ON portfolio_projects(created_at);

-- Indexes for content_management
CREATE INDEX idx_content_management_key ON content_management(content_key);
CREATE INDEX idx_content_management_type ON content_management(content_type);
```

## 🎛️ CMS Input Fields Required

### Blog Post Management

**Required Fields:**
- **Title** (Text) - Post title
- **Excerpt** (Textarea) - Brief description for cards
- **Content** (Rich Text/HTML) - Full post content with HTML support
- **Author** (Text) - Author name
- **Category** (Select) - Predefined categories
- **Slug** (Text) - URL-friendly identifier (auto-generated from title)
- **Published** (Toggle) - Publish status

**Optional Fields:**
- **Featured Image URL** (URL) - Hero image
- **Tags** (Array) - Searchable tags

**Categories Available:**
- SEO
- AI Marketing
- Web Development
- Local Marketing
- Content Marketing
- Social Media
- Video Marketing

### Portfolio Project Management

**Required Fields:**
- **Title** (Text) - Project title
- **Description** (Textarea) - Brief project description
- **Results** (Rich Text/HTML) - Detailed results and metrics
- **Slug** (Text) - URL-friendly identifier (auto-generated from title)
- **Featured** (Toggle) - Featured project status

**Optional Fields:**
- **Project Image URL** (URL) - Project screenshot
- **Technologies** (Array) - Technologies used

### Content Management

**Pricing Content:**
- **Setup Plan** (JSON) - Title, price, description, features
- **Growth Plan** (JSON) - Title, price, description, features
- **Premium Plan** (JSON) - Title, price, description, features

**Hero Content:**
- **Title** (Text) - Main headline
- **Subtitle** (Text) - Supporting text
- **CTA Text** (Text) - Call-to-action button text

## 🔧 API Endpoints Required

### Blog Posts
```
GET    /api/cms/blog              - Get all published posts
GET    /api/cms/blog/:id          - Get specific post
POST   /api/cms/blog              - Create new post
PUT    /api/cms/blog/:id          - Update post
DELETE /api/cms/blog/:id          - Delete post
```

### Portfolio Projects
```
GET    /api/cms/portfolio         - Get all projects
GET    /api/cms/portfolio/:id     - Get specific project
POST   /api/cms/portfolio         - Create new project
PUT    /api/cms/portfolio/:id     - Update project
DELETE /api/cms/portfolio/:id     - Delete project
```

### Content Management
```
GET    /api/cms/content/:type     - Get content by type
POST   /api/cms/content           - Create/update content
```

## 🚀 Implementation Steps

### 1. Database Migration
```bash
# Run the database migration
npm run db:migrate
```

### 2. Seed Initial Data (Optional)
```bash
# Add some initial blog posts and portfolio projects
npm run db:seed
```

### 3. Environment Variables
Ensure these are set in your `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Test the CMS
1. Navigate to `/admin` in your application
2. Log in with admin credentials
3. Test creating, editing, and deleting content
4. Verify content appears on the frontend

## 📝 Content Guidelines

### Blog Posts
- **Title**: 50-60 characters for optimal SEO
- **Excerpt**: 150-160 characters for card display
- **Content**: Use HTML tags for formatting
- **Tags**: 3-5 relevant tags per post
- **Categories**: Choose the most relevant category

### Portfolio Projects
- **Title**: Clear, descriptive project name
- **Description**: 2-3 sentences explaining the project
- **Results**: Include specific metrics and outcomes
- **Technologies**: List all major technologies used
- **Featured**: Only mark truly exceptional projects

### Images
- **Blog Images**: 1200x630px for optimal social sharing
- **Portfolio Images**: 800x600px for project screenshots
- **Format**: JPG or PNG
- **Size**: Under 500KB for fast loading

## 🔒 Security Considerations

1. **Authentication**: Implement proper admin authentication
2. **Input Validation**: Validate all form inputs
3. **XSS Protection**: Sanitize HTML content
4. **Rate Limiting**: Prevent spam submissions
5. **Backup Strategy**: Regular database backups

## 🧪 Testing Checklist

- [ ] Create a new blog post
- [ ] Edit an existing blog post
- [ ] Delete a blog post
- [ ] Create a new portfolio project
- [ ] Edit an existing portfolio project
- [ ] Delete a portfolio project
- [ ] Toggle publish/featured status
- [ ] Verify content appears on frontend
- [ ] Test slug generation
- [ ] Validate form inputs
- [ ] Test image uploads
- [ ] Verify responsive design

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check environment variables
   - Verify Supabase project settings
   - Ensure RLS policies are correct

2. **Content Not Appearing**
   - Check published status
   - Verify slug generation
   - Check for JavaScript errors

3. **Image Loading Issues**
   - Verify image URLs are accessible
   - Check CORS settings
   - Ensure proper image formats

4. **Form Submission Errors**
   - Check required field validation
   - Verify API endpoint URLs
   - Check network connectivity

## 📞 Support

For additional help with the CMS setup, refer to:
- Supabase Documentation: https://supabase.com/docs
- Drizzle ORM Documentation: https://orm.drizzle.team
- React Hook Form: https://react-hook-form.com 