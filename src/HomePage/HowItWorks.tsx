import { useEffect, useRef, useState } from "react";
import { QrCode, Star, Copy, Share2 } from "lucide-react";

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "Share QR Code",
      description:
        "Customer scans your unique QR code or clicks your link after their visit",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Rate Experience",
      description:
        "They select 1-5 stars and choose their business category and language",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    },
    {
      icon: <Copy className="w-8 h-8" />,
      title: "AI Generates Review",
      description:
        "Our AI creates a unique, natural-sounding review in seconds",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "One-Click Posting",
      description:
        "Customer copies and posts the review directly to Google with one tap",
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stagger card animations
            steps.forEach((_, index) => {
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

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-20 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              How It{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent animate-gradient-x">
                Works
              </span>
            </h2>
            <p
              className={`text-xl text-gray-600 max-w-3xl mx-auto transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              Get more Google reviews in 4 simple steps.
              <br /> No technical knowledge required just share and watch your
              reviews grow!
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connection Line with Animation */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 z-0">
                    <div
                      className={`h-full bg-gradient-to-r from-gray-300 to-transparent transform transition-all duration-1000 ${
                        visibleCards.includes(index)
                          ? "scale-x-100"
                          : "scale-x-0"
                      } origin-left`}
                    ></div>
                    {/* Animated dot */}
                    <div
                      className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full transition-all duration-500 ${
                        visibleCards.includes(index + 1)
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-0"
                      }`}
                    ></div>
                  </div>
                )}

                <div
                  className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform border border-gray-100 group-hover:border-blue-200 overflow-hidden ${
                    visibleCards.includes(index)
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-12 opacity-0 scale-95"
                  } hover:-translate-y-2 hover:scale-105`}
                >
                  {/* Animated background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-0 group-hover:opacity-100 transition-all duration-500`}
                  ></div>

                  {/* Step Number with Enhanced Animation */}
                  <div
                    className={`absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 shadow-lg ${
                      visibleCards.includes(index)
                        ? "animate-bounce-in"
                        : "opacity-0 scale-0"
                    } group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-xl z-20`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                    }}
                  >
                    <span className="relative z-10 mr-1 transition-transform duration-300 group-hover:scale-110">
                      {index + 1}
                    </span>
                    {/* Animated ring effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-green-600 opacity-0 group-hover:opacity-30 animate-ping"></div>
                  </div>

                  {/* Icon with Enhanced Animation */}
                  <div
                    className={`relative w-16 h-16 bg-gradient-to-r ${
                      step.color
                    } rounded-2xl flex items-center justify-center text-white mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                      visibleCards.includes(index) ? "animate-scale-in" : ""
                    }`}
                  >
                    <div className="relative z-10 transition-transform duration-300 group-hover:scale-125">
                      {step.icon}
                    </div>
                    {/* Animated pulse effect */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
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
                      {step.title}
                    </h3>
                    <p
                      className={`text-gray-600 leading-relaxed transition-all duration-700 ${
                        visibleCards.includes(index)
                          ? "translate-x-0 opacity-100"
                          : "translate-x-6 opacity-0"
                      } group-hover:text-gray-700`}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA with Animation */}
          <div
            className={`text-center mt-16 transform transition-all duration-1000 delay-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-green-50 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group border border-blue-100 hover:border-blue-200">
              <span className="text-2xl mr-3 animate-pulse group-hover:animate-bounce">
                ⚡
              </span>
              <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                Setup takes less than 5 minutes!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
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
            transform: scale(0) rotate(-360deg);
          }
          60% {
            opacity: 1;
            transform: scale(1.3) rotate(-20deg);
          }
          80% {
            transform: scale(0.9) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1) rotate(5deg);
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
