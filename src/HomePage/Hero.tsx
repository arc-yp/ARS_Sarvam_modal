import { useEffect, useState } from 'react';
import { Star, ArrowRight, Play, X } from 'lucide-react';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToLeadForm = () => {
    const leadFormElement = document.querySelector('#lead-form');
    if (leadFormElement) {
      leadFormElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Close modal on ESC and lock scroll when open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoOpen(false);
    };
    if (isVideoOpen) {
      window.addEventListener('keydown', onKeyDown);
      // lock body scroll
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', onKeyDown);
        document.body.style.overflow = original;
      };
    }
    return () => {};
  }, [isVideoOpen]);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto mt-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              {/* Trust Badge */}
              <div className={`inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <Star className="w-4 h-4 mr-2 fill-current animate-spin-slow" />
                Trusted by 30+ Businesses
              </div>
              
              {/* Main Headline */}
              <div className={`transform transition-all duration-1000 delay-200 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-0 leading-tight">
                  <span className="inline-block animate-fade-in-up">Get</span>{' '}
                  <span className="inline-block animate-fade-in-up animation-delay-100">More</span>
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="inline-block animate-fade-in-up animation-delay-200">Google</span>{' '}
                  <span className="inline-block animate-fade-in-up animation-delay-300">Reviews</span>
                  <span className="block">
                    <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent animate-gradient-x inline-block animate-fade-in-up animation-delay-400">
                      Effortlessly
                    </span>{' '}
                    <span className="inline-block animate-fade-in-up animation-delay-500">with</span>{' '}
                    <span className="inline-block animate-fade-in-up animation-delay-600">AI</span>
                  </span>
                </h1>
              </div>
              
                {/* Subheadline */}
                <p
                className={`text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl text-justify transform transition-all duration-1000 delay-500 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                >
                Turn happy customers into loyal promoters in just one tapr powered by smart AI-generated reviews that sound natural and authentic.
                </p>
              
              {/* CTA Buttons */} 
              <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 transform transition-all duration-1000 delay-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <button 
                  onClick={scrollToLeadForm}
                  className="group bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center animate-pulse-slow"
                >
                  Book Free Demo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                <button 
                  onClick={() => setIsVideoOpen(true)} 
                  className="group bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center"
                >
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </button>
              </div>
              
              {/* Social Proof */}
                <div
                className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start text-sm text-gray-500 space-y-4 sm:space-y-0 sm:space-x-6 transform transition-all duration-1000 delay-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                >
                <div className="flex items-center group">
                  <div className="flex -space-x-2 mr-3">
                  {[
                    "/testimonials/smit hospital.webp",
                    "/testimonials/Dr harshal kheni.webp",
                    "/testimonials/dr jaydev dhameliya.webp",
                    "/testimonials/bina- krishnaa tourism.webp"
                  ].map((src, i) => (
                    <img
                    key={i}
                    src={src}
                    alt={`User ${i + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover transition-transform duration-300 hover:scale-110 hover:z-10 relative"
                    style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                  </div>
                  <span className="group-hover:text-gray-700 transition-colors duration-300">Trusted By 30+ Businesses</span>
                </div>
                <div className="flex items-center group">
                  <div className="flex text-yellow-400 mr-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                    key={i}
                    className="w-4 h-4 fill-current hover:scale-125 transition-transform duration-300 cursor-pointer"
                    style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                  </div>
                  <span className="group-hover:text-gray-700 transition-colors duration-300">4.9/5 rating</span>
                </div>
                </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className={`relative transform transition-all duration-1200 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-700 hover:shadow-3xl hover:scale-105">
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
                  AI Powered ✨
                </div>
                
                {/* Mock Phone Interface */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4 animate-fade-in-up">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-200 shadow">
                      <img
                      src="/testimonials/integrityworld.webp"
                      alt="Integrity World logo"
                      className="w-full h-full object-cover bg-white"
                      loading="lazy"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Integrity World</h3>
                      <p className="text-sm text-gray-500">Rate your experience</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star 
                        key={i} 
                        className="w-8 h-8 text-yellow-400 fill-current mx-1 hover:scale-125 transition-all duration-300 cursor-pointer animate-fade-in-up"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 mb-4 border-l-4 border-blue-500 hover:shadow-md transition-all duration-300 animate-fade-in-up animation-delay-500">
                    <p className="text-gray-700 text-sm italic">
                      "Bhautik Sir's best ai coaching at Integrity World truly boosted my confidence. I feel more articulate during presentations now, and my team has definitely noticed the change. Super helpful."
                    </p>
                  </div>
                  
                  <a
                    href="https://www.aireviewsystem.com/integrity-world"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-700 text-center block"
                  >
                    📋 Copy & Post to Google
                  </a>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold animate-bounce hover:animate-pulse cursor-pointer">
                🚀 +300% Reviews
              </div>
              <div className="absolute -bottom-8 -right-8 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse hover:animate-bounce cursor-pointer">
                🌟 5-Star Reviews
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Watch demo video"
        >
          <div
            className="relative w-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 sm:top-3 sm:right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:scale-110 hover:rotate-90 transition-all duration-300"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            {/* 9:16 Responsive Video Wrapper */}
            <div className="relative aspect-[9/16] h-[70vh] sm:h-[75vh] md:h-[85vh] max-h-[900px] rounded-2xl overflow-hidden bg-gray-900 shadow-2xl border border-white/10">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/F-CwRTHFzPM?autoplay=1&rel=0&modestbranding=1"
                title="AI Review System - Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
};

export default Hero;