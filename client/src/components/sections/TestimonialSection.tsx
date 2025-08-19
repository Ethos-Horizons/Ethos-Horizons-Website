import { Star, Quote, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';

export const TestimonialSection = () => {
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

  const testimonials = [
    {
      quote: "Ethos Horizons didn't just increase our traffic - they transformed our entire online presence. No gimmicks, just real results.",
      author: "Sarah Chen",
      company: "Local Fitness Studio",
      result: "+340% website traffic",
      rating: 5
    },
    {
      quote: "Finally, a marketing agency that actually explains what they're doing and why. Our ROI has tripled since working with them.",
      author: "Mike Rodriguez", 
      company: "E-commerce Store",
      result: "3.2x ROI increase",
      rating: 5
    },
    {
      quote: "They refused to use invasive tracking on our customers. That ethical approach actually helped us build more trust and sales.",
      author: "Jennifer Walsh",
      company: "SaaS Startup",
      result: "+89% conversion rate",
      rating: 5
    }
  ];

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.1) 2px, transparent 2px)',
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <span className="inline-block text-purple-400 font-semibold text-sm uppercase tracking-wider mb-4">
            Client Success Stories
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Real People. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Real Results.</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what happens when you prioritize ethics and results.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-[1.02] ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <Quote className="w-8 h-8 text-purple-400" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-gray-300 leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-gray-700 pt-6">
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-gray-400 text-sm mb-3">{testimonial.company}</div>
                <div className="inline-block bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold">
                  {testimonial.result}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-12 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Join Them?
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Let's create a success story for your business. No surveillance, no tricks - just results.
            </p>
            <Button 
              size="lg"
              className="bg-purple-500 hover:bg-purple-600 text-white px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              Start Your Success Story
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
