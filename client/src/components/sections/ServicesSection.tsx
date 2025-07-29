import { Search, Megaphone, Mail, Users, Code, TrendingUp, ShieldCheck, Layers } from 'lucide-react';

export const ServicesSection = () => {
  const services = [
    {
      icon: <Search className="w-8 h-8 mx-auto text-cyan-400" />,
      title: "SEO Services",
      description: "Improve your search engine rankings and drive organic traffic to your website with our comprehensive SEO strategies.",
      features: ["Keyword Research", "On-Page Optimization", "Technical SEO", "Content Strategy"]
    },
    {
      icon: <Megaphone className="w-8 h-8 mx-auto text-cyan-400" />,
      title: "PPC Advertising",
      description: "Maximize your ROI with targeted pay-per-click campaigns across Google Ads, Facebook, and other platforms.",
      features: ["Google Ads Management", "Facebook Advertising", "Remarketing Campaigns", "Conversion Optimization"]
    },
    {
      icon: <Code className="w-8 h-8 mx-auto text-cyan-400" />,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies and optimized for performance.",
      features: ["Custom Website Design", "E-commerce Solutions", "Web Applications", "Performance Optimization"]
    },
    {
      icon: <Mail className="w-8 h-8 mx-auto text-cyan-400" />,
      title: "Content Marketing",
      description: "Engage your audience with compelling content that drives traffic and converts visitors into customers.",
      features: ["Blog Content Creation", "Email Marketing", "Social Media Content", "Video Production"]
    },
    {
      icon: <Users className="w-8 h-8 mx-auto text-cyan-400" />,
      title: "Social Media Marketing",
      description: "Build your brand presence and engage with your audience across all major social media platforms.",
      features: ["Platform Management", "Content Strategy", "Community Engagement", "Paid Social Ads"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 mx-auto text-cyan-400" />,
      title: "Analytics & Reporting",
      description: "Data-driven insights to track performance and optimize your marketing campaigns for better results.",
      features: ["Performance Tracking", "Custom Dashboards", "ROI Analysis", "A/B Testing"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-cyan-400">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital marketing solutions designed to grow your business and maximize your online presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-700 rounded-xl p-8 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 border border-gray-600 hover:border-cyan-400/50"
            >
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 