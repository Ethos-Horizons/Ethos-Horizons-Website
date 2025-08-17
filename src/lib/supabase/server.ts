import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { serverEnv } from '@/config/env';
import type { Database } from '@/types/supabase';

/**
 * Creates a request-scoped Supabase client for Server Components and API routes
 * Handles authentication via cookies automatically
 */
export function createServerSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    serverEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

/**
 * Creates a service role client for admin operations
 * WARNING: This bypasses RLS and should only be used server-side
 * Never export this to client code!
 */
export function createServerAdminClient() {
  return createServerClient<Database>(
    serverEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // No-op for service role client
        },
      },
    }
  );
}

/**
 * Utility to get the current user from server context
 */
export async function getCurrentUser() {
  const supabase = createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }

  return user;
}

/**
 * Utility to get user profile with role information
 */
export async function getUserProfile(userId: string) {
  const supabase = createServerSupabaseClient();
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !profile) {
    return null;
  }

  return profile;
}

/**
 * Check if user has required role
 */
export async function hasRole(requiredRole: 'author' | 'editor' | 'admin', userId?: string) {
  if (!userId) {
    const user = await getCurrentUser();
    if (!user) return false;
    userId = user.id;
  }

  const profile = await getUserProfile(userId);
  if (!profile) return false;

  const roleHierarchy = { author: 1, editor: 2, admin: 3 };
  const userRoleLevel = roleHierarchy[profile.role as keyof typeof roleHierarchy] || 0;
  const requiredRoleLevel = roleHierarchy[requiredRole];

  return userRoleLevel >= requiredRoleLevel;
}
