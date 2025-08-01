import { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, BookOpen, Video, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "5 Essential SEO Strategies for Local Businesses in 2024",
      excerpt: "Discover the most effective SEO techniques that local businesses can implement to improve their search rankings and attract more customers.",
      category: "seo",
      author: "Ethos Digital Team",
      date: "January 15, 2024",
      readTime: "8 min read",
      image: "https://picsum.photos/400/250?random=4",
      tags: ["Local SEO", "Google Business Profile", "Keyword Research"],
      featured: true
    },
    {
      id: 2,
      title: "How AI is Revolutionizing Digital Marketing for Small Businesses",
      excerpt: "Explore how artificial intelligence is making digital marketing more accessible and effective for businesses of all sizes.",
      category: "ai-marketing",
      author: "Ethos Digital Team",
      date: "January 10, 2024",
      readTime: "12 min read",
      image: "https://picsum.photos/400/250?random=5",
      tags: ["AI Marketing", "Automation", "Small Business"],
      featured: false
    },
    {
      id: 3,
      title: "Building a Successful Podcast Website: A Complete Guide",
      excerpt: "Learn the essential elements and best practices for creating a professional podcast website that engages listeners and drives growth.",
      category: "web-development",
      author: "Ethos Digital Team",
      date: "January 8, 2024",
      readTime: "15 min read",
      image: "https://picsum.photos/400/250?random=6",
      tags: ["Podcast", "Web Development", "Content Strategy"],
      featured: false
    },
    {
      id: 4,
      title: "The Ultimate Guide to Google Business Profile Optimization",
      excerpt: "Step-by-step guide to optimizing your Google Business Profile to increase local visibility and attract more customers.",
      category: "local-marketing",
      author: "Ethos Digital Team",
      date: "January 5, 2024",
      readTime: "10 min read",
      image: "https://picsum.photos/400/250?random=7",
      tags: ["Google Business Profile", "Local Marketing", "SEO"],
      featured: false
    },
    {
      id: 5,
      title: "Content Marketing Strategies That Actually Drive Results",
      excerpt: "Proven content marketing strategies that help businesses build authority, attract customers, and drive conversions.",
      category: "content-marketing",
      author: "Ethos Digital Team",
      date: "January 3, 2024",
      readTime: "11 min read",
      image: "https://picsum.photos/400/250?random=8",
      tags: ["Content Marketing", "Strategy", "ROI"],
      featured: false
    },
         {
       id: 6,
       title: "Social Media Marketing for Local Businesses: Best Practices",
       excerpt: "Effective social media strategies specifically designed for local businesses to build community and drive foot traffic.",
       category: "social-media",
       author: "Ethos Digital Team",
       date: "December 28, 2023",
       readTime: "9 min read",
       image: "https://picsum.photos/400/250?random=9",
       tags: ["Social Media", "Local Business", "Community"],
       featured: false
     },
     {
       id: 7,
       title: "Video Marketing Strategies for Small Business Growth",
       excerpt: "Learn how to leverage video content to increase engagement, build trust, and drive conversions for your business.",
       category: "video-marketing",
       author: "Ethos Digital Team",
       date: "December 25, 2023",
       readTime: "14 min read",
       image: "https://picsum.photos/400/250?random=10",
       tags: ["Video Marketing", "Content Creation", "Engagement"],
       featured: false
     }
  ];

  const resources = [
    {
      id: 1,
      title: "Digital Marketing Checklist for Local Businesses",
      type: "guide",
      description: "A comprehensive checklist to help local businesses establish and maintain their digital presence.",
      icon: <FileText className="w-8 h-8 text-cyan-400" />,
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "SEO Audit Template",
      type: "template",
      description: "Professional SEO audit template to evaluate and improve your website's search performance.",
      icon: <TrendingUp className="w-8 h-8 text-cyan-400" />,
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "Content Calendar Template",
      type: "template",
      description: "Monthly content calendar template to plan and organize your content marketing efforts.",
      icon: <Calendar className="w-8 h-8 text-cyan-400" />,
      downloadUrl: "#"
    },
    {
      id: 4,
      title: "Social Media Strategy Guide",
      type: "guide",
      description: "Complete guide to developing an effective social media strategy for your business.",
      icon: <BookOpen className="w-8 h-8 text-cyan-400" />,
      downloadUrl: "#"
    }
  ];

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

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 relative overflow-hidden">
      {/* Animated Blog Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="blog-background">
          <div className="blog-particles">
            <div className="blog-particle particle-1"></div>
            <div className="blog-particle particle-2"></div>
            <div className="blog-particle particle-3"></div>
            <div className="blog-particle particle-4"></div>
            <div className="blog-particle particle-5"></div>
            <div className="blog-particle particle-6"></div>
          </div>
          <div className="blog-lines">
            <div className="blog-line line-1"></div>
            <div className="blog-line line-2"></div>
            <div className="blog-line line-3"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Resources & <span className="text-cyan-400">Insights</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest digital marketing trends, tips, and strategies. 
            Our resources help businesses navigate the digital landscape effectively.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Article</h3>
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                                 <div className="h-64 lg:h-full overflow-hidden relative">
                   <img 
                     src={featuredPost.image} 
                     alt={`${featuredPost.title} featured image`}
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                 </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">{featuredPost.title}</h4>
                  <p className="text-gray-300 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    Read Full Article
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

                 {/* Blog Posts Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {filteredPosts.filter(post => !post.featured).map((post) => (
            <article key={post.id} className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-all duration-300">
                             <div className="h-48 overflow-hidden relative">
                 <img 
                   src={post.image} 
                   alt={`${post.title} article image`}
                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
               </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{post.title}</h4>
                <p className="text-gray-300 mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white">
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>

                 {/* Free Resources */}
         <div className="bg-gray-800 rounded-xl p-8 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Free Resources & Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600 transition-all duration-300">
                <div className="mb-4">
                  {resource.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{resource.title}</h4>
                <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                <Button variant="outline" className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white">
                  Download
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-8 border border-cyan-400/30 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Get the latest digital marketing insights, tips, and strategies delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              />
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .blog-background {
            position: relative;
            width: 100%;
            height: 100%;
          }
          
          .blog-particles {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          
          .blog-particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: #06b6d4;
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.6);
            animation: blogParticleFloat 15s ease-in-out infinite;
          }
          
          .particle-1 { top: 20%; left: 20%; animation-delay: 0s; }
          .particle-2 { top: 40%; left: 80%; animation-delay: -2s; }
          .particle-3 { top: 60%; left: 15%; animation-delay: -4s; }
          .particle-4 { top: 80%; left: 70%; animation-delay: -6s; }
          .particle-5 { top: 30%; left: 60%; animation-delay: -8s; }
          .particle-6 { top: 70%; left: 40%; animation-delay: -10s; }
          
          .blog-lines {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          
          .blog-line {
            position: absolute;
            height: 2px;
            background: linear-gradient(90deg, transparent, #06b6d4, transparent);
            animation: blogLineFlow 20s linear infinite;
          }
          
          .line-1 { 
            top: 25%; 
            left: 0; 
            width: 30%; 
            animation-delay: 0s; 
          }
          .line-2 { 
            top: 50%; 
            right: 0; 
            width: 25%; 
            animation-delay: -7s; 
          }
          .line-3 { 
            top: 75%; 
            left: 20%; 
            width: 35%; 
            animation-delay: -14s; 
          }
          
          @keyframes blogParticleFloat {
            0%, 100% { 
              transform: translateY(0px) translateX(0px);
              opacity: 0.3;
            }
            33% { 
              transform: translateY(-20px) translateX(10px);
              opacity: 0.6;
            }
            66% { 
              transform: translateY(-10px) translateX(-15px);
              opacity: 0.4;
            }
          }
          
          @keyframes blogLineFlow {
            0% { 
              transform: translateX(-100%);
              opacity: 0;
            }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% { 
              transform: translateX(100%);
              opacity: 0;
            }
          }
        `
      }} />
    </section>
  );
}; 