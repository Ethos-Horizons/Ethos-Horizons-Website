import type { Metadata } from 'next';
import { clientEnv } from '@/config/env';
import type { BlogPost, PortfolioItem } from '@/types/supabase';

interface SEOData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

const defaultSEO = {
  siteName: 'Ethos Horizons',
  description: 'Digital marketing agency specializing in SEO, PPC, web development, and content marketing.',
  image: '/images/og-default.jpg',
  twitterHandle: '@ethoshorizons',
};

/**
 * Generate metadata for Next.js pages
 */
export function generateMetadata(data: SEOData): Metadata {
  const url = data.url ? `${clientEnv.NEXT_PUBLIC_SITE_URL}${data.url}` : clientEnv.NEXT_PUBLIC_SITE_URL;
  const image = data.image ? (data.image.startsWith('http') ? data.image : `${clientEnv.NEXT_PUBLIC_SITE_URL}${data.image}`) : `${clientEnv.NEXT_PUBLIC_SITE_URL}${defaultSEO.image}`;

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      url,
      siteName: defaultSEO.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      locale: 'en_US',
      type: data.type || 'website',
      ...(data.publishedTime && { publishedTime: data.publishedTime }),
      ...(data.modifiedTime && { modifiedTime: data.modifiedTime }),
      ...(data.author && data.type === 'article' && { authors: [data.author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [image],
      creator: defaultSEO.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
    ...(data.tags && { keywords: data.tags.join(', ') }),
  };
}

/**
 * Generate SEO metadata for blog posts
 */
export function generateBlogPostMetadata(post: BlogPost): Metadata {
  return generateMetadata({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || '',
    image: post.image_url,
    url: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.created_at || undefined,
    modifiedTime: post.updated_at || undefined,
    author: post.author || undefined,
  });
}

/**
 * Generate SEO metadata for portfolio items
 */
export function generatePortfolioItemMetadata(item: PortfolioItem): Metadata {
  return generateMetadata({
    title: item.title,
    description: item.description || '',
    image: item.image_url,
    url: `/portfolio/${item.slug}`,
    type: 'website',
  });
}

/**
 * Generate structured data for blog posts
 */
export function generateBlogPostStructuredData(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image_url ? (post.image_url.startsWith('http') ? post.image_url : `${clientEnv.NEXT_PUBLIC_SITE_URL}${post.image_url}`) : undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: post.author || 'Ethos Horizons',
    },
    publisher: {
      '@type': 'Organization',
      name: defaultSEO.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${clientEnv.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${clientEnv.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    },
  };
}

/**
 * Generate structured data for organization
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: defaultSEO.siteName,
    url: clientEnv.NEXT_PUBLIC_SITE_URL,
    logo: `${clientEnv.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
    description: defaultSEO.description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-0123', // Update with actual phone
      contactType: 'customer service',
    },
    sameAs: [
      'https://twitter.com/ethoshorizons',
      'https://linkedin.com/company/ethoshorizons',
      // Add other social media profiles
    ],
  };
}

/**
 * Calculate estimated reading time
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
