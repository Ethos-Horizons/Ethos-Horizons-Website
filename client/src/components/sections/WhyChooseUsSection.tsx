import { Star, Shield, Zap, Users, Target, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: <Star className="w-8 h-8 text-purple-400" />,
      title: "Fresh Perspective",
      description: "We bring innovative approaches and modern strategies that deliver results in today's digital landscape.",
      details: "Our team stays ahead of industry trends and emerging technologies to provide you with cutting-edge solutions that your competitors aren't using yet.",
      benefits: ["Latest industry trends", "Innovative strategies", "Competitive advantage", "Future-proof solutions"]
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: "Personal Attention",
      description: "You'll work directly with our team, ensuring your project gets the dedicated attention it deserves.",
      details: "Unlike large agencies where you're just another account, we provide personalized service with dedicated team members who understand your business inside and out.",
      benefits: ["Dedicated team members", "Direct communication", "Customized strategies", "Personal relationships"]
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: "Cutting-Edge Technology",
      description: "We leverage the latest AI and marketing technologies to deliver superior results.",
      details: "From AI-powered analytics to automated optimization tools, we use advanced technology to maximize your marketing efficiency and results.",
      benefits: ["AI-powered insights", "Automated optimization", "Advanced analytics", "Technology integration"]
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Transparent Communication",
      description: "Regular updates and clear reporting ensure you always know what's happening with your campaigns.",
      details: "We believe in complete transparency with detailed reporting, regular check-ins, and clear explanations of what we're doing and why.",
      benefits: ["Regular reporting", "Clear explanations", "Open communication", "Performance tracking"]
    },
    {
      icon: <Target className="w-8 h-8 text-purple-400" />,
      title: "Results-Driven Approach",
      description: "We focus on measurable outcomes and ROI, not just vanity metrics.",
      details: "Every strategy we implement is designed to drive real business results. We track what matters most to your bottom line.",
      benefits: ["ROI-focused", "Measurable results", "Business growth", "Data-driven decisions"]
    },
    {
      icon: <Award className="w-8 h-8 text-purple-400" />,
      title: "Proven Track Record",
      description: "Our portfolio showcases successful campaigns across various industries and business sizes.",
      details: "We've helped businesses of all sizes achieve their digital marketing goals with measurable results and long-term growth.",
      benefits: ["Diverse experience", "Proven results", "Case studies", "Industry expertise"]
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-black relative overflow-hidden">
      {/* Subtle Geometric Lines Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: 'rgba(168, 85, 247, 0)', stopOpacity: 0}} />
              <stop offset="50%" style={{stopColor: 'rgba(168, 85, 247, 0.4)', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: 'rgba(168, 85, 247, 0)', stopOpacity: 0}} />
            </linearGradient>
          </defs>
          <line x1="0" y1="20" x2="100" y2="25" stroke="url(#lineGradient)" strokeWidth="0.5" className="geometric-line line-1" />
          <line x1="0" y1="45" x2="100" y2="40" stroke="url(#lineGradient)" strokeWidth="0.5" className="geometric-line line-2" />
          <line x1="0" y1="70" x2="100" y2="75" stroke="url(#lineGradient)" strokeWidth="0.5" className="geometric-line line-3" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Ethos Horizons</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-6">
            We're not just another digital marketing agency. Here's what sets us apart and makes us the right choice for your business growth.
          </p>
        </div>

        {/* Reasons - Full Width Layout */}
        <div className="space-y-0">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="relative bg-black/60 backdrop-blur-sm border-b border-gray-800/30 hover:bg-black/80 transition-all duration-500 group"
            >
              <div className="container mx-auto px-6 py-20">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-xl mb-4">
                        {reason.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors duration-300">
                      {reason.title}
                    </h3>
                    
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                      {reason.description}
                    </p>

                    <p className="text-gray-400 mb-8 leading-relaxed">
                      {reason.details}
                    </p>
                    
                    {/* Benefits */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-purple-400 mb-4 uppercase tracking-wider">
                        Key Benefits
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {reason.benefits.map((benefit, benefitIndex) => (
                          <div 
                            key={benefitIndex}
                            className="flex items-center gap-3 text-gray-300"
                          >
                            <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Visual Element */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500">
                      <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 p-12 backdrop-blur-sm border border-purple-400/30 rounded-2xl">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-500/30 rounded-full mb-8 group-hover:scale-110 transition-transform duration-500">
                            <div className="text-purple-300">
                              {reason.icon}
                            </div>
                          </div>
                          <h4 className="text-2xl font-bold text-white mb-6">Key Benefits</h4>
                          <div className="space-y-4">
                            {reason.benefits.map((benefit, idx) => (
                              <div 
                                key={idx}
                                className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 flex items-center gap-3"
                              >
                                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              

            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-20 px-6">
          <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl p-12 border border-purple-400/30 max-w-4xl mx-auto backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-8">Trusted by Businesses Like Yours</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
                <p className="text-gray-300">Successful Projects</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
                <p className="text-gray-300">Client Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <p className="text-gray-300">Support Available</p>
              </div>
            </div>
            
            <Button className="bg-purple-500 hover:bg-purple-600 text-white px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 text-lg">
              Start Your Success Story
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .geometric-line {
            stroke-dasharray: 20 10;
            stroke-dashoffset: 30;
            animation: lineFlow 15s linear infinite;
          }
          
          .line-1 { animation-delay: 0s; }
          .line-2 { animation-delay: -5s; }
          .line-3 { animation-delay: -10s; }
          
          @keyframes lineFlow {
            0% { 
              stroke-dashoffset: 30;
              opacity: 0.2;
            }
            50% { 
              opacity: 0.6;
            }
            100% { 
              stroke-dashoffset: -30;
              opacity: 0.2;
            }
          }
        `
      }} />
    </section>
  );
};