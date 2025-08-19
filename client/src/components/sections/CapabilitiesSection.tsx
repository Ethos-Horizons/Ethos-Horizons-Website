import { useState, useEffect } from 'react';
import { Search, Target, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export const CapabilitiesSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const processSteps = [
    {
      number: "01",
      title: "Discovery & Analysis",
      description: "We start by understanding your business, goals, and current digital presence through comprehensive analysis.",
      icon: <Search className="w-8 h-8 text-purple-400" />,
      features: ["Market Research", "Competitor Analysis", "Audience Insights", "Performance Audit"]
    },
    {
      number: "02",
      title: "Strategy Development",
      description: "Based on our findings, we create a customized digital marketing strategy tailored to your specific needs.",
      icon: <Target className="w-8 h-8 text-purple-400" />,
      features: ["Goal Setting", "Channel Selection", "Budget Allocation", "Timeline Planning"]
    },
    {
      number: "03",
      title: "Implementation",
      description: "We execute your strategy with precision, using the latest tools and technologies to maximize results.",
      icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
      features: ["Campaign Setup", "Content Creation", "Technical Optimization", "Launch Management"]
    },
         {
       number: "04",
       title: "Optimization & Growth",
       description: "Continuous monitoring and optimization ensure your campaigns perform at their peak and drive sustainable growth.",
       icon: <CheckCircle className="w-8 h-8 text-purple-400" />,
       features: ["Performance Monitoring", "A/B Testing", "Strategy Refinement", "ROI Optimization"]
     },
     {
       number: "05",
       title: "Scaling & Expansion",
       description: "Once we've achieved your initial goals, we help you scale successful strategies and expand into new opportunities.",
       icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
       features: ["Strategy Scaling", "New Market Entry", "Advanced Analytics", "Long-term Planning"]
     }
  ];

  return (
    <section id="capabilities" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated Process Particles */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="process-particles">
          <div className="process-particle particle-1"></div>
          <div className="process-particle particle-2"></div>
          <div className="process-particle particle-3"></div>
          <div className="process-particle particle-4"></div>
          <div className="process-particle particle-5"></div>
          <div className="process-particle particle-6"></div>
          <div className="process-particle particle-7"></div>
          <div className="process-particle particle-8"></div>
          
                     {/* Process step numbers floating in background */}
           <div className="floating-number number-1">01</div>
           <div className="floating-number number-2">02</div>
           <div className="floating-number number-3">03</div>
           <div className="floating-number number-4">04</div>
           <div className="floating-number number-5">05</div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Proven <span className="text-purple-400">Process</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A systematic approach that ensures every project delivers exceptional results. 
            Our four-step process has been refined through years of experience and success.
          </p>
        </div>

        <div className="space-y-12 max-w-7xl mx-auto">
          {processSteps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 top-24 w-0.5 h-12 bg-gradient-to-b from-purple-400 to-transparent transform -translate-x-1/2"></div>
              )}
              
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Numbers - Mobile first, then desktop positioning */}
                <div className={`order-1 lg:order-2 ${index % 2 === 1 ? 'lg:col-start-1' : ''} text-center lg:text-left`}>
                  <div className="relative">
                    <div className="text-6xl lg:text-8xl font-bold text-purple-400/20">{step.number}</div>
                  </div>
                </div>
                
                {/* Description cards - Mobile second, then desktop positioning */}
                <div className={`order-2 lg:order-1 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-purple-400/50 transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-purple-400 mb-1">STEP {step.number}</div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">{step.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-gray-300">
                          <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl p-8 border border-purple-400/30 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how our proven process can help your business achieve its digital marketing goals.
            </p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .process-particles {
            position: relative;
            width: 100%;
            height: 100%;
          }
          
          .process-particle {
            position: absolute;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #a855f7, #6366f1);
            border-radius: 50%;
            box-shadow: 0 0 25px rgba(168, 85, 247, 0.9);
            animation: processFloat 8s ease-in-out infinite;
          }
          
          .particle-1 { top: 15%; left: 15%; animation-delay: 0s; }
          .particle-2 { top: 25%; left: 85%; animation-delay: -1s; }
          .particle-3 { top: 35%; left: 25%; animation-delay: -2s; }
          .particle-4 { top: 45%; left: 75%; animation-delay: -3s; }
          .particle-5 { top: 55%; left: 20%; animation-delay: -4s; }
          .particle-6 { top: 65%; left: 80%; animation-delay: -5s; }
          .particle-7 { top: 75%; left: 30%; animation-delay: -6s; }
          .particle-8 { top: 85%; left: 70%; animation-delay: -7s; }
          
          .floating-number {
            position: absolute;
            font-size: 5rem;
            font-weight: bold;
            color: rgba(168, 85, 247, 0.2);
            text-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
            animation: numberFloat 12s ease-in-out infinite;
          }
          
                     .number-1 { top: 20%; left: 20%; animation-delay: 0s; }
           .number-2 { top: 40%; left: 80%; animation-delay: -3s; }
           .number-3 { top: 60%; left: 15%; animation-delay: -6s; }
           .number-4 { top: 80%; left: 75%; animation-delay: -9s; }
           .number-5 { top: 50%; left: 50%; animation-delay: -12s; }
          
          @keyframes processFloat {
            0%, 100% { 
              transform: translateY(0px) translateX(0px);
              opacity: 0.6;
            }
            25% { 
              transform: translateY(-30px) translateX(20px);
              opacity: 0.9;
            }
            50% { 
              transform: translateY(-20px) translateX(-25px);
              opacity: 1;
            }
            75% { 
              transform: translateY(-40px) translateX(10px);
              opacity: 0.8;
            }
          }
          
          @keyframes numberFloat {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg);
              opacity: 0.15;
            }
            33% { 
              transform: translateY(-25px) rotate(3deg);
              opacity: 0.25;
            }
            66% { 
              transform: translateY(-35px) rotate(-3deg);
              opacity: 0.2;
            }
          }
        `
      }} />
    </section>
  );
}; 