import { NextResponse } from 'next/server';
import { BlogRepository } from '@/lib/repositories/blog';
import { clientEnv } from '@/config/env';

/**
 * Generate RSS feed for blog posts
 * Available at /feed.xml
 */
export async function GET() {
  try {
    const posts = await BlogRepository.getPublishedPosts({ limit: 50 });

    const rssItems = posts
      .map((post) => {
        const url = `${clientEnv.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;
        const pubDate = post.created_at ? new Date(post.created_at).toUTCString() : new Date().toUTCString();

        return `
          <item>
            <title><![CDATA[${post.title}]]></title>
            <description><![CDATA[${post.excerpt || ''}]]></description>
            <link>${url}</link>
            <guid isPermaLink="true">${url}</guid>
            <pubDate>${pubDate}</pubDate>
            ${post.author ? `<author>noreply@ethoshorizons.com (${post.author})</author>` : ''}
            ${post.category ? `<category><![CDATA[${post.category}]]></category>` : ''}
          </item>
        `.trim();
      })
      .join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ethos Horizons Blog</title>
    <description>Latest insights on digital marketing, SEO, PPC, and web development</description>
    <link>${clientEnv.NEXT_PUBLIC_SITE_URL}/blog</link>
    <language>en-US</language>
    <managingEditor>noreply@ethoshorizons.com (Ethos Horizons)</managingEditor>
    <webMaster>noreply@ethoshorizons.com (Ethos Horizons)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${clientEnv.NEXT_PUBLIC_SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
