import { useState } from 'react';
import { ExternalLink, Github, TrendingUp, Users, Clock, Code, Camera, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const portfolioItems = [
    {
      id: 1,
      title: "TechTalk Podcast Website",
      category: "web-development",
      client: "Personal Project (6+ Years)",
      description: "Complete website redesign and development for a long-running technology podcast, featuring modern design, improved SEO, and enhanced user experience.",
      image: "https://picsum.photos/600/400?random=1",
      technologies: ["React", "Next.js", "Tailwind CSS", "SEO Optimization", "Podcast Integration"],
      results: {
        trafficIncrease: "340%",
        loadTime: "1.2s",
        seoScore: "98/100",
        engagement: "45%"
      },
      features: [
        "Responsive podcast player integration",
        "SEO-optimized episode pages",
        "Automated social media sharing",
        "Analytics dashboard",
        "Email newsletter integration"
      ],
      testimonial: {
        text: "The new website has completely transformed our podcast's online presence. Traffic increased by 340% and our listeners can now easily find and share episodes.",
        author: "Podcast Host & Partner",
        role: "TechTalk Podcast"
      },
      links: {
        live: "https://techtalk-podcast.com",
        github: "https://github.com/ethosdigital/techtalk-website"
      }
    },
    {
      id: 2,
      title: "Local Restaurant Digital Presence",
      category: "digital-marketing",
      client: "Local Business",
      description: "Complete digital transformation for a local restaurant, including website, Google Business Profile optimization, and social media setup.",
      image: "https://picsum.photos/600/400?random=2",
      technologies: ["WordPress", "Google Business Profile", "Social Media", "Local SEO", "Content Creation"],
      results: {
        trafficIncrease: "280%",
        loadTime: "0.8s",
        seoScore: "95/100",
        engagement: "38%"
      },
      features: [
        "Mobile-first responsive design",
        "Online ordering integration",
        "Google Business Profile optimization",
        "Social media content calendar",
        "Local SEO implementation"
      ],
      testimonial: {
        text: "Our online orders increased by 280% within the first month. The new website and social media presence has been a game-changer for our business.",
        author: "Restaurant Owner",
        role: "Local Restaurant"
      },
      links: {
        live: "https://restaurant-website.com",
        github: null
      }
    },
    {
      id: 3,
      title: "E-commerce SEO Campaign",
      category: "seo",
      client: "Online Retailer",
      description: "Comprehensive SEO campaign for an e-commerce store, focusing on product page optimization and content marketing.",
      image: "https://picsum.photos/600/400?random=3",
      technologies: ["Technical SEO", "Content Marketing", "Keyword Research", "Analytics", "A/B Testing"],
      results: {
        trafficIncrease: "420%",
        loadTime: "1.5s",
        seoScore: "92/100",
        engagement: "52%"
      },
      features: [
        "Product page optimization",
        "Blog content strategy",
        "Technical SEO audit",
        "Competitor analysis",
        "Conversion rate optimization"
      ],
      testimonial: {
        text: "Our organic traffic increased by 420% and we're now ranking for competitive keywords. The SEO strategy has been incredibly effective.",
        author: "E-commerce Manager",
        role: "Online Retailer"
      },
      links: {
        live: "https://ecommerce-store.com",
        github: null
      }
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'digital-marketing', label: 'Digital Marketing' },
    { id: 'seo', label: 'SEO' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

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
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-gray-700 rounded-xl overflow-hidden hover:bg-gray-600 transition-all duration-300">
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={`${item.title} project screenshot`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-cyan-400">{item.client}</span>
                  <div className="flex gap-2">
                    {item.links.live && (
                      <a 
                        href={item.links.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {item.links.github && (
                      <a 
                        href={item.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{item.description}</p>

                {/* Results */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-400">{item.results.trafficIncrease}</div>
                    <div className="text-sm text-gray-400">Traffic Increase</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-400">{item.results.seoScore}</div>
                    <div className="text-sm text-gray-400">SEO Score</div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <p className="text-gray-300 italic mb-3">"{item.testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{item.testimonial.author}</div>
                      <div className="text-gray-400 text-sm">{item.testimonial.role}</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {item.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
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