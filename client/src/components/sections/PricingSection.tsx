import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$1,500",
      period: "/month",
      description: "Perfect for small businesses getting started with digital marketing.",
      features: [
        "SEO Optimization",
        "Google Ads Management",
        "Monthly Reporting",
        "Email Support",
        "Basic Analytics"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$3,500",
      period: "/month",
      description: "Comprehensive digital marketing for growing businesses.",
      features: [
        "Everything in Starter",
        "Content Marketing",
        "Social Media Management",
        "Advanced Analytics",
        "Priority Support",
        "A/B Testing",
        "Competitor Analysis"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large organizations with complex needs.",
      features: [
        "Everything in Professional",
        "Custom Strategy Development",
        "Dedicated Account Manager",
        "Advanced AI Implementation",
        "Custom Reporting",
        "24/7 Support",
        "White-label Options"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transparent <span className="text-cyan-400">Pricing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the plan that best fits your business needs. All plans include our proven process 
            and commitment to delivering measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-xl p-8 transition-all duration-300 transform hover:scale-105 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50' 
                  : 'bg-gray-800 border border-gray-700 hover:border-cyan-400/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-4xl font-bold text-cyan-400">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full py-3 font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                }`}
              >
                {plan.name === "Enterprise" ? "Contact Us" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Solution?</h3>
            <p className="text-gray-300 mb-6">
              We understand that every business is unique. Let's discuss your specific needs 
              and create a custom plan that fits your budget and goals.
            </p>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 font-semibold">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}; 