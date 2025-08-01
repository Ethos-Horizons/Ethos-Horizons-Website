# CMS Setup Guide

## 🚀 Quick Start

### 1. Environment Variables Setup

**Create `.env` file in the root directory:**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PORT=3000
```

**Create `.env.local` file in the root directory:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Supabase Google OAuth Setup

1. Go to your Supabase Dashboard → **Authentication** → **Providers**
2. Enable **Google** provider
3. Add your Google OAuth credentials:
   - **Client ID**: Your Google OAuth client ID
   - **Client Secret**: Your Google OAuth client secret
4. Set **Redirect URL** to: `https://your-project.supabase.co/auth/v1/callback`
5. Go to **Authentication** → **Users**
6. Click **Add User** and add your Google email address
7. Use the same email you used in the SQL setup

### 3. Test the CMS

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000/admin`
3. Click "Sign in with Google" and authenticate with your Google account
4. You should see the CMS dashboard with tabs

## 📋 What's Working Now

✅ **Backend API Routes:**
- Content management (pricing, hero content)
- Blog posts CRUD
- Portfolio items CRUD  
- Chatbot responses CRUD
- Authentication middleware

✅ **Frontend CMS:**
- Login system with Supabase auth
- Tabbed dashboard interface
- Content manager (pricing & hero content)
- Placeholder components for blog, portfolio, chatbot

## 🔧 Next Steps

### Phase 1: Complete Content Manager
- [ ] Test pricing content updates
- [ ] Test hero content updates
- [ ] Add more content types (services, about, etc.)

### Phase 2: Blog Management
- [ ] Implement blog post creation form
- [ ] Add rich text editor
- [ ] Image upload functionality
- [ ] Blog post listing and editing

### Phase 3: Portfolio Management
- [ ] Portfolio item creation form
- [ ] Image upload for portfolio items
- [ ] Portfolio item listing and editing

### Phase 4: Chatbot Integration
- [ ] Gemini API integration
- [ ] Response caching system
- [ ] Chatbot response management interface

## 🐛 Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check that your `.env` and `.env.local` files exist
   - Verify the variable names match exactly
   - Restart the development server after adding variables

2. **"Not authorized as admin"**
   - Make sure your email exists in the `admin_users` table
   - Check that you're using the correct Supabase credentials
   - Verify the user was created in Supabase Authentication

3. **"Failed to fetch content"**
   - Check your Supabase URL and keys
   - Verify the database tables were created successfully
   - Check the browser console for detailed error messages

## 📞 Support

If you encounter any issues, check:
1. Browser console for frontend errors
2. Terminal for backend errors
3. Supabase dashboard for database issues
4. Network tab for API request failures

---

**Ready to test?** Start with `npm run dev` and visit `/admin`! 🎉 