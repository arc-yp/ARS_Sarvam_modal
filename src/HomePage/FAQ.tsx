import { useState, useEffect, useRef } from 'react';
import { Plus, Minus, HelpCircle, Phone, MessageCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleFAQs, setVisibleFAQs] = useState<number[]>([]);
  const [ctaVisible, setCtaVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: "How does the AI Review System work?",
      answer: "Our AI analyzes the star rating, business category, and language preference to generate unique, natural-sounding reviews. Customers simply scan your QR code, rate their experience, and get a ready-to-post review that they can copy to Google Reviews with one click.",
      icon: "🤖"
    },
    {
      question: "Are the AI-generated reviews authentic and safe to use?",
      answer: "Yes! Our AI creates unique, human-like reviews that reflect genuine customer experiences. Each review is different and contextually appropriate for your business type. The reviews are generated based on actual customer ratings, making them authentic representations of their experience.",
      icon: "✅"
    },
    {
      question: "What languages are supported?",
      answer: "We support English and Hindi. All reviews are written in Roman script (English letters) for easy reading and posting on Google Reviews.",
      icon: "🌐"
    },
    {
      question: "How quickly can I start collecting reviews?",
      answer: "Setup takes less than 5 minutes! After your demo call, we'll create your custom QR codes and links immediately. You can start collecting reviews the same day.",
      icon: "⚡"
    },
    {
      question: "Do customers need to download any app?",
      answer: "No! The entire process works through a web browser. Customers simply scan your QR code or click your link, rate their experience, and get their review - no app downloads required.",
      icon: "📱"
    },
    {
      question: "Can I customize the reviews for my specific business?",
      answer: "Absolutely! Our AI is trained to understand different business categories (restaurants, salons, hospitals, etc.) and generates contextually appropriate reviews for each industry.",
      icon: "🎯"
    },
    {
      question: "What if customers give low ratings?",
      answer: "For ratings below 4 stars, our system can redirect customers to a private feedback form instead of generating a public review, helping you address concerns privately while protecting your online reputation.",
      icon: "🛡️"
    },
    {
      question: "Is there a limit to how many reviews I can generate?",
      answer: "No limits! Generate as many reviews as you need. Our pricing is based on your business size, not the number of reviews generated.",
      icon: "♾️"
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Intersection Observer for main section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stagger FAQ animations
            faqs.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFAQs(prev => [...prev, index]);
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for CTA section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCtaVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Top CTA with Enhanced Animation */}
          <div 
            ref={ctaRef}
            className={`text-center mb-12 transform transition-all duration-1000 ${
              ctaVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
            }`}
          >
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              {/* Animated background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-green-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <h3 className={`text-2xl font-bold text-gray-900 mb-4 transition-all duration-700 ${
                  ctaVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  Still Have Questions?
                </h3>
                <p className={`text-gray-600 mb-6 transition-all duration-700 delay-200 ${
                  ctaVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  Our team is here to help! Get in touch and we'll answer any questions about our AI Review System.
                </p>
                <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${
                  ctaVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <a
                    href="tel:9909908230"
                    className="group/btn bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:-translate-y-1"
                  >
                    <Phone className="w-5 h-5 mr-2 transition-transform duration-300 group-hover/btn:rotate-12" />
                    Schedule a Call
                  </a>
                  <a
                    href="https://wa.me/919909908230?text=Hi%21%20I%27m%20interested%20in%20AI%20Review%20System%20for%20my%20business."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-green-300 transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:-translate-y-1 hover:shadow-md"
                  >
                    <MessageCircle className="w-5 h-5 mr-2 transition-transform duration-300 group-hover/btn:scale-110" />
                    Live Chat Support
                  </a>
                </div>
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out"></div>
            </div>
          </div>

          {/* Section Header */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
            }`}>
              <HelpCircle className="w-4 h-4 mr-2 animate-pulse" />
              Frequently Asked Questions
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Got Questions? <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">We've Got Answers</span>
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Everything you need to know about our AI Review System. <br/> Can't find what you're looking for? Contact our support team!
            </p>
          </div>

          {/* FAQ Items with Enhanced Animations */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl overflow-hidden border-2 transition-all duration-500 transform ${
                  visibleFAQs.includes(index)
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-8 opacity-0 scale-95'
                } ${
                  openIndex === index 
                    ? 'border-blue-300 shadow-lg' 
                    : 'border-gray-200 hover:border-blue-200 shadow-md hover:shadow-lg'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 md:px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-300 group"
                >
                  <div className="flex items-center flex-1 pr-4">
                    {/* Animated Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-all duration-300 ${
                      openIndex === index
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 scale-110'
                        : 'bg-gray-100 group-hover:bg-blue-100 group-hover:scale-110'
                    }`}>
                      <span className="text-xl transition-transform duration-300 group-hover:scale-125">
                        {faq.icon}
                      </span>
                    </div>
                    
                    <h3 className={`text-base md:text-lg font-semibold transition-colors duration-300 ${
                      openIndex === index ? 'text-blue-700' : 'text-gray-900 group-hover:text-blue-600'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  
                  {/* Animated Toggle Icon */}
                  <div className={`flex-shrink-0 transition-all duration-300 ${
                    openIndex === index ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
                  }`}>
                    {openIndex === index ? (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                        <Minus className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 group-hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors duration-300">
                        <Plus className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                      </div>
                    )}
                  </div>
                </button>
                
                {/* Animated Answer with Smooth Expand/Collapse */}
                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    openIndex === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                  style={{
                    overflow: 'hidden'
                  }}
                >
                  <div className="px-6 md:px-8 pb-6">
                    <div className="border-t-2 border-blue-100 pt-6">
                      <p className={`text-gray-600 leading-relaxed transition-all duration-500 ${
                        openIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(3deg);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) rotate(-3deg);
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
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default FAQ;