import { Handshake } from 'lucide-react';
import { SiLinkedin, SiX, SiFacebook, SiInstagram, SiYoutube } from 'react-icons/si';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Handshake className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-bold text-white">Ethos Horizons</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ethically Driven. Growth Beyond Limits. Professional digital marketing agency helping small to mid-sized businesses keep up with rapidly advancing technology through AI-powered strategies and traditional expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">Web Design & Development</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">Digital Marketing & SEO</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">AI-Powered Growth</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">Analytics & Optimization</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/company/ethos-digital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/ethosdigital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/ethosdigital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/ethosdigital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com/@ethosdigital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="YouTube"
              >
                <SiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Ethos Horizons. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}; 