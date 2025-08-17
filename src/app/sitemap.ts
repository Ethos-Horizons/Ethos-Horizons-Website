import { MetadataRoute } from 'next';
import { BlogRepository } from '@/lib/repositories/blog';
import { PortfolioRepository } from '@/lib/repositories/portfolio';
import { clientEnv } from '@/config/env';

/**
 * Generate dynamic sitemap for Next.js
 * Available at /sitemap.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = clientEnv.NEXT_PUBLIC_SITE_URL;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  try {
    // Dynamic blog pages
    const posts = await BlogRepository.getPublishedPosts();
    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.created_at || new Date()),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    // Dynamic portfolio pages
    const portfolioItems = await PortfolioRepository.getPublicPortfolioItems();
    const portfolioPages: MetadataRoute.Sitemap = portfolioItems.map((item) => ({
      url: `${baseUrl}/portfolio/${item.slug}`,
      lastModified: new Date(item.updated_at || item.created_at || new Date()),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [...staticPages, ...blogPages, ...portfolioPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages only if dynamic content fails
    return staticPages;
  }
}
