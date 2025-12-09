import { useEffect, useRef, useState } from "react";
import {
  Utensils,
  Heart,
  Scissors,
  ShoppingBag,
  Car,
  Home,
  Dumbbell,
  GraduationCap,
} from "lucide-react";

const Industries = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [statsVisible, setStatsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const industries = [
    {
      icon: <Utensils className="w-8 h-8" />,
      name: "Restaurants",
      description: "Cafes, Fine Dining, Fast Food",
      color: "from-red-500 to-orange-500",
      bgColor: "from-red-50 to-orange-50",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      name: "Healthcare",
      description: "Hospitals, Clinics, Dental",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      name: "Beauty & Wellness",
      description: "Salons, Spas, Barbershops",
      color: "from-pink-500 to-purple-500",
      bgColor: "from-pink-50 to-purple-50",
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      name: "Retail Stores",
      description: "Clothing, Electronics, Grocery",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      icon: <Car className="w-8 h-8" />,
      name: "Automotive",
      description: "Repair Shops, Dealerships",
      color: "from-gray-600 to-gray-700",
      bgColor: "from-gray-50 to-gray-100",
    },
    {
      icon: <Home className="w-8 h-8" />,
      name: "Home Services",
      description: "Plumbing, Cleaning, Repair",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      name: "Fitness",
      description: "Gyms, Yoga Studios, Sports",
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      name: "Education",
      description: "Schools, Coaching, Training",
      color: "from-teal-500 to-green-500",
      bgColor: "from-teal-50 to-green-50",
    },
  ];

  // Intersection Observer for main section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stagger card animations
            industries.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 150);
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

  // Intersection Observer for stats section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
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
              Industries We{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent animate-gradient-x">
                Serve
              </span>
            </h2>
            <p
              className={`text-xl text-gray-600 max-w-3xl mx-auto transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              Our AI Review System works perfectly for any local business.
              <br /> Customized review generation for every industry.
            </p>
          </div>

          {/* Industries Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {industries.map((industry, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform border border-gray-100 hover:border-blue-200 overflow-hidden ${
                  visibleCards.includes(index)
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-12 opacity-0 scale-95"
                } hover:-translate-y-2 hover:scale-105`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Animated background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${industry.bgColor} opacity-0 group-hover:opacity-100 transition-all duration-500`}
                ></div>

                {/* Floating particles effect */}
                {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
                      style={{
                        top: `${20 + i * 20}%`,
                        left: `${10 + i * 30}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${2 + i}s`,
                      }}
                    ></div>
                  ))}
                </div> */}

                {/* Icon with enhanced animation */}
                <div
                  className={`relative w-16 h-16 bg-gradient-to-r ${
                    industry.color
                  } rounded-2xl flex items-center justify-center text-white mb-4 transition-all duration-500 z-10 ${
                    visibleCards.includes(index) ? "animate-bounce-in" : ""
                  } group-hover:scale-110 group-hover:rotate-6`}
                >
                  <div className="relative z-10 transition-transform duration-300 group-hover:scale-125">
                    {industry.icon}
                  </div>
                  {/* Pulse effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
                  {/* Ring effect */}
                  <div className="absolute -inset-2 border-2 border-transparent group-hover:border-blue-300 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                </div>

                {/* Content with staggered animation */}
                <div className="relative z-10">
                  <h3
                    className={`text-lg font-bold text-gray-900 mb-2 transition-all duration-500 ${
                      visibleCards.includes(index)
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    } group-hover:text-blue-700`}
                  >
                    {industry.name}
                  </h3>
                  <p
                    className={`text-gray-600 text-sm transition-all duration-700 ${
                      visibleCards.includes(index)
                        ? "translate-x-0 opacity-100"
                        : "translate-x-6 opacity-0"
                    } group-hover:text-gray-700`}
                  >
                    {industry.description}
                  </p>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out"></div>
              </div>
            ))}
          </div>

          {/* Stats Section with Enhanced Animation */}
          <div
            ref={statsRef}
            className={`bg-white rounded-3xl p-8 shadow-xl relative overflow-hidden transform transition-all duration-1000 ${
              statsVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-12 opacity-0 scale-95"
            }`}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 opacity-50"></div>

            <div className="grid md:grid-cols-3 gap-8 text-center relative z-10">
              {[
                {
                  number: "50+",
                  label: "Businesses Using AI Reviews",
                  gradient: "from-blue-600 to-green-600",
                  delay: "0ms",
                },
                {
                  number: "10K+",
                  label: "Reviews Generated",
                  gradient: "from-purple-600 to-pink-600",
                  delay: "200ms",
                },
                {
                  number: "200%",
                  label: "Average Review Increase",
                  gradient: "from-orange-600 to-red-600",
                  delay: "400ms",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`group transform transition-all duration-1000 ${
                    statsVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: stat.delay }}
                >
                  <div
                    className={`text-5xl font-bold bg-gradient-to-r ${
                      stat.gradient
                    } bg-clip-text text-transparent mb-2 transition-all duration-500 group-hover:scale-110 ${
                      statsVisible ? "animate-count-up" : ""
                    }`}
                  >
                    {stat.number}
                  </div>
                  <p className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">
                    {stat.label}
                  </p>
                  {/* Animated underline */}
                  <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mt-2 transition-all duration-500"></div>
                </div>
              ))}
            </div>

            {/* Floating elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-60"></div>
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
            transform: translateY(-15px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(-5deg);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-180deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.1) rotate(-10deg);
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

        @keyframes count-up {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
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

        .animate-count-up {
          animation: count-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Industries;
