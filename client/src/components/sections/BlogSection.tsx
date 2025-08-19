import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image_url?: string;
  published: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
}

export const BlogSection = () => {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await apiRequest('GET', '/api/public/blog');
      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleBlogClick = (post: BlogPost) => {
    const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setLocation(`/blog/${slug}`);
  };

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'seo', label: 'SEO' },
    { id: 'ai-marketing', label: 'AI Marketing' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'local-marketing', label: 'Local Marketing' },
    { id: 'content-marketing', label: 'Content Marketing' },
    { id: 'social-media', label: 'Social Media' },
    { id: 'video-marketing', label: 'Video Marketing' }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse text-white">Loading articles...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-black relative overflow-hidden">
      {/* Subtle Wave Pattern Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: 'rgba(168, 85, 247, 0.1)', stopOpacity: 0}} />
              <stop offset="50%" style={{stopColor: 'rgba(168, 85, 247, 0.3)', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: 'rgba(168, 85, 247, 0.1)', stopOpacity: 0}} />
            </linearGradient>
          </defs>
          <path d="M0,30 Q25,20 50,30 T100,30" stroke="url(#waveGradient)" fill="none" strokeWidth="1" className="wave-path wave-1" />
          <path d="M0,60 Q25,70 50,60 T100,60" stroke="url(#waveGradient)" fill="none" strokeWidth="1" className="wave-path wave-2" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Resources & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Insights</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-6">
            Stay updated with the latest digital marketing trends, tips, and strategies. 
            Our resources help businesses navigate the digital landscape effectively.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 px-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Blog Posts - Full Width Layout */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-0">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="relative bg-black/60 backdrop-blur-sm border-b border-gray-800/30 hover:bg-black/80 transition-all duration-500 group"
              >
                <div className="container mx-auto px-6 py-16">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}>
                    {/* Content */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="mb-4">
                        <span className="inline-block bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                          {post.category}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                        {post.title}
                      </h3>
                      
                      <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{estimateReadTime(post.content)}</span>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="flex items-center gap-1 bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => handleBlogClick(post)}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
                      >
                        Read Full Article
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Image */}
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500">
                        <img 
                          src={post.image_url || `https://picsum.photos/600/400?random=${index + 1}`}
                          alt={`${post.title} featured image`}
                          className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-purple-900/20 transition-all duration-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
                

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No articles found for the selected category.</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="text-center mt-20 px-6">
          <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl p-12 border border-purple-400/30 max-w-2xl mx-auto backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-8 text-lg">
              Get the latest digital marketing insights, tips, and strategies delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
              />
              <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .wave-path {
            stroke-dasharray: 10 5;
            stroke-dashoffset: 15;
            animation: waveFlow 12s ease-in-out infinite;
          }
          
          .wave-1 { animation-delay: 0s; }
          .wave-2 { animation-delay: -6s; }
          
          @keyframes waveFlow {
            0% { 
              stroke-dashoffset: 15;
              opacity: 0.3;
            }
            50% { 
              opacity: 0.8;
            }
            100% { 
              stroke-dashoffset: -15;
              opacity: 0.3;
            }
          }
        `
      }} />
    </section>
  );
};