import { Search, Target, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export const CapabilitiesSection = () => {
  const processSteps = [
    {
      number: "01",
      title: "Discovery & Analysis",
      description: "We start by understanding your business, goals, and current digital presence through comprehensive analysis.",
      icon: <Search className="w-8 h-8 text-cyan-400" />,
      features: ["Market Research", "Competitor Analysis", "Audience Insights", "Performance Audit"]
    },
    {
      number: "02",
      title: "Strategy Development",
      description: "Based on our findings, we create a customized digital marketing strategy tailored to your specific needs.",
      icon: <Target className="w-8 h-8 text-cyan-400" />,
      features: ["Goal Setting", "Channel Selection", "Budget Allocation", "Timeline Planning"]
    },
    {
      number: "03",
      title: "Implementation",
      description: "We execute your strategy with precision, using the latest tools and technologies to maximize results.",
      icon: <TrendingUp className="w-8 h-8 text-cyan-400" />,
      features: ["Campaign Setup", "Content Creation", "Technical Optimization", "Launch Management"]
    },
    {
      number: "04",
      title: "Optimization & Growth",
      description: "Continuous monitoring and optimization ensure your campaigns perform at their peak and drive sustainable growth.",
      icon: <CheckCircle className="w-8 h-8 text-cyan-400" />,
      features: ["Performance Monitoring", "A/B Testing", "Strategy Refinement", "ROI Optimization"]
    }
  ];

  return (
    <section id="capabilities" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Proven <span className="text-cyan-400">Process</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A systematic approach that ensures every project delivers exceptional results. 
            Our four-step process has been refined through years of experience and success.
          </p>
        </div>

        <div className="space-y-12">
          {processSteps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 top-24 w-0.5 h-12 bg-gradient-to-b from-cyan-400 to-transparent transform -translate-x-1/2"></div>
              )}
              
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Numbers - Mobile first, then desktop positioning */}
                <div className={`order-1 lg:order-2 ${index % 2 === 1 ? 'lg:col-start-1' : ''} text-center lg:text-left`}>
                  <div className="relative">
                    <div className="text-6xl lg:text-8xl font-bold text-cyan-400/20">{step.number}</div>
                  </div>
                </div>
                
                {/* Description cards - Mobile second, then desktop positioning */}
                <div className={`order-2 lg:order-1 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="bg-cyan-500/20 p-3 rounded-lg mr-4">
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-cyan-400 mb-1">STEP {step.number}</div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">{step.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-gray-300">
                          <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
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
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-8 border border-cyan-400/30 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how our proven process can help your business achieve its digital marketing goals.
            </p>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 