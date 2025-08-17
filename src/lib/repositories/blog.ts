import { createServerSupabaseClient, createServerAdminClient } from '@/lib/supabase/server';
import type { BlogPost, BlogPostInsert, BlogPostUpdate } from '@/types/supabase';

/**
 * Blog repository for data access
 * Handles published content for public access and draft content for authenticated users
 */
export class BlogRepository {
  /**
   * Get all published blog posts for public consumption
   * Used in ISR pages - only returns published content
   */
  static async getPublishedPosts(options?: {
    limit?: number;
    offset?: number;
    category?: string;
    featured?: boolean;
  }) {
    const supabase = createServerSupabaseClient();
    
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id(display_name, avatar_url),
        post_tags(
          tags(name, slug)
        )
      `)
      .eq('status', 'published')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (options?.category) {
      query = query.eq('category', options.category);
    }

    if (options?.featured !== undefined) {
      query = query.eq('featured', options.featured);
    }

    if (options?.limit) {
      const start = options.offset || 0;
      query = query.range(start, start + options.limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch published posts: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get published post by slug for public consumption
   * Used in ISR post pages
   */
  static async getPublishedPostBySlug(slug: string) {
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id(display_name, avatar_url),
        post_tags(
          tags(name, slug)
        )
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .eq('published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw new Error(`Failed to fetch published post: ${error.message}`);
    }

    return data;
  }

  /**
   * Get post by slug for preview (includes drafts)
   * Requires authentication - used in admin preview
   */
  static async getPostBySlugForPreview(slug: string) {
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id(display_name, avatar_url),
        post_tags(
          tags(name, slug)
        )
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch post for preview: ${error.message}`);
    }

    return data;
  }

  /**
   * Get all posts for admin (includes drafts)
   * Respects RLS - users only see posts they can edit
   */
  static async getAllPosts(options?: {
    limit?: number;
    offset?: number;
    status?: string;
    authorId?: string;
  }) {
    const supabase = createServerSupabaseClient();
    
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id(display_name, avatar_url),
        post_tags(
          tags(name, slug)
        )
      `)
      .order('updated_at', { ascending: false });

    if (options?.status) {
      query = query.eq('status', options.status);
    }

    if (options?.authorId) {
      query = query.eq('author_id', options.authorId);
    }

    if (options?.limit) {
      const start = options.offset || 0;
      query = query.range(start, start + options.limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Create new blog post
   * RLS ensures user can only create posts they're allowed to
   */
  static async createPost(post: BlogPostInsert) {
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }

    return data;
  }

  /**
   * Update blog post
   * RLS ensures user can only update posts they have permission for
   */
  static async updatePost(id: string, updates: BlogPostUpdate) {
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update post: ${error.message}`);
    }

    return data;
  }

  /**
   * Delete blog post
   * RLS ensures user can only delete posts they have permission for
   */
  static async deletePost(id: string) {
    const supabase = createServerSupabaseClient();
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }

    return true;
  }

  /**
   * Get all published post slugs for static generation
   * Uses admin client to bypass RLS for build-time static generation
   */
  static async getPublishedSlugs() {
    const supabase = createServerAdminClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('status', 'published')
      .eq('published', true)
      .not('slug', 'is', null);

    if (error) {
      throw new Error(`Failed to fetch published slugs: ${error.message}`);
    }

    return data?.map(post => post.slug).filter(Boolean) || [];
  }

  /**
   * Generate unique slug from title
   */
  static async generateUniqueSlug(title: string, excludeId?: string) {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const supabase = createServerSupabaseClient();
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      let query = supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', slug);

      if (excludeId) {
        query = query.neq('id', excludeId);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Failed to check slug uniqueness: ${error.message}`);
      }

      if (!data || data.length === 0) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }
}
