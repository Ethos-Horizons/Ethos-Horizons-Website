import { Router } from 'express';
import { supabase } from '../lib/supabase';
import { authenticateAdmin, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Apply authentication to all CMS routes
router.use(authenticateAdmin);

// ===== CONTENT MANAGEMENT =====

// Get all content by type
router.get('/content/:type', async (req: AuthenticatedRequest, res) => {
  try {
    const { type } = req.params;
    
    const { data, error } = await supabase
      .from('cms_content')
      .select('*')
      .eq('content_type', type);

    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Update content
router.put('/content/:type/:key', async (req: AuthenticatedRequest, res) => {
  try {
    const { type, key } = req.params;
    const { content_value } = req.body;
    
    // First try to update existing record
    let { data, error } = await supabase
      .from('cms_content')
      .update({
        content_value,
        updated_by: req.user!.id,
        updated_at: new Date().toISOString()
      })
      .eq('content_type', type)
      .eq('content_key', key)
      .select()
      .single();

    // If no record was updated, insert a new one
    if (!data || error) {
      const { data: insertData, error: insertError } = await supabase
        .from('cms_content')
        .insert({
          content_type: type,
          content_key: key,
          content_value,
          updated_by: req.user!.id,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (insertError) throw insertError;
      data = insertData;
    }

    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error updating content:', error);
    console.error('Request params:', { type: req.params.type, key: req.params.key });
    console.error('Request body:', req.body);
    res.status(500).json({ error: 'Failed to update content', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// ===== BLOG POSTS =====

// Get all blog posts
router.get('/blog', async (req: AuthenticatedRequest, res) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Create blog post
router.post('/blog', async (req: AuthenticatedRequest, res) => {
  try {
    const { title, excerpt, content, category, author, image_url, tags, published, slug } = req.body;
    
    console.log('Creating blog post with data:', { title, excerpt, content, category, author, image_url, tags, published, slug });
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title,
        excerpt,
        content,
        category,
        author,
        image_url,
        tags,
        published,
        slug,
        created_by: req.user!.id
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Blog post created successfully:', data);
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Update blog post
router.put('/blog/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, category, author, image_url, tags, published, slug } = req.body;
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        title,
        excerpt,
        content,
        category,
        author,
        image_url,
        tags,
        published,
        slug,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// Delete blog post
router.delete('/blog/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// ===== PORTFOLIO ITEMS =====

// Get all portfolio items
router.get('/portfolio', async (req: AuthenticatedRequest, res) => {
  try {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Transform the data to match frontend expectations
    const transformedData = data.map(item => ({
      ...item,
      imageUrl: item.image_url,
      visitSiteUrl: item.visit_site_url,
      socialMediaLinks: item.social_media_links,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }));
    
    res.json(transformedData);
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio items' });
  }
});

// Create portfolio item
router.post('/portfolio', async (req: AuthenticatedRequest, res) => {
  try {
    const { 
      title, 
      description, 
      imageUrl, 
      image_url, 
      images, 
      technologies, 
      results, 
      journey, 
      visitSiteUrl, 
      socialMediaLinks, 
      featured, 
      slug 
    } = req.body;
    
    const { data, error } = await supabase
      .from('portfolio_items')
      .insert({
        title,
        description,
        image_url: imageUrl || image_url,
        images,
        technologies,
        results,
        journey,
        visit_site_url: visitSiteUrl,
        social_media_links: socialMediaLinks,
        featured,
        slug
      })
      .select()
      .single();

    if (error) throw error;
    
    // Transform the data to match frontend expectations
    const transformedData = {
      ...data,
      imageUrl: data.image_url,
      visitSiteUrl: data.visit_site_url,
      socialMediaLinks: data.social_media_links,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
    
    res.status(201).json(transformedData);
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    res.status(500).json({ error: 'Failed to create portfolio item' });
  }
});

// Update portfolio item
router.put('/portfolio/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      imageUrl, 
      image_url, 
      images, 
      technologies, 
      results, 
      journey, 
      visitSiteUrl, 
      socialMediaLinks, 
      featured, 
      slug 
    } = req.body;
    
    const { data, error } = await supabase
      .from('portfolio_items')
      .update({
        title,
        description,
        image_url: imageUrl || image_url,
        images,
        technologies,
        results,
        journey,
        visit_site_url: visitSiteUrl,
        social_media_links: socialMediaLinks,
        featured,
        slug,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    // Transform the data to match frontend expectations
    const transformedData = {
      ...data,
      imageUrl: data.image_url,
      visitSiteUrl: data.visit_site_url,
      socialMediaLinks: data.social_media_links,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
    
    res.json(transformedData);
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    res.status(500).json({ error: 'Failed to update portfolio item' });
  }
});

// Delete portfolio item
router.delete('/portfolio/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    res.status(500).json({ error: 'Failed to delete portfolio item' });
  }
});



export default router; 