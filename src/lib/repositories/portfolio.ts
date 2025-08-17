import { createServerSupabaseClient, createServerAdminClient } from '@/lib/supabase/server';
import type { PortfolioItem, PortfolioItemInsert, PortfolioItemUpdate } from '@/types/supabase';

/**
 * Portfolio repository for data access
 * Handles portfolio items with proper security and permissions
 */
export class PortfolioRepository {
  /**
   * Get all portfolio items for public consumption
   * Used in ISR pages
   */
  static async getPublicPortfolioItems(options?: {
    limit?: number;
    offset?: number;
    featured?: boolean;
  }) {
    const supabase = createServerSupabaseClient();
    
    let query = supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (options?.featured !== undefined) {
      query = query.eq('featured', options.featured);
    }

    if (options?.limit) {
      const start = options.offset || 0;
      query = query.range(start, start + options.limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch portfolio items: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get portfolio item by slug for public consumption
   * Used in ISR portfolio pages
   */
  static async getPortfolioItemBySlug(slug: string) {
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw new Error(`Failed to fetch portfolio item: ${error.message}`);
    }

    return data;
  }

  /**
   * Get all portfolio items for admin
   */
  static async getAllPortfolioItems(options?: {
    limit?: number;
    offset?: number;
  }) {
    const supabase = createServerSupabaseClient();
    
    let query = supabase
      .from('portfolio_items')
      .select('*')
      .order('updated_at', { ascending: false });

    if (options?.limit) {
      const start = options.offset || 0;
      query = query.range(start, start + options.limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch portfolio items: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Create new portfolio item
   */
  static async createPortfolioItem(item: PortfolioItemInsert) {
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from('portfolio_items')
      .insert(item)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create portfolio item: ${error.message}`);
    }

    return data;
  }

  /**
   * Update portfolio item
   */
  static async updatePortfolioItem(id: string, updates: PortfolioItemUpdate) {
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from('portfolio_items')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update portfolio item: ${error.message}`);
    }

    return data;
  }

  /**
   * Delete portfolio item
   */
  static async deletePortfolioItem(id: string) {
    const supabase = createServerSupabaseClient();
    
    const { error } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete portfolio item: ${error.message}`);
    }

    return true;
  }

  /**
   * Get all portfolio slugs for static generation
   */
  static async getPortfolioSlugs() {
    const supabase = createServerAdminClient();
    
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('slug')
      .not('slug', 'is', null);

    if (error) {
      throw new Error(`Failed to fetch portfolio slugs: ${error.message}`);
    }

    return data?.map(item => item.slug).filter(Boolean) || [];
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
        .from('portfolio_items')
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
