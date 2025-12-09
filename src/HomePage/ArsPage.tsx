import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Star, ArrowRight, Play, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Pricing from "./ars/Pricing1";
import FAQ from "./FAQ";

const ArsPage = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const initialFormState = {
    name: "",
    phone: "",
    businessName: "",
    businessType: "",
    services: "",
    city: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const whatsappNumber = "919909908230";

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [   
      "Hey,",
      "Interested in: AI Review System demo",
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Business Name: ${formData.businessName}`,
      `Business Type: ${formData.businessType}`,
      `Services: ${formData.services}`,
      `City: ${formData.city}`,
      "--New enquiry from ARS Page--",
    ].join("\n");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    setFormData(initialFormState);
    
    // Navigate to thank you page
    navigate("/thanks-you");
  };

  const scrollToLeadForm = () => {
    const leadFormElement = document.querySelector(
      "#hero-lead-form, #lead-form"
    );
    if (leadFormElement) {
      leadFormElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
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
      if (e.key === "Escape") setIsVideoOpen(false);
    };
    if (isVideoOpen) {
      window.addEventListener("keydown", onKeyDown);
      // lock body scroll
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = original;
      };
    }
    return () => {};
  }, [isVideoOpen]);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-8 pb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto mt-4  ">
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
                    "/testimonials/bina- krishnaa tourism.webp",
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

            {/* Right Column - Lead Form */}
            <div
              className={`relative flex justify-center lg:justify-end transform transition-all duration-1200 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-12 opacity-0"
              }`}
            >
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg lg:max-w-xl bg-white/90 backdrop-blur border border-white/50 rounded-3xl shadow-2xl p-8 space-y-6"
              >
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Get Started Today
                  </h3>
                  <p className="text-sm text-gray-500">
                    Share a few details and our team will reach out within 24
                    hours.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-1.5">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      required
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      required
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label
                      htmlFor="businessName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Business Name
                    </label>
                    <input
                      id="businessName"
                      name="businessName"
                      type="text"
                      placeholder="Acme Digital Solutions"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      required
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label
                      htmlFor="businessType"
                      className="text-sm font-medium text-gray-700"
                    >
                      Type of Business
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      required
                    >
                      <option value="" disabled>
                        Select business type
                      </option>
                      <option value="retail">Retail</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="professional-services">
                        Professional Services
                      </option>
                      <option value="healthcare">Healthcare</option>
                      <option value="home-services">Home Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="grid gap-1.5">
                    <label
                      htmlFor="services"
                      className="text-sm font-medium text-gray-700"
                    >
                      Services Offered
                    </label>
                    <input
                      id="services"
                      name="services"
                      type="text"
                      placeholder="e.g., Digital Marketing, SEO, PPC"
                      value={formData.services}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      required
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="mumbai"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-lg rounded-xl px-6 py-3 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
                >
                  Submit Details
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to our privacy policy and consent to
                  receive follow-up communication.
                </p>
              </form>
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

        @keyframes pulse-slow {
          0%,
          100% {
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

      <Features/>
      <Testimonials/>
      <Pricing/>
      <FAQ/>
      <Footer />
    
    </section>
  );
};

export default ArsPage;
