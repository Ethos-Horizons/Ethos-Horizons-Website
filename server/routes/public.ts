import { Router } from 'express';
import { supabasePublic } from '../lib/supabase';

const router = Router();

// ===== PUBLIC BLOG ROUTES =====

// Get all published blog posts (public access)
router.get('/blog', async (req, res) => {
  try {
    const { data, error } = await supabasePublic
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id(display_name, avatar_url)
      `)
      .eq('status', 'published')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Transform the data to match frontend expectations
    const transformedData = data.map(post => ({
      ...post,
      tags: post.tags || [], // Ensure tags is always an array
      author: post.profiles?.display_name || post.author || 'Ethos Horizons Team'
    }));
    
    res.json(transformedData);
  } catch (error) {
    console.error('Error fetching published blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Get published blog post by slug (public access)
router.get('/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const { data, error } = await supabasePublic
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id(display_name, avatar_url)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .eq('published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      throw error;
    }
    
    // Transform the data to match frontend expectations
    const transformedData = {
      ...data,
      tags: data.tags || [],
      author: data.profiles?.display_name || data.author || 'Ethos Horizons Team'
    };
    
    res.json(transformedData);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// ===== PUBLIC PORTFOLIO ROUTES =====

// Get all portfolio items (public access)
router.get('/portfolio', async (req, res) => {
  try {
    const { data, error } = await supabasePublic
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Transform the data to match frontend expectations
    const transformedData = data.map(item => ({
      ...item,
      imageUrl: item.image_url,
      visitSiteUrl: item.visit_site_url,
      socialMediaLinks: item.social_media_links || [],
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      technologies: item.technologies || []
    }));
    
    res.json(transformedData);
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio items' });
  }
});

// Get portfolio item by slug (public access)
router.get('/portfolio/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const { data, error } = await supabasePublic
      .from('portfolio_items')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Portfolio item not found' });
      }
      throw error;
    }
    
    // Transform the data to match frontend expectations
    const transformedData = {
      ...data,
      imageUrl: data.image_url,
      visitSiteUrl: data.visit_site_url,
      socialMediaLinks: data.social_media_links || [],
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      technologies: data.technologies || []
    };
    
    res.json(transformedData);
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio item' });
  }
});

export default router;
