import { Phone, Clock, MessageSquare } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { useChatbotState } from '@/hooks/useChatbotState';

export const ContactSection = () => {
  const { setIsOpen } = useChatbotState();

  const handleOpenChat = () => {
    setIsOpen(true);
  };

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to take your digital marketing to the next level? Let's discuss how we can help 
            your business grow and achieve its goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-gray-300 mb-8">
                We're here to help you succeed. Reach out to us through any of the channels below, 
                and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Phone</h4>
                  <p className="text-gray-300">+1 (812) 555-0123</p>
                  <p className="text-sm text-gray-400">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Response Time</h4>
                  <p className="text-gray-300">24 Hours or Less</p>
                  <p className="text-sm text-gray-400">We pride ourselves on quick responses</p>
                </div>
              </div>
            </div>

            {/* Quick Contact CTA */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-8 border border-cyan-400/30">
              <h4 className="text-xl font-bold text-white mb-4">Need Immediate Help?</h4>
              <p className="text-gray-300 mb-6">
                For urgent inquiries or to schedule a consultation, give us a call or chat with our AI assistant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </button>
                <button 
                  onClick={handleOpenChat}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with Live AI Assistant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 