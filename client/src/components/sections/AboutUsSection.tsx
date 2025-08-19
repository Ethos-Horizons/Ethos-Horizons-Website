import { Shield, Heart, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';

export const AboutUsSection = () => {
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

  const values = [
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: "Transparent & Ethical",
      description: "No black-hat tactics. No invasive tracking. Just honest marketing that builds real relationships."
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      title: "Human-Centered",
      description: "We believe in marketing that respects your customers' privacy and treats them like humans, not data points."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-indigo-400" />,
      title: "Results-Driven",
      description: "Every strategy is designed to drive real business growth, not just vanity metrics."
    }
  ];

  const achievements = [
    { number: "98%", label: "Client Retention Rate" },
    { number: "3.2x", label: "Average ROI" },
    { number: "24/7", label: "Support & Monitoring" }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            <span className="inline-block text-purple-400 font-semibold text-sm uppercase tracking-wider mb-4">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Marketing That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                Actually Matters
              </span>
            </h2>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed mb-8">
              <p>
                We started Ethos Horizons because we saw small to mid-sized businesses struggling to keep up with rapidly advancing technology while competing against larger companies with bigger budgets and resources.
              </p>
              <p>
                <strong className="text-white">Technology moves fast.</strong> What worked yesterday might not work tomorrow. We believe every business, regardless of size, deserves access to cutting-edge digital solutions that can level the playing field.
              </p>
              <p>
                That's why we're embracing AI and automation - not to replace human expertise, but to amplify it. Our technology makes your marketing smarter, your workflows more efficient, and your growth more sustainable.
              </p>
            </div>

            <Button 
              size="lg"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              Start Your Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Right Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            {/* Values Cards */}
            <div className="space-y-6 mb-12">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-r from-gray-900/80 to-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 transition-all duration-700 hover:border-purple-500/50 hover:transform hover:scale-[1.02] ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg">
                        {value.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                      <p className="text-gray-300">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`text-center transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="text-3xl font-bold text-purple-400 mb-2">{achievement.number}</div>
                  <div className="text-sm text-gray-400">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - What We Don't Do */}
        <div className={`mt-24 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              What We <span className="text-red-400">Don't</span> Do
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">Invasive location tracking (geofencing)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">Surveillance marketing tactics</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">Black-hat SEO techniques</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">Misleading advertising claims</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">Cookie tracking without consent</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">Lock you into long-term contracts</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-gray-300 text-lg">
                <strong className="text-white">Our Promise:</strong> We build your business through trust, not tricks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};