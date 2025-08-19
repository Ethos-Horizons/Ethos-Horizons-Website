import { useState, useEffect } from 'react';
import { ArrowRight, Play, Zap, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onNavigate: (selector: string) => void;
}

export const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 200);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { number: "98%", label: "Client Satisfaction", icon: Users },
    { number: "3x", label: "Average Growth", icon: TrendingUp },
    { number: "24/7", label: "Support", icon: Zap }
  ];

  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* Background Elements with Parallax */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs with parallax */}
        <div 
          className="gradient-orb orb-1"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        ></div>
        <div 
          className="gradient-orb orb-2"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`
          }}
        ></div>
        <div 
          className="gradient-orb orb-3"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`
          }}
        ></div>
        
        {/* Grid overlay with parallax */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(168, 85, 247, 0.15) 1px, transparent 0)',
            backgroundSize: '50px 50px',
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        ></div>
        
        {/* Additional floating elements with parallax */}
        <div 
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-xl"
          style={{
            transform: `translateY(${scrollY * 0.08}px) translateX(${scrollY * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl"
          style={{
            transform: `translateY(${scrollY * 0.12}px) translateX(${scrollY * 0.03}px)`
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content with Parallax */}
          <div 
            className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{
              transform: `translateY(${scrollY * 0.05}px)`
            }}
          >
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-purple-500/30">
                <Zap className="w-4 h-4" />
                Ethically Driven
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Growth
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                Beyond Limits
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
              We don't just create campaigns. We engineer sustainable growth through transparent strategies and cutting-edge AI technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                onClick={() => onNavigate('#contact')}
                size="lg"
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                Start Growing Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                onClick={() => onNavigate('#portfolio')}
                variant="outline"
                size="lg"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <Play className="mr-2 w-5 h-5" />
                See Our Work
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index}
                    className={`text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    style={{ transitionDelay: `${600 + index * 200}ms` }}
                  >
                    <div className="flex justify-center mb-2">
                      <IconComponent className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Visual with Parallax */}
          <div 
            className={`relative transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
            style={{
              transform: `translateY(${scrollY * 0.08}px)`
            }}
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-gradient-to-br from-gray-900/80 to-purple-900/40 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-xl mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Your Growth Dashboard</h3>
                  <p className="text-gray-300">Real results, transparent reporting</p>
                </div>
                
                {/* Animated metrics */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Website Traffic</span>
                    <span className="text-green-400 font-semibold">+247%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="growth-bar bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Lead Generation</span>
                    <span className="text-green-400 font-semibold">+186%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="growth-bar-2 bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Revenue Growth</span>
                    <span className="text-green-400 font-semibold">+312%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="growth-bar-3 bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="floating-element absolute -top-4 -right-4 bg-purple-500/20 backdrop-blur-lg border border-purple-400/30 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">AI Powered</div>
                  <div className="text-xs text-gray-300">Optimization</div>
                </div>
              </div>
              
              <div className="floating-element-2 absolute -bottom-4 -left-4 bg-indigo-500/20 backdrop-blur-lg border border-indigo-400/30 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-indigo-400">24/7</div>
                  <div className="text-xs text-gray-300">Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .gradient-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.7;
            animation: float 8s ease-in-out infinite;
            will-change: transform;
          }
          
          .orb-1 {
            width: 300px;
            height: 300px;
            background: linear-gradient(45deg, #a855f7, #6366f1);
            top: 20%;
            left: 10%;
            animation-delay: 0s;
          }
          
          .orb-2 {
            width: 200px;
            height: 200px;
            background: linear-gradient(45deg, #ec4899, #8b5cf6);
            top: 60%;
            right: 20%;
            animation-delay: -3s;
          }
          
          .orb-3 {
            width: 250px;
            height: 250px;
            background: linear-gradient(45deg, #6366f1, #3b82f6);
            bottom: 20%;
            left: 60%;
            animation-delay: -6s;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(5deg); }
            66% { transform: translateY(10px) rotate(-3deg); }
          }
          
          .growth-bar {
            width: 0%;
            animation: growBar 2s ease-out 1s forwards;
          }
          
          .growth-bar-2 {
            width: 0%;
            animation: growBar 2s ease-out 1.5s forwards;
          }
          
          .growth-bar-3 {
            width: 0%;
            animation: growBar 2s ease-out 2s forwards;
          }
          
          @keyframes growBar {
            0% { width: 0%; }
            100% { width: 85%; }
          }
          
          .floating-element {
            animation: floatElement 3s ease-in-out infinite;
          }
          
          .floating-element-2 {
            animation: floatElement 3s ease-in-out infinite reverse;
            animation-delay: -1.5s;
          }
          
          @keyframes floatElement {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `
      }} />
    </section>
  );
};