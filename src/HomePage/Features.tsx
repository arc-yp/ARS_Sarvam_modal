import { useEffect, useState, useRef } from "react";
import {
  Star,
  Globe,
  Copy,
  QrCode,
  Smartphone,
  RefreshCw,
  X,
} from "lucide-react";

const Features = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [demoVisible, setDemoVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  // Close modal on ESC and lock scroll when open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVideoOpen(false);
    };
    if (isVideoOpen) {
      window.addEventListener("keydown", onKeyDown);
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = original;
      };
    }
    return () => {};
  }, [isVideoOpen]);

  // Intersection Observer for main section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stagger card animations
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for demo section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDemoVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (demoRef.current) {
      observer.observe(demoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Smart Rating System",
      description:
        "AI generates reviews based on 1-5 star ratings with contextual understanding",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multilingual Support",
      description:
        "English and Hindi reviews (all in Roman script for easy reading)",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Copy className="w-6 h-6" />,
      title: "One-Click Copy & Paste",
      description:
        "Generated reviews can be copied and posted to Google Reviews instantly",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "QR Code System",
      description:
        "Unique QR codes and links for each business - easy customer access",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "SEO Ranking",
      description:
        "Boost your Google My Business (GMB) ranking with more frequent, high-quality reviews that improve your local search visibility.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Unique Content",
      description:
        "No duplicate reviews - each AI-generated review is unique and natural",
      color: "from-teal-500 to-green-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float"></div>
        <div className="absolute bottom-40 left-10 w-40 h-40 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-4 opacity-0 scale-95"
              }`}
            >
              <span className="animate-pulse mr-2">✨</span>
              Powerful Features
            </div>
            <h2
              className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent animate-gradient-x">
                {" "}
                Boost Reviews
              </span>
            </h2>
            <p
              className={`text-xl text-gray-600 max-w-3xl mx-auto transform transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              Our AI Review System comes packed with features designed to make
              collecting authentic Google reviews effortless for your business.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform border border-gray-100 hover:border-blue-200 overflow-hidden ${
                  visibleCards.includes(index)
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-12 opacity-0 scale-95"
                } hover:-translate-y-4 hover:scale-105`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  animationDelay: `${index * 200}ms`,
                }}
              >
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Floating particles effect */}
                {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
                      style={{
                        top: `${15 + i * 20}%`,
                        left: `${10 + i * 25}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: `${2 + i * 0.5}s`,
                      }}
                    ></div>
                  ))}
                </div> */}

                {/* Icon with enhanced animation */}
                <div
                  className={`relative w-12 h-12 bg-gradient-to-r ${
                    feature.color
                  } rounded-xl flex items-center justify-center text-white mb-6 transition-all duration-500 z-10 ${
                    visibleCards.includes(index) ? "animate-bounce-in" : ""
                  } group-hover:scale-125 group-hover:rotate-12`}
                >
                  <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  {/* Pulse ring effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
                  <div className="absolute -inset-1 border-2 border-transparent group-hover:border-blue-300/50 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 animate-ping"></div>
                </div>

                {/* Content with staggered animation */}
                <div className="relative z-10">
                  <h3
                    className={`text-xl font-bold text-gray-900 mb-4 transition-all duration-500 ${
                      visibleCards.includes(index)
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    } group-hover:text-blue-700`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-gray-600 leading-relaxed transition-all duration-700 ${
                      visibleCards.includes(index)
                        ? "translate-x-0 opacity-100"
                        : "translate-x-6 opacity-0"
                    } group-hover:text-gray-700`}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out"></div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Demo Preview Section with Enhanced Animation */}
          <div
            ref={demoRef}
            className={`relative bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden transform transition-all duration-1000 ${
              demoVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-12 opacity-0 scale-95"
            }`}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-32 h-32 border border-white rounded-full animate-pulse"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + i}s`,
                  }}
                ></div>
              ))}
            </div>

            <div className="relative z-10">
              <h3
                className={`text-3xl font-bold mb-4 transform transition-all duration-1000 delay-200 ${
                  demoVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                See It In Action
              </h3>
              <p
                className={`text-xl opacity-90 mb-8 max-w-2xl mx-auto transform transition-all duration-1000 delay-400 ${
                  demoVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                Watch how our AI generates natural, authentic reviews that help
                your business grow its online reputation.
              </p>
              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-1000 delay-600 ${
                  demoVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="mr-2 transition-transform duration-300 group-hover:scale-125">
                    📱
                  </span>
                  View Live Demo
                </button>
                <a
                  href="tel:+919909908230"
                  className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="mr-2 transition-transform duration-300 group-hover:rotate-12">
                    📞
                  </span>
                  Call Now
                </a>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-6 right-6 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Video Lightbox Modal with Enhanced Animation */}
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
              className="absolute -top-10 right-0 sm:top-3 sm:right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:scale-110 hover:rotate-90 transition-all duration-300 z-10"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
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
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-180deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(-10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out forwards;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Features;
