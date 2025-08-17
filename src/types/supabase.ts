export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          email: string
          name: string
          role: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          excerpt: string | null
          content: string | null
          category: string | null
          author: string | null
          image_url: string | null
          published: boolean | null
          created_at: string | null
          updated_at: string | null
          author_id: string | null
          slug: string | null
          featured: boolean | null
          meta_title: string | null
          meta_description: string | null
          status: string | null
          read_time: number | null
        }
        Insert: {
          id?: string
          title: string
          excerpt?: string | null
          content?: string | null
          category?: string | null
          author?: string | null
          image_url?: string | null
          published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          author_id?: string | null
          slug?: string | null
          featured?: boolean | null
          meta_title?: string | null
          meta_description?: string | null
          status?: string | null
          read_time?: number | null
        }
        Update: {
          id?: string
          title?: string
          excerpt?: string | null
          content?: string | null
          category?: string | null
          author?: string | null
          image_url?: string | null
          published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          author_id?: string | null
          slug?: string | null
          featured?: boolean | null
          meta_title?: string | null
          meta_description?: string | null
          status?: string | null
          read_time?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      content_management: {
        Row: {
          id: string
          content_key: string
          content_value: Json
          content_type: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          content_key: string
          content_value: Json
          content_type: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          content_key?: string
          content_value?: Json
          content_type?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          technologies: string[] | null
          results: string | null
          featured: boolean | null
          created_at: string | null
          updated_at: string | null
          slug: string | null
          images: Json | null
          journey: string | null
          visit_site_url: string | null
          social_media_links: Json | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          technologies?: string[] | null
          results?: string | null
          featured?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          slug?: string | null
          images?: Json | null
          journey?: string | null
          visit_site_url?: string | null
          social_media_links?: Json | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          technologies?: string[] | null
          results?: string | null
          featured?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          slug?: string | null
          images?: Json | null
          journey?: string | null
          visit_site_url?: string | null
          social_media_links?: Json | null
        }
        Relationships: []
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: number
        }
        Insert: {
          post_id: string
          tag_id: number
        }
        Update: {
          post_id?: string
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          display_name: string
          avatar_url: string | null
          role: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          display_name: string
          avatar_url?: string | null
          role?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          display_name?: string
          avatar_url?: string | null
          role?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          id: number
          name: string
          slug: string
          created_at: string | null
        }
        Insert: {
          name: string
          slug: string
          created_at?: string | null
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          created_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenience type exports
export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update'];

export type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];
export type PortfolioItemInsert = Database['public']['Tables']['portfolio_items']['Insert'];
export type PortfolioItemUpdate = Database['public']['Tables']['portfolio_items']['Update'];

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type Tag = Database['public']['Tables']['tags']['Row'];
export type TagInsert = Database['public']['Tables']['tags']['Insert'];
export type TagUpdate = Database['public']['Tables']['tags']['Update'];

export type ContentManagement = Database['public']['Tables']['content_management']['Row'];
export type ContentManagementInsert = Database['public']['Tables']['content_management']['Insert'];
export type ContentManagementUpdate = Database['public']['Tables']['content_management']['Update'];

// Auth user role types
export type UserRole = 'author' | 'editor' | 'admin';

// Post status types
export type PostStatus = 'draft' | 'published' | 'archived';
