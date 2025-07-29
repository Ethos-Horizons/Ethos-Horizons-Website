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
      {/* Animated hexagonal background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className="hexagonal-grid">
          <div className="hexagon"></div>
          <div className="hexagon"></div>
          <div className="hexagon"></div>
          <div className="hexagon"></div>
          <div className="hexagon"></div>
          <div className="hexagon"></div>
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
          .hexagonal-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 2rem;
            padding: 2rem;
          }
          .hexagon {
            width: 100px;
            height: 115px;
            background: linear-gradient(45deg, #06b6d4, #3b82f6);
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            animation: float 6s ease-in-out infinite;
          }
          .hexagon:nth-child(2) { animation-delay: -1s; }
          .hexagon:nth-child(3) { animation-delay: -2s; }
          .hexagon:nth-child(4) { animation-delay: -3s; }
          .hexagon:nth-child(5) { animation-delay: -4s; }
          .hexagon:nth-child(6) { animation-delay: -5s; }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `
      }} />
    </section>
  );
}; 