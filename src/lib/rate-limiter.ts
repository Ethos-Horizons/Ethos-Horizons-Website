import { NextRequest } from 'next/server';
import { serverEnv } from '@/config/env';

// In-memory store for development (use Redis in production)
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
  keyGenerator?: (request: NextRequest) => string;
}

/**
 * Rate limiter for API routes
 * Use Redis in production, in-memory for development
 */
export class RateLimiter {
  private options: RateLimitOptions;

  constructor(options: RateLimitOptions) {
    this.options = options;
  }

  private getKey(request: NextRequest): string {
    if (this.options.keyGenerator) {
      return this.options.keyGenerator(request);
    }
    
    // Default: use IP address
    const ip = request.ip || 
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'anonymous';
    
    return `rate_limit:${ip}`;
  }

  async check(request: NextRequest): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    resetTime: number;
  }> {
    const key = this.getKey(request);
    const now = Date.now();
    const windowMs = this.options.windowMs;
    const maxRequests = this.options.maxRequests;

    // Try Redis first if available in production
    if (serverEnv.UPSTASH_REDIS_URL && serverEnv.UPSTASH_REDIS_TOKEN) {
      return this.checkRedis(key, now, windowMs, maxRequests);
    }

    // Fallback to in-memory store
    return this.checkMemory(key, now, windowMs, maxRequests);
  }

  private async checkRedis(
    key: string, 
    now: number, 
    windowMs: number, 
    maxRequests: number
  ): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    resetTime: number;
  }> {
    try {
      // Use Redis with sliding window
      const redis = await import('@upstash/redis').then(m => m.Redis.fromEnv());
      
      const resetTime = now + windowMs;
      const current = await redis.incr(key);
      
      if (current === 1) {
        await redis.expire(key, Math.ceil(windowMs / 1000));
      }

      const remaining = Math.max(0, maxRequests - current);
      const success = current <= maxRequests;

      return {
        success,
        limit: maxRequests,
        remaining,
        resetTime,
      };
    } catch (error) {
      console.warn('Redis rate limiting failed, falling back to memory:', error);
      return this.checkMemory(key, now, windowMs, maxRequests);
    }
  }

  private checkMemory(
    key: string, 
    now: number, 
    windowMs: number, 
    maxRequests: number
  ): {
    success: boolean;
    limit: number;
    remaining: number;
    resetTime: number;
  } {
    const resetTime = now + windowMs;

    if (!store[key] || store[key].resetTime < now) {
      store[key] = {
        count: 1,
        resetTime,
      };
    } else {
      store[key].count++;
    }

    const remaining = Math.max(0, maxRequests - store[key].count);
    const success = store[key].count <= maxRequests;

    return {
      success,
      limit: maxRequests,
      remaining,
      resetTime: store[key].resetTime,
    };
  }
}

// Pre-configured rate limiters
export const contactFormLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 60 * 1000, // 5 requests per minute
});

export const adminApiLimiter = new RateLimiter({
  maxRequests: 60,
  windowMs: 60 * 1000, // 60 requests per minute
  keyGenerator: (request) => {
    // Rate limit by user ID for authenticated requests
    const userId = request.headers.get('x-user-id') || 'anonymous';
    return `admin_rate_limit:${userId}`;
  },
});

export const generalApiLimiter = new RateLimiter({
  maxRequests: 100,
  windowMs: 60 * 1000, // 100 requests per minute
});
