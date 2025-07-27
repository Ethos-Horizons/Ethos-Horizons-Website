import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, Megaphone, Mail, Users, Bot, Target, FileText, BrainCircuit, LineChart,
  MessageSquare, TestTube, Phone, MapPin, Code, TrendingUp, ShieldCheck, Layers, Package,
  Clock, ArrowRight, Menu, X, Paintbrush, Handshake, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { cn } from '@/lib/utils';

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Mock data
const services = [
  {
    icon: <Search className="w-10 h-10 text-cyan-400" />,
    title: "SEO Services",
    description: "Enhance your visibility with transparent, data-driven SEO strategies built on a foundation of integrity.",
  },
  {
    icon: <Megaphone className="w-10 h-10 text-cyan-400" />,
    title: "PPC Advertising",
    description: "Drive targeted traffic with campaigns managed with complete transparency and a focus on your growth.",
  },
  {
    icon: <FileText className="w-10 h-10 text-cyan-400" />,
    title: "Content Marketing",
    description: "Engage your audience with high-quality, authentic content that builds trust and fosters customer loyalty.",
  },
  {
    icon: <Users className="w-10 h-10 text-cyan-400" />,
    title: "Social Media Marketing",
    description: "Build a vibrant, loyal community around your brand by fostering genuine connections with your customers.",
  },
  {
    icon: <Mail className="w-10 h-10 text-cyan-400" />,
    title: "Email Marketing",
    description: "Nurture leads and serve your audience through personalized and ethical email campaigns.",
  },
  {
    icon: <Code className="w-10 h-10 text-cyan-400" />,
    title: "Web Design & Development",
    description: "Create a high-performance website that serves as a reliable cornerstone for your long-term growth.",
  },
];

const aiFeatures = [
  { icon: <BrainCircuit className="w-8 h-8 mx-auto text-cyan-400" />, title: "Deep Competitor Analysis" },
  { icon: <TrendingUp className="w-8 h-8 mx-auto text-cyan-400" />, title: "SEO & Content Strategy" },
  { icon: <Target className="w-8 h-8 mx-auto text-cyan-400" />, title: "Audience Persona Generation" },
  { icon: <LineChart className="w-8 h-8 mx-auto text-cyan-400" />, title: "PPC Campaign Optimization" },
  { icon: <MessageSquare className="w-8 h-8 mx-auto text-cyan-400" />, title: "Customer Sentiment Analysis" },
  { icon: <TestTube className="w-8 h-8 mx-auto text-cyan-400" />, title: "A/B Testing Hypotheses" },
];

const pricingTiers = [
  {
    icon: <Clock className="w-10 h-10 mx-auto text-cyan-400" />,
    title: "Hourly Retainer",
    price: "$50 - $300/hr",
    description: "Flexible access to our experts for consultations, specific tasks, or when project scope is variable.",
    features: ["Ideal for startups", "Pay for what you use", "Transparent time tracking", "No long-term commitment"],
    buttonText: "Get Started",
  },
  {
    icon: <Package className="w-10 h-10 mx-auto text-cyan-400" />,
    title: "Project-Based",
    price: "Custom Quote",
    description: "A fixed price for a well-defined project, like a website build or a specific campaign launch.",
    features: ["Clear upfront cost", "Defined scope & deliverables", "Perfect for one-off needs", "Result-oriented"],
    buttonText: "Request a Quote",
    popular: true,
  },
  {
    icon: <Layers className="w-10 h-10 mx-auto text-cyan-400" />,
    title: "Monthly Retainer",
    price: "$2,000 - $6,000+",
    description: "Ongoing, comprehensive marketing management for sustained growth and a predictable monthly budget.",
    features: ["Continuous optimization", "Dedicated team access", "Long-term strategy", "Best for consistent growth"],
    buttonText: "Choose Plan",
  },
];

const teamMembers = [
  {
    icon: <Code className="w-12 h-12 text-cyan-400" />,
    name: "Christopher McElwain",
    title: "Lead Developer & Technical Strategist",
    bio: "With several years of programming experience, Christopher is the architect behind our technical solutions. He specializes in building robust, scalable web applications and providing tailor-made solutions that solve unique business challenges. His passion for clean code and efficient systems ensures every project is built for success."
  },
  {
    icon: <Paintbrush className="w-12 h-12 text-cyan-400" />,
    name: "Thomas Grimm",
    title: "Creative Director & Marketing Expert",
    bio: "Thomas brings the creative vision and marketing acumen to the team. With a background in brand strategy and digital content, he excels at crafting compelling narratives that resonate with audiences. Thomas ensures that every campaign is not only data-driven but also creatively inspiring, driving engagement and building lasting brand loyalty."
  }
];

