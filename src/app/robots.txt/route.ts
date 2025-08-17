import { NextResponse } from 'next/server';
import { clientEnv } from '@/config/env';

/**
 * Generate robots.txt dynamically
 * Available at /robots.txt
 */
export function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Disallow private files
Disallow: /_next/
Disallow: /static/

# Allow specific API routes that should be crawled
Allow: /api/og

# Sitemap
Sitemap: ${clientEnv.NEXT_PUBLIC_SITE_URL}/sitemap.xml

# RSS Feed
Sitemap: ${clientEnv.NEXT_PUBLIC_SITE_URL}/feed.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400',
    },
  });
}
