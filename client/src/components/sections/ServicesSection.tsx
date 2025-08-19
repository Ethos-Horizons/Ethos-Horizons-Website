import { Search, TrendingUp, Code, Zap, Target, Globe, ArrowRight, Bot, Sparkles, BarChart3, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';

export const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const traditionalServices = [
    {
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      title: "Web Design & Development",
      description: "We design and build websites and web apps that reflect your brand.",
      color: "blue"
    },
    {
      icon: <Search className="w-8 h-8 text-green-400" />,
      title: "Digital Marketing",
      description: "Our team handles SEO, Google Business profile magic, social media, and ad setup (Google, Facebook), plus content creation for posts and ads.",
      color: "green"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-400" />,
      title: "Analytics & Growth",
      description: "We monitor analytics to track your growth and ROI.",
      color: "purple"
    }
  ];

  const aiEnhancements = [
    {
      icon: <Calendar className="w-8 h-8 text-indigo-400" />,
      title: "Smart Campaign Orchestration",
      description: "AI agents plan, schedule, and optimize ad campaigns in real time across platforms.",
      color: "indigo"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-pink-400" />,
      title: "Content Agent",
      description: "Drafts posts, suggests headlines based on performance data, autonomously A/B tests variations.",
      color: "pink"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-400" />,
      title: "Analytics Agent",
      description: "Continuously analyzes user behavior and campaign results to recommend focus shifts or budget reallocations.",
      color: "orange"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Workflow Agents",
      description: "Reduce manual hand-offs by coordinating tasks (e.g., content idea → draft → schedule → publish).",
      color: "yellow"
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <span className="inline-block text-purple-400 font-semibold text-sm uppercase tracking-wider mb-4">
            What We Do Best
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Human-Led, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">AI-Powered</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We combine traditional digital marketing expertise with intelligent, autonomous workflows to deliver smarter, faster, and more strategic outcomes for your business.
          </p>
        </div>

        {/* Traditional Services Section */}
        <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Traditional Services</h3>
            <p className="text-gray-400 text-lg">The foundation that builds your digital presence</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {traditionalServices.map((service, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm hover:border-${service.color}-500/50 transition-all duration-500 transform hover:scale-[1.02]`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-${service.color}-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300 mb-6`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Enhancement Section */}
        <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3 mb-6">
              <Bot className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 font-semibold">AI-Powered Enhancements</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Enhanced by Intelligent Workflows</h3>
            <p className="text-gray-400 text-lg">How AI agents make your marketing smarter and more efficient</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {aiEnhancements.map((enhancement, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm hover:border-${enhancement.color}-500/50 transition-all duration-500 transform hover:scale-[1.02]`}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
              >
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-${enhancement.color}-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300 mb-6`}>
                    {enhancement.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {enhancement.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {enhancement.description}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${enhancement.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Personalization Note */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-lg border border-green-500/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-semibold">Ethical Personalization</span>
            </div>
            <p className="text-gray-300 text-lg">
              We use AI to tailor messaging contextually (e.g., "heavy traffic alert" vs. "midnight sale") without surveillance. 
              <strong className="text-white"> Your customers' privacy is protected while their experience is enhanced.</strong>
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '1400ms' }}>
          <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Experience the Future of Marketing?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Let's build a strategy that combines human expertise with AI-powered efficiency to drive real, sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                Get Your Free Strategy Session
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400 px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};