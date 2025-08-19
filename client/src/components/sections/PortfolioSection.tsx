import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ExternalLink, TrendingUp, Code, ArrowRight, Globe, Layers, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';

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
      const response = await apiRequest('GET', '/api/public/portfolio');
      const data = await response.json();
      setPortfolioItems(data);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      setPortfolioItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (project: PortfolioProject) => {
    const slug = project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setLocation(`/portfolio/${slug}`);
  };

  const filters = [
    { id: 'all', label: 'All Projects', icon: Layers },
    { id: 'web-development', label: 'Web Development', icon: Code },
    { id: 'seo', label: 'SEO & Marketing', icon: TrendingUp },
    { id: 'ai-tools', label: 'AI Solutions', icon: Zap }
  ];

  const getFilteredProjects = () => {
    if (activeFilter === 'all') return portfolioItems;
    return portfolioItems.filter(project => {
      const tech = project.technologies?.join(' ').toLowerCase() || '';
      const desc = project.description.toLowerCase();
      
      switch (activeFilter) {
        case 'web-development':
          return tech.includes('react') || tech.includes('next') || tech.includes('web') || desc.includes('website') || desc.includes('web');
        case 'seo':
          return desc.includes('seo') || desc.includes('marketing') || desc.includes('traffic') || desc.includes('ranking');
        case 'ai-tools':
          return tech.includes('ai') || desc.includes('ai') || desc.includes('artificial intelligence') || desc.includes('automation');
        default:
          return true;
      }
    });
  };

  const filteredProjects = getFilteredProjects();

  if (loading) {
    return (
      <section id="portfolio" className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse text-white">Loading portfolio...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-black relative overflow-hidden">
      {/* Subtle Grid Pattern Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.1) 2px, transparent 2px),
          radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px, 40px 40px',
        backgroundPosition: '0 0, 30px 30px'
      }}></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how we've helped businesses achieve remarkable growth through innovative digital solutions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 px-6">
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Portfolio Projects - Hero-Style Layout */}
        {filteredProjects.length > 0 ? (
          <div className="space-y-0">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="relative bg-black/60 backdrop-blur-sm border-b border-gray-800/30 hover:bg-black/80 transition-all duration-500 group"
              >
                {/* Hero Image Section - Full Width */}
                <div className="w-full h-[60vh] min-h-[400px] relative overflow-hidden">
                  <img 
                    src={project.image_url || project.imageUrl || `https://picsum.photos/1920/800?random=${index + 10}`}
                    alt={`${project.title} project showcase`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Project Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="container mx-auto">
                      {project.featured && (
                        <div className="mb-4">
                          <span className="inline-block bg-indigo-500/90 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                            Featured Project
                          </span>
                        </div>
                      )}
                      
                      <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project Details Section */}
                <div className="container mx-auto px-6 py-16">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-sm font-semibold text-purple-400 mb-4 uppercase tracking-wider">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {project.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="bg-gray-700/70 text-gray-200 px-4 py-2 rounded-full text-sm border border-gray-600 backdrop-blur-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Results */}
                      {project.results && (
                        <div className="mb-8">
                          <h4 className="text-sm font-semibold text-indigo-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Results Achieved
                          </h4>
                          <div 
                            className="text-gray-300 bg-gray-800/70 p-6 rounded-xl border-l-4 border-purple-500 prose prose-sm prose-invert max-w-none backdrop-blur-sm"
                            dangerouslySetInnerHTML={{ __html: project.results }}
                            style={{
                              lineHeight: '1.7',
                              fontSize: '15px'
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          onClick={() => handleProjectClick(project)}
                          className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 text-lg"
                        >
                          View Case Study
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        
                        {project.visitSiteUrl && (
                          <Button 
                            onClick={() => window.open(project.visitSiteUrl, '_blank')}
                            variant="outline"
                            className="border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-gray-900 px-8 py-4 rounded-xl transition-all duration-300 text-lg"
                          >
                            <Globe className="mr-2 w-5 h-5" />
                            Visit Live Site
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sticky top-8">
                        <h4 className="text-lg font-semibold text-white mb-4">Project Overview</h4>
                        
                        {/* Quick Stats */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Category</span>
                            <span className="text-white font-medium">
                              {activeFilter === 'all' ? 'Digital Solution' : filters.find(f => f.id === activeFilter)?.label}
                            </span>
                          </div>
                          
                          {project.created_at && (
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Completed</span>
                              <span className="text-white font-medium">
                                {new Date(project.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          
                          {project.technologies && (
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Tech Stack</span>
                              <span className="text-white font-medium">
                                {project.technologies.length} technologies
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Social Links if available */}
                        {project.socialMediaLinks && project.socialMediaLinks.length > 0 && (
                          <div className="mt-6 pt-6 border-t border-gray-700">
                            <h5 className="text-sm font-semibold text-gray-300 mb-3">Follow This Project</h5>
                            <div className="flex gap-2">
                              {project.socialMediaLinks.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-gray-700/50 hover:bg-purple-500/20 text-gray-300 hover:text-purple-400 p-2 rounded-lg transition-all duration-300"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6">
            <p className="text-gray-400 text-lg">No projects found for the selected filter.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-20 px-6">
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-12 border border-indigo-400/30 max-w-3xl mx-auto backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
            <p className="text-gray-300 mb-8 text-lg">
              Let's discuss how we can help transform your business with innovative digital solutions.
            </p>
            <Button 
              onClick={() => setLocation('#contact')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/25 text-lg"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};