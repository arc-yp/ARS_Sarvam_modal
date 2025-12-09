import { useEffect, useState } from "react";
import {
  CheckCircle,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  ArrowRight,
  Facebook,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/ai_review_system?igsh=MTIxdzZwaDJ5ZjdrYg==",
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:from-pink-600 hover:to-purple-700",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/share/1A4NKVy36W/",
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-700 hover:to-blue-800",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@AI_Review_System",
      color: "from-red-600 to-red-700",
      hoverColor: "hover:from-red-700 hover:to-red-800",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:aireviewsystem@gmail.com",
      color: "from-green-600 to-green-700",
      hoverColor: "hover:from-green-700 hover:to-green-800",
    },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Icon */}
          <div
            className={`inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-2xl transform transition-all duration-1000 ${
              isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            <CheckCircle className="w-14 h-14 text-white animate-bounce-slow" />
          </div>

          {/* Main Heading */}
          <div
            className={`transform transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Thank You!
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-8">
              Your Request Has Been Received
            </h2>
          </div>

          {/* Message */}
          <div
            className={`transform transition-all duration-1000 delay-400 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="bg-white/80 backdrop-blur border border-white/50 rounded-2xl shadow-xl p-8 mb-8">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                We've received your information and our team will get back to
                you within{" "}
                <span className="font-semibold text-blue-600">24 hours</span>.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                In the meantime, feel free to explore more about our AI Review
                System or reach out to us directly on WhatsApp if you have any
                urgent questions.
              </p>
            </div>
          </div>

          {/* What's Next Section */}
          <div
            className={`transform transition-all duration-1000 delay-600 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 mb-8 border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                What Happens Next?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg mb-3">
                    1
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Review</h4>
                  <p className="text-sm text-gray-600">
                    Our team reviews your requirements carefully
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg mb-3">
                    2
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Connect</h4>
                  <p className="text-sm text-gray-600">
                    We'll reach out via phone or WhatsApp
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg mb-3">
                    3
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Demo</h4>
                  <p className="text-sm text-gray-600">
                    Schedule a personalized demo session
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div
            className={`transform transition-all duration-1000 delay-800 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="bg-white/60 backdrop-blur rounded-2xl p-8 mb-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Stay Connected With Us
              </h3>
              <p className="text-gray-600 mb-6">
                Follow us on social media for updates, tips, and exclusive
                offers!
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group bg-gradient-to-r ${social.color} ${social.hoverColor} text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl flex items-center justify-center`}
                    title={social.name}
                  >
                    <social.icon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={handleGoHome}
              className="group bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center justify-center"
            >
              Back to Home
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

          {/* Support Info */}
          <div
            className={`mt-12 transform transition-all duration-1000 delay-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-sm text-gray-500 mb-2">
              Need immediate assistance?
            </p>
            <p className="text-base text-gray-700">
              Call us at{" "}
              <a
                href="tel:+919909908230"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                +91 99099 08230
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .bg-grid-pattern {
          background-image: radial-gradient(
            circle,
            #00000008 1px,
            transparent 1px
          );
          background-size: 24px 24px;
        }
      `}</style>
    </section>
  );
};

export default ThankYouPage;
