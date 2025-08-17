import { z } from 'zod';

// Environment schema with strict validation
const envSchema = z.object({
  // Public environment variables (safe for client)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),
  NEXT_PUBLIC_SITE_URL: z.string().url('Invalid site URL').default('http://localhost:3000'),
  
  // Server-only environment variables (never exposed to client)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Supabase service role key is required'),
  REVALIDATION_SECRET: z.string().min(32, 'Revalidation secret must be at least 32 characters'),
  
  // Optional environment variables
  ANALYTICS_WRITE_KEY: z.string().optional(),
  UPSTASH_REDIS_URL: z.string().url().optional(),
  UPSTASH_REDIS_TOKEN: z.string().optional(),
  
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Server-only schema (includes sensitive keys)
const serverEnvSchema = envSchema;

// Client-only schema (only public vars)
const clientEnvSchema = envSchema.pick({
  NEXT_PUBLIC_SUPABASE_URL: true,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: true,
  NEXT_PUBLIC_SITE_URL: true,
  NODE_ENV: true,
});

// Validate server environment
function validateServerEnv() {
  try {
    return serverEnvSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`❌ Invalid environment configuration:\n${missingVars.join('\n')}`);
    }
    throw error;
  }
}

// Validate client environment (only public vars)
function validateClientEnv() {
  const clientEnv = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NODE_ENV: process.env.NODE_ENV,
  };

  try {
    return clientEnvSchema.parse(clientEnv);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`❌ Invalid client environment configuration:\n${missingVars.join('\n')}`);
    }
    throw error;
  }
}

// Export validated environments
export const serverEnv = validateServerEnv();
export const clientEnv = validateClientEnv();

// Type exports
export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;

// Utility to check if we're on server
export const isServer = typeof window === 'undefined';

// Fail-fast environment check
if (isServer) {
  // Server-side validation
  console.log('✅ Server environment validated');
} else {
  // Client-side validation (only public vars)
  console.log('✅ Client environment validated');
}
