import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Environment variables loaded

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables for frontend');
  console.error('Make sure .env.local exists in the root directory with:');
  console.error('VITE_SUPABASE_URL=your-supabase-url');
  console.error('VITE_SUPABASE_ANON_KEY=your-supabase-anon-key');
  throw new Error('Missing Supabase environment variables for frontend');
}

export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey); 