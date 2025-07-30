import { useState } from 'react';
import { Menu, X, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNavigate: (selector: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#ai-advantage', label: 'AI Advantage' },
    { href: '#about', label: 'About Us' },
    { href: '#capabilities', label: 'Our Process' },
    { href: '#why-choose-us', label: 'Why Choose Us' },
    { href: '#portfolio', label: 'Our Work' },
    { href: '#blog', label: 'Resources & Insights' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate(href);
    setIsOpen(false);
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-lg shadow-cyan-500/10" role="banner">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home')} 
          className="flex items-center space-x-2"
          data-testid="logo-link"
          aria-label="Ethos Digital - Go to homepage"
        >
          <Handshake className="w-8 h-8 text-cyan-400" aria-hidden="true" />
          <span className="text-xl font-bold text-white tracking-wider">Ethos Digital</span>
        </a>
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsOpen(!isOpen)}
            data-testid="menu-toggle"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className="p-3"
          >
            {isOpen ? <X size={40} aria-hidden="true" /> : <Menu size={40} aria-hidden="true" />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="bg-gray-900 border-t border-gray-700">
          <nav className="flex flex-col items-center space-y-4 py-4" role="navigation" aria-label="Main navigation">
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