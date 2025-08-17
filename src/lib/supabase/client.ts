import { createBrowserClient } from '@supabase/ssr';
import { clientEnv } from '@/config/env';
import type { Database } from '@/types/supabase';

/**
 * Creates a browser Supabase client for Client Components
 * Handles authentication state and session management
 */
export function createClientSupabaseClient() {
  return createBrowserClient<Database>(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// Export a singleton instance for client-side usage
export const supabase = createClientSupabaseClient();

/**
 * Auth utilities for client-side usage
 */
export const auth = {
  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  /**
   * Sign out current user
   */
  async signOut() {
    return await supabase.auth.signOut();
  },

  /**
   * Get current session
   */
  async getSession() {
    return await supabase.auth.getSession();
  },

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};

/**
 * Real-time utilities
 */
export const realtime = {
  /**
   * Subscribe to table changes
   */
  subscribeToTable(
    table: string,
    callback: (payload: any) => void,
    filter?: { column: string; value: string }
  ) {
    let channel = supabase.channel(`${table}_changes`);
    
    if (filter) {
      channel = channel.on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table,
          filter: `${filter.column}=eq.${filter.value}`,
        },
        callback
      );
    } else {
      channel = channel.on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table,
        },
        callback
      );
    }

    return channel.subscribe();
  },
};
