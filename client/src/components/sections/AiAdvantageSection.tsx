import { useState, useEffect } from 'react';
import { Bot, BrainCircuit, LineChart, MessageSquare, TestTube, Zap, Target, TrendingUp } from 'lucide-react';

export const AiAdvantageSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const aiFeatures = [
    {
      icon: <BrainCircuit className="w-8 h-8 text-cyan-400" />,
      title: "Predictive Analytics",
      description: "AI-powered insights that predict market trends and customer behavior to optimize your campaigns."
    },
    {
      icon: <LineChart className="w-8 h-8 text-cyan-400" />,
      title: "Automated Optimization",
      description: "Machine learning algorithms that continuously optimize your campaigns for maximum performance."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-cyan-400" />,
      title: "Customer Sentiment Analysis",
      description: "Advanced AI that analyzes customer feedback and sentiment to improve your marketing strategies."
    },
    {
      icon: <TestTube className="w-8 h-8 text-cyan-400" />,
      title: "A/B Testing Automation",
      description: "Intelligent testing that automatically identifies and implements the best performing variations."
    },
    {
      icon: <Target className="w-8 h-8 text-cyan-400" />,
      title: "Smart Audience Targeting",
      description: "AI-driven audience segmentation that finds your most valuable customers across platforms."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-cyan-400" />,
      title: "Performance Forecasting",
      description: "Predictive models that forecast campaign performance and ROI before launch."
    }
  ];

  return (
    <section id="ai-advantage" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Enhanced AI Data Flow Animation - Centered and More Prominent */}
      <div 
        className="absolute inset-0 opacity-40 flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="ai-data-flow">
          {/* Data nodes */}
          <div className="data-node node-1"></div>
          <div className="data-node node-2"></div>
          <div className="data-node node-3"></div>
          <div className="data-node node-4"></div>
          <div className="data-node node-5"></div>
          <div className="data-node node-6"></div>
          
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
            <defs>
              <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <line x1="20%" y1="30%" x2="40%" y2="50%" stroke="url(#dataGradient)" strokeWidth="2" className="data-line line-1" />
            <line x1="40%" y1="50%" x2="60%" y2="40%" stroke="url(#dataGradient)" strokeWidth="2" className="data-line line-2" />
            <line x1="60%" y1="40%" x2="80%" y2="60%" stroke="url(#dataGradient)" strokeWidth="2" className="data-line line-3" />
            <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="url(#dataGradient)" strokeWidth="2" className="data-line line-4" />
            <line x1="50%" y1="50%" x2="70%" y2="70%" stroke="url(#dataGradient)" strokeWidth="2" className="data-line line-5" />
            <line x1="70%" y1="70%" x2="90%" y2="40%" stroke="url(#dataGradient)" strokeWidth="2" className="data-line line-6" />
          </svg>
          
          {/* Floating data particles */}
          <div className="data-particle particle-1"></div>
          <div className="data-particle particle-2"></div>
          <div className="data-particle particle-3"></div>
          <div className="data-particle particle-4"></div>
          <div className="data-particle particle-5"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Bot className="w-12 h-12 text-cyan-400 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              AI-Powered <span className="text-cyan-400">Advantage</span>
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leverage cutting-edge artificial intelligence to gain a competitive edge in the digital marketplace. 
            Our AI-driven approach delivers results that traditional marketing methods simply can't match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {aiFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* AI Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-8 border border-cyan-400/30">
            <div className="text-4xl font-bold text-cyan-400 mb-2">Smart</div>
            <p className="text-white font-semibold">Optimization</p>
            <p className="text-gray-400 text-sm mt-2">AI-driven campaign improvements</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-8 border border-cyan-400/30">
            <div className="text-4xl font-bold text-cyan-400 mb-2">Fast</div>
            <p className="text-white font-semibold">Results</p>
            <p className="text-gray-400 text-sm mt-2">Efficient campaign execution</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-8 border border-cyan-400/30">
            <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
            <p className="text-white font-semibold">Monitoring</p>
            <p className="text-gray-400 text-sm mt-2">Continuous performance tracking</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .ai-data-flow {
            position: relative;
            width: 100%;
            height: 100%;
          }
          
          .data-node {
            position: absolute;
            width: 16px;
            height: 16px;
            background: linear-gradient(45deg, #06b6d4, #3b82f6);
            border-radius: 50%;
            box-shadow: 0 0 30px rgba(6, 182, 212, 0.8);
            animation: nodePulse 3s ease-in-out infinite;
          }
          
          .node-1 { top: 25%; left: 25%; animation-delay: 0s; }
          .node-2 { top: 45%; left: 45%; animation-delay: -0.5s; }
          .node-3 { top: 35%; left: 65%; animation-delay: -1s; }
          .node-4 { top: 65%; left: 35%; animation-delay: -1.5s; }
          .node-5 { top: 55%; left: 75%; animation-delay: -2s; }
          .node-6 { top: 75%; left: 55%; animation-delay: -2.5s; }
          
          .data-line {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            stroke-width: 3;
            animation: dataFlow 2s linear infinite;
          }
          
          .line-1 { animation-delay: 0s; }
          .line-2 { animation-delay: -0.5s; }
          .line-3 { animation-delay: -1s; }
          .line-4 { animation-delay: -1.5s; }
          .line-5 { animation-delay: -2s; }
          .line-6 { animation-delay: -2.5s; }
          
          .data-particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: #06b6d4;
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.9);
            animation: particleFlow 4s linear infinite;
          }
          
          .particle-1 { top: 25%; left: 25%; animation-delay: 0s; }
          .particle-2 { top: 45%; left: 45%; animation-delay: -1s; }
          .particle-3 { top: 35%; left: 65%; animation-delay: -2s; }
          .particle-4 { top: 65%; left: 35%; animation-delay: -3s; }
          .particle-5 { top: 55%; left: 75%; animation-delay: -4s; }
          
          @keyframes nodePulse {
            0%, 100% { 
              transform: scale(1); 
              opacity: 0.7; 
              box-shadow: 0 0 30px rgba(6, 182, 212, 0.8);
            }
            50% { 
              transform: scale(1.4); 
              opacity: 1; 
              box-shadow: 0 0 40px rgba(6, 182, 212, 1);
            }
          }
          
          @keyframes dataFlow {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }
          
          @keyframes particleFlow {
            0% { 
              transform: translateX(0) translateY(0);
              opacity: 0;
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { 
              transform: translateX(100px) translateY(-50px);
              opacity: 0;
            }
          }
        `
      }} />
    </section>
  );
}; 