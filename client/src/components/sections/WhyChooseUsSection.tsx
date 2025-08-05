import { Star, Shield, Zap, Users, Target, Award } from 'lucide-react';

export const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: <Star className="w-8 h-8 text-cyan-400" />,
      title: "Fresh Perspective",
      description: "We bring innovative approaches and modern strategies that deliver results in today's digital landscape."
    },
    {
      icon: <Shield className="w-8 h-8 text-cyan-400" />,
      title: "Personal Attention",
      description: "You'll work directly with our team, ensuring your project gets the dedicated attention it deserves."
    },
    {
      icon: <Zap className="w-8 h-8 text-cyan-400" />,
      title: "Cutting-Edge Technology",
      description: "We leverage the latest AI and marketing technologies to deliver superior results."
    },
    {
      icon: <Users className="w-8 h-8 text-cyan-400" />,
      title: "Transparent Communication",
      description: "Regular updates and clear reporting ensure you always know what's happening with your campaigns."
    },
    {
      icon: <Target className="w-8 h-8 text-cyan-400" />,
      title: "Results-Driven Approach",
      description: "We focus on measurable outcomes and ROI, not just vanity metrics."
    },
    {
      icon: <Award className="w-8 h-8 text-cyan-400" />,
      title: "Proven Expertise",
      description: "Our team brings deep expertise in digital marketing and cutting-edge technology."
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose <span className="text-cyan-400">Ethos Horizons</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            In a crowded digital marketing landscape, we stand out by combining innovation, 
            integrity, and personalized service to deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="bg-gray-700 rounded-xl p-8 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 border border-gray-600 hover:border-cyan-400/50"
            >
              <div className="mb-6">
                {reason.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{reason.title}</h3>
              <p className="text-gray-300 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-700 rounded-xl p-8 border border-gray-600">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">How We Compare</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-300 mb-4">Traditional Agencies</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• High overhead costs</li>
                <li>• Slow response times</li>
                <li>• Generic approaches</li>
                <li>• Limited transparency</li>
                <li>• Outdated methods</li>
              </ul>
            </div>
            <div className="text-center bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg p-6 border border-cyan-400/30">
              <h4 className="text-lg font-semibold text-cyan-400 mb-4">Ethos Horizons</h4>
              <ul className="space-y-2 text-sm text-white">
                <li>• Transparent pricing</li>
                <li>• Quick response</li>
                <li>• Custom strategies</li>
                <li>• Full transparency</li>
                <li>• Modern technology</li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-300 mb-4">Freelancers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Limited expertise</li>
                <li>• Inconsistent quality</li>
                <li>• No accountability</li>
                <li>• Single point of failure</li>
                <li>• Limited resources</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 