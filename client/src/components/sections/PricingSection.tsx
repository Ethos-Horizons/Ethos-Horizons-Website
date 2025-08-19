import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  type: string;
}

export const PricingSection = () => {
  // Use hardcoded pricing data
  const plans = [
    {
      name: "Online Presence Setup",
      price: "$2,500",
      period: "one-time",
      description: "Complete digital foundation for businesses with little to no online presence.",
      features: [
        "Professional Website (5-8 pages)",
        "Google Business Profile Setup & Optimization",
        "Social Media Profile Creation (3 platforms)",
        "Basic SEO Implementation",
        "Content Creation (About, Services, Contact)",
        "Google Analytics Setup",
        "Business Consultation Session",
        "30-day Support"
      ],
      popular: false,
      type: "setup"
    },
    {
      name: "Growth Retainer",
      price: "$1,200",
      period: "/month",
      description: "Ongoing digital marketing to drive traffic and generate leads.",
      features: [
        "Monthly SEO Optimization",
        "Social Media Management (3 platforms)",
        "Content Creation (8 posts/month)",
        "Google Ads Management",
        "Monthly Performance Reports",
        "Email Marketing Campaigns",
        "Competitor Analysis",
        "Priority Support"
      ],
      popular: true,
      type: "retainer"
    },
    {
      name: "Premium Retainer",
      price: "$2,500",
      period: "/month",
      description: "Comprehensive digital marketing with advanced AI automation.",
      features: [
        "Everything in Growth Retainer",
        "AI-Powered Content Generation",
        "Advanced Analytics & Reporting",
        "Video Marketing (Shorts/Ads)",
        "Podcast Production Support",
        "Advanced SEO Strategies",
        "Custom AI Agent Setup",
        "Dedicated Account Manager",
        "Weekly Strategy Calls"
      ],
      popular: false,
      type: "retainer"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Flexible <span className="text-purple-400">Pricing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start with a complete online presence setup, then scale with ongoing marketing services. 
            Perfect for businesses ready to grow their digital footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-xl p-8 transition-all duration-300 transform hover:scale-105 flex flex-col h-full ${
                plan.popular 
                  ? 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-2 border-purple-400/50' 
                  : 'bg-gray-800 border border-gray-700 hover:border-purple-400/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-4xl font-bold text-purple-400">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
                {plan.type === "setup" && (
                  <div className="mt-4">
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold">
                      One-Time Investment
                    </span>
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Button 
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-purple-500 hover:bg-purple-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                  }`}
                >
                  {plan.type === "setup" ? "Get Started" : "Start Retainer"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Business?</h3>
            <p className="text-gray-300 mb-6">
              Whether you need a complete online presence or ongoing marketing support, 
              let's discuss how we can help your business thrive in the digital landscape.
            </p>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 font-semibold">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}; 