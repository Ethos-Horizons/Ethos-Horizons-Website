import { 
  Header, 
  HeroSection, 
  ServicesSection,
  AiAdvantageSection,
  AboutUsSection,
  CapabilitiesSection,
  WhyChooseUsSection,
  PortfolioSection,
  BlogSection,
  PricingSection,
  ContactSection,
  Footer,
  Chatbot 
} from '@/components';

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
        <AboutUsSection />
        <CapabilitiesSection />
        <WhyChooseUsSection />
        <PortfolioSection />
        <BlogSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
