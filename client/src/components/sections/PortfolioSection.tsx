import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ExternalLink, Github, TrendingUp, Users, Clock, Code, Camera, Mic, ArrowRight, Globe, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiRequest } from '@/lib/queryClient';

interface PortfolioImage {
  id: string;
  url: string;
  alt: string;
  isHero: boolean;
  order: number;
}

interface SocialMediaLink {
  platform: string;
  url: string;
}

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  image_url?: string;
  images?: PortfolioImage[];
  technologies: string[];
  results: string;
  journey?: string;
  visitSiteUrl?: string;
  socialMediaLinks?: SocialMediaLink[];
  featured: boolean;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

export const PortfolioSection = () => {
  const [, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const response = await apiRequest('GET', '/api/cms/portfolio');
      const data = await response.json();
      setPortfolioItems(data);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      setPortfolioItems([]);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  const handlePortfolioClick = (item: PortfolioProject) => {
    const slug = item.slug || generateSlug(item.title);
    setLocation(`/portfolio/${slug}`);
  };

  const getHeroImage = (item: PortfolioProject) => {
    // First try to get hero image from images array
    if (item.images && item.images.length > 0) {
      const heroImage = item.images.find(img => img.isHero);
      if (heroImage) return heroImage.url;
      // If no hero image, use first image
      return item.images[0].url;
    }
    // Fallback to imageUrl or image_url
    return item.imageUrl || item.image_url || 'https://picsum.photos/600/400?random=1';
  };

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'digital-marketing', label: 'Digital Marketing' },
    { id: 'seo', label: 'SEO' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => {
        // For now, we'll use technologies to determine category
        const techString = item.technologies.join(' ').toLowerCase();
        if (activeFilter === 'web-development' && (techString.includes('react') || techString.includes('next') || techString.includes('javascript'))) {
          return true;
        }
        if (activeFilter === 'seo' && (techString.includes('seo') || techString.includes('optimization'))) {
          return true;
        }
        if (activeFilter === 'digital-marketing' && (techString.includes('marketing') || techString.includes('social'))) {
          return true;
        }
        return false;
      });

  if (loading) {
    return (
      <section id="portfolio" className="py-20 bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-white text-xl">Loading portfolio...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 relative overflow-hidden">
      {/* Animated Portfolio Background */}
      <div className="absolute inset-0 opacity-25">
        <div className="portfolio-background">
          <div className="portfolio-orbs">
            <div className="portfolio-orb orb-1"></div>
            <div className="portfolio-orb orb-2"></div>
            <div className="portfolio-orb orb-3"></div>
            <div className="portfolio-orb orb-4"></div>
            <div className="portfolio-orb orb-5"></div>
          </div>
          <div className="portfolio-sparkles">
            <div className="sparkle sparkle-1"></div>
            <div className="sparkle sparkle-2"></div>
            <div className="sparkle sparkle-3"></div>
            <div className="sparkle sparkle-4"></div>
            <div className="sparkle sparkle-5"></div>
            <div className="sparkle sparkle-6"></div>
            <div className="sparkle sparkle-7"></div>
            <div className="sparkle sparkle-8"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-cyan-400">Work</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our expertise through real projects and measurable results. 
            Each project demonstrates our commitment to delivering exceptional digital solutions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-gray-700 rounded-xl overflow-hidden hover:bg-gray-600 transition-all duration-300 flex flex-col h-full">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={getHeroImage(item)} 
                    alt={`${item.title} project screenshot`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-cyan-500 text-white">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-cyan-400">
                      {item.visitSiteUrl ? 'Live Project' : 'Portfolio Project'}
                    </span>
                    <div className="flex gap-2">
                      {item.visitSiteUrl && (
                        <a 
                          href={item.visitSiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-cyan-400 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                      {item.socialMediaLinks && item.socialMediaLinks.length > 0 && (
                        <div className="flex gap-1">
                          {item.socialMediaLinks.slice(0, 2).map((link, index) => (
                            <a 
                              key={index}
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-cyan-400 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              title={link.platform}
                            >
                              <Share2 className="w-4 h-4" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed flex-grow">{item.description}</p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.slice(0, 4).map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 4 && (
                        <span className="bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm">
                          +{item.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="mt-auto">
                    <Button 
                      onClick={() => handlePortfolioClick(item)}
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      View Project Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-xl mb-4">No portfolio projects found</div>
              <p className="text-gray-500">Check back soon for our latest work!</p>
            </div>
          )}
        </div>

        {/* Equipment Showcase */}
        <div className="bg-gray-700 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Professional Equipment & Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Camera className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Video Production</h4>
              <p className="text-gray-300 text-sm">Professional cameras, lighting, and editing software for high-quality video content.</p>
            </div>
            <div className="text-center">
              <Mic className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Audio Production</h4>
              <p className="text-gray-300 text-sm">Studio-quality microphones and audio equipment for podcast and video production.</p>
            </div>
            <div className="text-center">
              <Code className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Technical Expertise</h4>
              <p className="text-gray-300 text-sm">Full-stack development capabilities with modern technologies and best practices.</p>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .portfolio-background {
            position: relative;
            width: 100%;
            height: 100%;
          }
          
          .portfolio-orbs {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          
          .portfolio-orb {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(59, 130, 246, 0.1) 70%, transparent 100%);
            animation: orbFloat 20s ease-in-out infinite;
          }
          
          .orb-1 { 
            width: 120px; 
            height: 120px; 
            top: 15%; 
            left: 10%; 
            animation-delay: 0s; 
          }
          .orb-2 { 
            width: 80px; 
            height: 80px; 
            top: 25%; 
            right: 15%; 
            animation-delay: -4s; 
          }
          .orb-3 { 
            width: 100px; 
            height: 100px; 
            top: 60%; 
            left: 20%; 
            animation-delay: -8s; 
          }
          .orb-4 { 
            width: 60px; 
            height: 60px; 
            top: 70%; 
            right: 25%; 
            animation-delay: -12s; 
          }
          .orb-5 { 
            width: 90px; 
            height: 90px; 
            top: 45%; 
            left: 60%; 
            animation-delay: -16s; 
          }
          
          .portfolio-sparkles {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          
          .sparkle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: #06b6d4;
            border-radius: 50%;
            box-shadow: 0 0 8px rgba(6, 182, 212, 0.8);
            animation: sparkleTwinkle 8s ease-in-out infinite;
          }
          
          .sparkle-1 { top: 20%; left: 30%; animation-delay: 0s; }
          .sparkle-2 { top: 35%; left: 75%; animation-delay: -1s; }
          .sparkle-3 { top: 55%; left: 15%; animation-delay: -2s; }
          .sparkle-4 { top: 65%; left: 80%; animation-delay: -3s; }
          .sparkle-5 { top: 40%; left: 45%; animation-delay: -4s; }
          .sparkle-6 { top: 75%; left: 60%; animation-delay: -5s; }
          .sparkle-7 { top: 30%; left: 85%; animation-delay: -6s; }
          .sparkle-8 { top: 80%; left: 35%; animation-delay: -7s; }
          
          @keyframes orbFloat {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.2;
            }
            25% { 
              transform: translateY(-30px) translateX(15px) scale(1.1);
              opacity: 0.4;
            }
            50% { 
              transform: translateY(-50px) translateX(-10px) scale(1.2);
              opacity: 0.6;
            }
            75% { 
              transform: translateY(-20px) translateX(20px) scale(1.05);
              opacity: 0.3;
            }
          }
          
          @keyframes sparkleTwinkle {
            0%, 100% { 
              transform: scale(1);
              opacity: 0.3;
            }
            50% { 
              transform: scale(1.5);
              opacity: 1;
            }
          }
        `
      }} />
    </section>
  );
}; 