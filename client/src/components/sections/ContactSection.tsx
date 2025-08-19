import { Mail, Phone, MessageCircle, ArrowRight, CheckCircle, Send, Sparkles, Zap, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { Chatbot } from '@/components/features/Chatbot';

export const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showChatDemo, setShowChatDemo] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start chat demo animation after section is visible
          setTimeout(() => setShowChatDemo(true), 1000);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const demoMessages = [
    { type: 'user', text: "Hi! I'm interested in growing my business online", delay: 0 },
    { type: 'ai', text: "Great! I'd love to help. What's your biggest challenge right now with marketing?", delay: 1500 },
    { type: 'user', text: "We're not getting enough leads from our website", delay: 3000 },
    { type: 'ai', text: "I can definitely help with that! Let me ask you a few quick questions to understand your business better, then I'll schedule a free consultation with our team.", delay: 4500 }
  ];

  const [visibleMessages, setVisibleMessages] = useState<number>(0);

  useEffect(() => {
    if (showChatDemo) {
      const timer = setInterval(() => {
        setVisibleMessages(prev => {
          if (prev < demoMessages.length) {
            return prev + 1;
          }
          // Reset animation after showing all messages
          setTimeout(() => setVisibleMessages(0), 2000);
          return prev;
        });
      }, 1500);

      return () => clearInterval(timer);
    }
  }, [showChatDemo]);

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-indigo-400" />,
      title: "Email Us",
      description: "hello@ethoshorizons.com",
      action: "Send Email"
    },
    {
      icon: <Phone className="w-6 h-6 text-pink-400" />,
      title: "Call Us",
      description: "Prefer to talk? Let's schedule a call.",
      action: "Schedule Call"
    }
  ];

  const features = [
    "Get instant answers to your questions",
    "Schedule consultations automatically", 
    "No forms to fill out - just chat naturally",
    "Get personalized strategy recommendations",
    "We'll create your account and handle registration",
    "Real-time project updates and performance tracking"
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        {/* Chat bubbles floating animation */}
        <div className="chat-bubble-float chat-bubble-1"></div>
        <div className="chat-bubble-float chat-bubble-2"></div>
        <div className="chat-bubble-float chat-bubble-3"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <span className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-purple-500/30 mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Conversations
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Chat</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            <strong className="text-white">Our AI chat is the most efficient and quickest way to get started with us.</strong> Skip the forms and start a conversation that will answer your questions, schedule consultations, and handle all the paperwork for you.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Chat Interface */}
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/60 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl shadow-purple-500/10 mb-12">
              
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Ethos AI Assistant</h3>
                    <p className="text-gray-400 text-sm">Ready to help grow your business</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Online</span>
                </div>
              </div>

              {/* Chat Demo Area */}
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 mb-8 min-h-[400px] relative overflow-hidden">
                {!chatOpen ? (
                  <>
                    {/* Demo Messages */}
                    <div className="space-y-4 mb-6">
                      {demoMessages.slice(0, visibleMessages).map((message, index) => (
                        <div 
                          key={index}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                        >
                          <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                            message.type === 'user' 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-gray-700 text-gray-200'
                          }`}>
                            {message.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Call to Action Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-8">
                      <Button 
                        onClick={() => setChatOpen(true)}
                        size="lg"
                        className="bg-purple-500 hover:bg-purple-600 text-white px-12 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600"
                      >
                        <MessageCircle className="mr-3 w-6 h-6" />
                        Start Your Free Consultation
                        <ArrowRight className="ml-3 w-6 h-6" />
                      </Button>
                    </div>
                  </>
                ) : (
                  /* Real Chat Interface */
                  <div className="h-[500px]">
                    <Chatbot isOpen={true} onOpenChange={() => {}} embedded={true} />
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 text-gray-300 transition-all duration-700 ${
                      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${800 + index * 100}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">
                  🔒 Your conversation is private and secure • No spam, ever
                </p>
                <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
                  <span>✓ GDPR Compliant</span>
                  <span>✓ No Data Selling</span>
                  <span>✓ Transparent Practices</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Contact Methods */}
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
            {/* Reassuring Message */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 max-w-2xl mx-auto">
                <p className="text-gray-300 text-lg leading-relaxed">
                  <span className="text-purple-300 font-medium">Prefer traditional contact methods?</span> No problem at all! 
                  We understand that some people prefer to reach out directly. Feel free to use any of the methods below.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        {method.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{method.title}</h3>
                      <p className="text-gray-300 text-sm mb-3">{method.description}</p>
                      <Button 
                        variant="ghost"
                        className="text-purple-400 hover:text-white hover:bg-purple-500/20 p-0 h-auto font-semibold"
                      >
                        {method.action}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .chat-bubble-float {
            position: absolute;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(99, 102, 241, 0.3));
            border-radius: 50%;
            animation: chatFloat 8s ease-in-out infinite;
          }
          
          .chat-bubble-1 { top: 20%; left: 10%; animation-delay: 0s; }
          .chat-bubble-2 { top: 60%; right: 15%; animation-delay: -3s; }
          .chat-bubble-3 { bottom: 30%; left: 20%; animation-delay: -6s; }
          
          @keyframes chatFloat {
            0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.3; }
            33% { transform: translateY(-20px) translateX(10px) scale(1.1); opacity: 0.6; }
            66% { transform: translateY(10px) translateX(-5px) scale(0.9); opacity: 0.4; }
          }
          
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `
      }} />
    </section>
  );
};