const testimonials = [
  {
    quote: "Working with Ethos Digital has been a game-changer. Their commitment to our growth felt like a true partnership, not just a service. The results speak for themselves, and their integrity is unmatched.",
    name: "Sarah Johnson",
    company: "Founder, Growth Co.",
    rating: 5,
  },
  {
    quote: "The level of transparency and loyalty from this team is incredible. They took the time to understand our vision and delivered a strategy that has driven real, sustainable growth. We finally feel like we have a partner we can trust.",
    name: "Michael Chen",
    company: "CEO, Innovate Solutions",
    rating: 5,
  },
  {
    quote: "I've worked with many agencies, but Ethos Digital Partners is different. Their dedication to serving our needs and their ethical approach to marketing have built a foundation of trust and loyalty that is hard to find.",
    name: "Emily Rodriguez",
    company: "Marketing Director, Connective Tech",
    rating: 5,
  }
];

// Components
const Header = ({ onNavigate }: { onNavigate: (selector: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#ai-advantage', label: 'AI Advantage' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#about', label: 'About Us' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate(href);
    setIsOpen(false);
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-lg shadow-cyan-500/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home')} 
          className="flex items-center space-x-2"
          data-testid="logo-link"
        >
          <Handshake className="w-8 h-8 text-cyan-400" />
          <span className="text-xl font-bold text-white tracking-wider">Ethos Digital</span>
        </a>
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsOpen(!isOpen)}
            data-testid="menu-toggle"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="bg-gray-900 border-t border-gray-700">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-gray-300 hover:text-cyan-400 transition duration-300 font-medium"
                data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const HeroSection = ({ onNavigate }: { onNavigate: (selector: string) => void }) => {
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

      <div className="container mx-auto px-6 text-center relative z-10 pt-24 pb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Marketing with Integrity, Strategies for Growth
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          We build lasting partnerships through loyalty and transparency, delivering data-driven marketing solutions that fuel sustainable growth for our clients.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <Button 
            onClick={() => onNavigate('#contact')} 
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105"
            data-testid="button-schedule-consultation"
          >
            Schedule a Consultation
          </Button>
          <Button 
            onClick={() => onNavigate('#services')} 
            variant="outline"
            className="bg-transparent border-2 border-gray-500 hover:border-cyan-400 hover:text-cyan-400 text-gray-300 font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
            data-testid="button-explore-services"
          >
            Explore Services
          </Button>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => (
  <section id="services" className="py-20 bg-gray-800">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Our Core Services</h2>
        <p className="text-lg text-gray-400 mt-2">Comprehensive solutions to build and grow your online presence.</p>
        <div className="mt-4 h-1 w-24 bg-cyan-500 mx-auto rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300 transform hover:-translate-y-1 text-center"
            data-testid={`service-${service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          >
            <div className="flex justify-center mb-6">{service.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-gray-400">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AiAdvantageSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const offset = (sectionCenter - viewportCenter) * 0.3;
        setScrollY(offset);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="ai-advantage" ref={sectionRef} className="py-20 text-white relative overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
      
      {/* Animated hexagonal grid pattern with parallax */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `translateY(${scrollY}px)` }}
      >
        <div className="neural-animation" style={{ animationDirection: 'reverse', animationDuration: '25s' }}>
          <div className="relative">
            {/* Hexagonal shapes */}
            <div className="w-80 h-80 border-2 border-cyan-400/15 rotate-45 rounded-lg"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-cyan-400/25 rotate-45 rounded-lg"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-cyan-400/35 rotate-45 rounded-lg"></div>
          </div>
        </div>
      </div>
      
      {/* Floating data nodes with parallax */}
      <div 
        className="absolute top-1/6 left-1/5"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="orbital-animation" style={{ animationDuration: '18s' }}>
          <div className="w-3 h-3 bg-cyan-400/50 rounded-full pulse-glow"></div>
        </div>
      </div>
      <div 
        className="absolute top-2/3 right-1/5"
        style={{ transform: `translateY(${scrollY * 0.7}px)` }}
      >
        <div className="orbital-animation" style={{ animationDelay: '-6s', animationDuration: '22s' }}>
          <div className="w-4 h-4 bg-blue-400/60 rounded-full pulse-glow"></div>
        </div>
      </div>
      <div 
        className="absolute top-1/3 right-1/2"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        <div className="orbital-animation" style={{ animationDelay: '-12s', animationDuration: '16s' }}>
          <div className="w-2 h-2 bg-cyan-300/70 rounded-full pulse-glow"></div>
        </div>
      </div>
      <div 
        className="absolute bottom-1/4 left-1/3"
        style={{ transform: `translateY(${scrollY * 0.6}px)` }}
      >
        <div className="orbital-animation" style={{ animationDelay: '-8s', animationDuration: '20s' }}>
          <div className="w-3 h-3 bg-cyan-500/40 rounded-full pulse-glow"></div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">The AI-Powered Advantage</h2>
          <p className="text-lg text-gray-400 mt-2 max-w-3xl mx-auto">We leverage AI ethically for deep research and automation, uncovering insights while maintaining the highest standards of integrity.</p>
          <div className="mt-4 h-1 w-24 bg-cyan-500 mx-auto rounded"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {aiFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors duration-300"
              data-testid={`ai-feature-${feature.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {feature.icon}
              <h4 className="font-semibold text-white mt-4 text-sm">{feature.title}</h4>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center bg-gray-800/80 backdrop-blur-md p-8 rounded-lg max-w-4xl mx-auto border border-gray-700 shadow-xl">
          <Bot className="w-20 h-20 mx-auto text-cyan-400 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-3">Transforming Research into Strategy</h3>
          <p className="text-gray-300">
            Our AI tools synthesize data from dozens of sources, providing detailed reports with citations. This allows us to rapidly formulate comprehensive strategies, identify content gaps, and optimize campaigns with a level of precision that was previously impossible.
          </p>
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => (
  <section id="pricing" className="py-20 bg-gray-800">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Flexible & Transparent Pricing</h2>
        <p className="text-lg text-gray-400 mt-2">Choose a model that aligns with your business goals and budget.</p>
        <div className="mt-4 h-1 w-24 bg-cyan-500 mx-auto rounded"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {pricingTiers.map((tier, index) => (
          <div 
            key={index} 
            className={cn(
              "bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col relative",
              tier.popular ? "border-2 border-cyan-500" : "border border-gray-700"
            )}
            data-testid={`pricing-tier-${tier.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          >
            {tier.popular && (
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase">
                Most Popular
              </div>
            )}
            <div className="text-center">
              {tier.icon}
              <h3 className="text-2xl font-bold text-white mt-4">{tier.title}</h3>
              <p className="text-4xl font-extrabold text-cyan-400 my-4">{tier.price}</p>
              <p className="text-gray-400 h-16">{tier.description}</p>
            </div>
            <ul className="my-8 space-y-4 flex-grow">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <ShieldCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className={cn(
                "w-full font-bold py-3 px-6 rounded-lg transition duration-300 mt-auto",
                tier.popular ? "bg-cyan-500 hover:bg-cyan-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"
              )}
              data-testid={`button-${tier.buttonText.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {tier.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutUsSection = () => (
  <section id="about" className="py-20 bg-gray-900">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Our Foundation: Loyalty, Integrity & Growth</h2>
        <p className="text-lg text-gray-400 mt-2 max-w-3xl mx-auto">We are a duo of passionate experts dedicated to a partnership approach. Our work is guided by a commitment to serving our clients' success.</p>
        <div className="mt-4 h-1 w-24 bg-cyan-500 mx-auto rounded"></div>
      </div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-1 lg:grid-cols-2 gap-10">
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
            data-testid={`team-member-${member.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          >
            <div className="mb-4">{member.icon}</div>
            <h3 className="text-2xl font-bold text-white">{member.name}</h3>
            <p className="text-cyan-400 font-semibold mb-4">{member.title}</p>
            <p className="text-gray-300">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section id="testimonials" className="py-20 bg-gray-800">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">What Our Partners Say</h2>
        <p className="text-lg text-gray-400 mt-2 max-w-3xl mx-auto">We're proud to build loyal partnerships that drive real growth.</p>
        <div className="mt-4 h-1 w-24 bg-cyan-500 mx-auto rounded"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col"
            data-testid={`testimonial-${index}`}
          >
            <div className="flex text-yellow-400 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => 
                <Star key={i} className="w-5 h-5 fill-current" />
              )}
            </div>
            <p className="text-gray-300 mb-6 flex-grow">"{testimonial.quote}"</p>
            <div>
              <p className="font-bold text-white">{testimonial.name}</p>
              <p className="text-cyan-400 text-sm">{testimonial.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      service: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. We'll get back to you shortly.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Partner with Us for Principled Growth</h2>
          <p className="text-lg text-gray-400 mt-2">Ready to grow with a team you can trust? Reach out and let's discuss your project.</p>
          <div className="mt-4 h-1 w-24 bg-cyan-500 mx-auto rounded"></div>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-gray-300 mb-6">
              Have a question or want to work together? Fill out the form or contact us directly. We're excited to hear from you.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-cyan-400 mr-4" />
                <span className="text-gray-300">(812) 555-0123</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-cyan-400 mr-4" />
                <span className="text-gray-300">hello@ethosdigitalpartners.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-cyan-400 mr-4" />
                <span className="text-gray-300">401 Main Street, Evansville, IN 47708</span>
              </div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                        data-testid="input-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="email" 
                        className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Company (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                        data-testid="input-company"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Interested Service</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger 
                          className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                          data-testid="select-service"
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="seo">SEO Services</SelectItem>
                        <SelectItem value="ppc">PPC Advertising</SelectItem>
                        <SelectItem value="content">Content Marketing</SelectItem>
                        <SelectItem value="social">Social Media Marketing</SelectItem>
                        <SelectItem value="email">Email Marketing</SelectItem>
                        <SelectItem value="web">Web Design & Development</SelectItem>
                        <SelectItem value="consultation">General Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        rows={5}
                        className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                        data-testid="textarea-message"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={contactMutation.isPending}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg shadow-cyan-500/20"
                data-testid="button-send-message"
              >
                {contactMutation.isPending ? 'Sending...' : 'Send Message'} 
                <ArrowRight className="inline w-5 h-5 ml-2" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-800">
    <div className="container mx-auto px-6 py-6 text-center text-gray-500">
      <p>&copy; {new Date().getFullYear()} Ethos Digital Partners. All Rights Reserved.</p>
      <p className="text-sm mt-1">Your Trusted Partner in Digital Growth.</p>
    </div>
  </footer>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={cn(
        "fixed bottom-[160px] right-6 sm:right-10 w-80 sm:w-96 h-[28rem] bg-gray-800 rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-[60]",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        <div className="bg-gray-900 p-4 rounded-t-xl flex justify-between items-center flex-shrink-0">
          <h3 className="text-white font-bold flex items-center">
            <Bot className="w-5 h-5 mr-2 text-cyan-400" /> 
            Ethos Digital Assistant
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsOpen(false)}
            data-testid="button-close-chat"
          >
            <X size={20} />
          </Button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="flex flex-col space-y-3">
            <div className="bg-gray-700 p-3 rounded-lg self-start max-w-xs">
              <p className="text-sm text-gray-300">Hello! Our virtual assistant is currently under development.</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg self-start max-w-xs">
              <p className="text-sm text-gray-300">It will be available soon to answer your questions. For now, please use the contact form for any inquiries. We look forward to assisting you!</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-700 flex-shrink-0">
          <div className="flex space-x-2">
            <Input 
              type="text" 
              placeholder="Virtual assistant coming soon..." 
              disabled
              className="w-full bg-gray-700 border-gray-600 text-white cursor-not-allowed"
            />
            <Button 
              disabled 
              className="bg-cyan-800 text-white/50 cursor-not-allowed"
            >
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 sm:right-10 bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110 z-50"
        data-testid="button-open-chat"
      >
        <MessageSquare size={24} />
      </Button>
    </>
  );
};

export default function Home() {
  const handleNavigate = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      const offset = selector === '#home' ? 0 : 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: top,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen font-sans">
      <Header onNavigate={handleNavigate} />
      <main>
        <HeroSection onNavigate={handleNavigate} />
        <ServicesSection />
        <AiAdvantageSection />
        <PricingSection />
        <AboutUsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
