import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { serverEnv } from '@/config/env';
import { generalApiLimiter } from '@/lib/rate-limiter';

interface RevalidateRequestBody {
  type: 'post.published' | 'post.unpublished' | 'project.published' | 'project.unpublished';
  slug: string;
  secret?: string;
}

/**
 * ISR Revalidation webhook endpoint
 * Called by Supabase triggers or n8n workflows when content is published/unpublished
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await generalApiLimiter.check(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          }
        }
      );
    }

    // Verify authorization
    const authHeader = request.headers.get('authorization');
    const providedSecret = authHeader?.replace('Bearer ', '');

    if (!providedSecret || providedSecret !== serverEnv.REVALIDATION_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    let body: RevalidateRequestBody;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const { type, slug } = body;

    if (!type || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields: type, slug' },
        { status: 400 }
      );
    }

    // Revalidate paths based on content type
    const pathsToRevalidate: string[] = [];

    switch (type) {
      case 'post.published':
      case 'post.unpublished':
        pathsToRevalidate.push(
          '/blog',
          `/blog/${slug}`,
          '/blog/sitemap.xml',
          '/sitemap.xml'
        );
        break;

      case 'project.published':
      case 'project.unpublished':
        pathsToRevalidate.push(
          '/portfolio',
          `/portfolio/${slug}`,
          '/portfolio/sitemap.xml',
          '/sitemap.xml'
        );
        break;

      default:
        return NextResponse.json(
          { error: `Unknown revalidation type: ${type}` },
          { status: 400 }
        );
    }

    // Perform revalidation
    const results = await Promise.allSettled(
      pathsToRevalidate.map(async (path) => {
        try {
          revalidatePath(path);
          return { path, success: true };
        } catch (error) {
          console.error(`Failed to revalidate ${path}:`, error);
          return { path, success: false, error: error instanceof Error ? error.message : 'Unknown error' };
        }
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
    const failed = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success));

    console.log(`Revalidation completed for ${type}:${slug}`, {
      successful: successful.length,
      failed: failed.length,
      paths: pathsToRevalidate,
    });

    return NextResponse.json({
      success: true,
      type,
      slug,
      revalidated: pathsToRevalidate,
      results: {
        successful: successful.length,
        failed: failed.length,
      },
    });

  } catch (error) {
    console.error('Revalidation webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
