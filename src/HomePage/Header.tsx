import { useState, useEffect } from 'react';
import { Star, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const scrollToLeadForm = () => {
    scrollToSection('#lead-form');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['#how-it-works', '#industries', '#features', '#testimonials', '#faq'];
      const current = sections.find(section => {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Industries', href: '#industries' },
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100' 
          : 'bg-gradient-to-b from-blue-900/20 to-transparent'
      }`}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Animation */}
            <div className="flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative flex items-center w-44 h-26 transform transition-all duration-300 group-hover:scale-105">
                <img 
                  src="/arslogo.webp" 
                  alt="AI Review System Logo" 
                  className="w-[280px] h-[180px] object-contain transition-all duration-300 filter group-hover:brightness-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const starIcon = e.currentTarget.nextElementSibling as HTMLElement;
                    if (starIcon) {
                      starIcon.style.display = 'block';
                    }
                  }}
                />
                <div className="hidden group">
                  <Star className="w-8 h-8 text-blue-700 animate-pulse" />
                  <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-bounce" />
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2 font-medium transition-all duration-300 rounded-lg group ${
                    activeSection === item.href
                      ? 'text-blue-600'
                      : isScrolled 
                        ? 'text-gray-700 hover:text-blue-600' 
                        : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Animated underline */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transform origin-left transition-transform duration-300 ${
                    activeSection === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                  
                  {/* Hover background */}
                  {/* <span className={`absolute inset-0 rounded-lg bg-gradient-to-r from-blue-50 to-green-50 transform scale-0 group-hover:scale-100 transition-transform duration-300 ${
                    isScrolled ? 'opacity-100' : 'opacity-0'
                  }`}></span> */}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button 
                onClick={scrollToLeadForm} 
                className="relative bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center group overflow-hidden"
              >
                {/* Animated background shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                
                <span className="relative z-10 flex items-center">
                  Get Demo
                  <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <div className="relative w-6 h-6">
                <Menu className={`w-6 h-6 absolute transition-all duration-300 ${
                  isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`} />
                <X className={`w-6 h-6 absolute transition-all duration-300 ${
                  isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/98 backdrop-blur-xl shadow-2xl border-t border-gray-100">
            <nav className="px-6 py-6 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:translate-x-2 ${
                    activeSection === item.href
                      ? 'bg-gradient-to-r from-blue-50 to-green-50 text-blue-600 shadow-md'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <span className="flex items-center justify-between">
                    {item.name}
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                      activeSection === item.href ? 'translate-x-0' : '-translate-x-2 opacity-0'
                    }`} />
                  </span>
                </button>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl group"
                  onClick={scrollToLeadForm}
                >
                  <Sparkles className="mr-2 w-5 h-5 animate-pulse" />
                  Get Demo
                  <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Add custom CSS for animations */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
};

export default Header;