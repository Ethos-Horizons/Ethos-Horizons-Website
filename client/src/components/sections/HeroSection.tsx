import { useState, useEffect } from 'react';
import { ArrowRight, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onNavigate: (selector: string) => void;
}

export const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="flex items-center justify-center text-white relative min-h-screen overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
      
      {/* Animated neural network pattern with parallax */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="neural-animation relative">
          <div className="w-96 h-96 border-2 border-cyan-400/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-400/30 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-cyan-400/40 rounded-full"></div>
        </div>
      </div>
      
      {/* Orbiting elements with parallax */}
      <div 
        className="absolute top-1/4 left-1/4"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="orbital-animation">
          <div className="w-4 h-4 bg-cyan-400/60 rounded-full pulse-glow"></div>
        </div>
      </div>
      <div 
        className="absolute top-3/4 right-1/4"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className="orbital-animation" style={{ animationDelay: '-5s' }}>
          <div className="w-3 h-3 bg-blue-400/50 rounded-full pulse-glow"></div>
        </div>
      </div>
      <div 
        className="absolute top-1/2 right-1/3"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <div className="orbital-animation" style={{ animationDelay: '-10s' }}>
          <div className="w-2 h-2 bg-cyan-300/70 rounded-full pulse-glow"></div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Ethically Driven
          </span>
          <br />
          <span className="text-white">Growth Beyond Limits</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Data-driven strategies that deliver sustainable growth. We combine cutting-edge AI technology with proven marketing principles to help your business thrive in the digital landscape.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            onClick={() => onNavigate('#contact')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
            size="lg"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            onClick={() => onNavigate('#services')}
            variant="outline"
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
            size="lg"
          >
            View Our Services
          </Button>
        </div>
        
        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-8 h-8 text-cyan-400 mr-2" />
              <span className="text-3xl font-bold text-white">Data-Driven</span>
            </div>
            <p className="text-gray-400">AI-Powered Insights</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-8 h-8 text-cyan-400 mr-2" />
              <span className="text-3xl font-bold text-white">Results</span>
            </div>
            <p className="text-gray-400">Measurable Growth</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-8 h-8 text-cyan-400 mr-2" />
              <span className="text-3xl font-bold text-white">24hr</span>
            </div>
            <p className="text-gray-400">Response Time</p>
          </div>
        </div>
      </div>
    </section>
  );
}; 