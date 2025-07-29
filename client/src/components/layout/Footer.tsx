import { Handshake } from 'lucide-react';
import { SiLinkedin, SiX, SiGithub, SiFacebook } from 'react-icons/si';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Handshake className="w-6 h-6 text-cyan-400" />
              <span className="text-lg font-bold text-white">Ethos Digital</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional digital marketing agency specializing in SEO, PPC, web development, and AI-powered strategies for sustainable business growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="text-gray-400 hover:text-cyan-400 transition-colors">SEO Services</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-cyan-400 transition-colors">PPC Advertising</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-cyan-400 transition-colors">Web Development</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-cyan-400 transition-colors">Content Marketing</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="space-y-2 text-sm mb-4">
              <p className="text-gray-400">hello@ethosdigitalpartners.com</p>
              <p className="text-gray-400">+1 (812) 555-0123</p>
              <p className="text-gray-400">Evansville, IN</p>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/company/ethos-digital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/ethosdigital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/ethosdigital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="GitHub"
              >
                <SiGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/ethosdigital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Ethos Digital. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}; 