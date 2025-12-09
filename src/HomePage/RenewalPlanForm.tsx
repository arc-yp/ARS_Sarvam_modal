import { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  CalendarClock,
  Phone,
  Send,
  Sparkles,
  Mail,
  MapPin,
  Loader2,
} from "lucide-react";
import Footer from "./Footer";
import { pricingService } from "../utils/pricingService";

const RenewalPlanForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    whatsapp: "",
    date: "",
    notes: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [renewalPrice, setRenewalPrice] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    // Fetch renewal plan price from database
    const fetchRenewalPrice = async () => {
      setPriceLoading(true);
      try {
        const renewalPlan = await pricingService.getPlanByType("renewal");
        if (renewalPlan) {
          setRenewalPrice(renewalPlan.current_price);
        } else {
          setRenewalPrice(10500); // Fallback price
        }
      } catch (error) {
        console.error("Error fetching renewal price:", error);
        setRenewalPrice(10500); // Fallback price
      } finally {
        setPriceLoading(false);
      }
    };

    fetchRenewalPrice();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-8 px-1 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute bottom-40 left-10 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Back Button with Animation */}
          <div
            className={`mb-10 flex flex-col md:flex
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <a
              href="/#pricing"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-all duration-300 hover:gap-3"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Pricing
            </a>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 items-stretch">
            {/* Summary Card with Enhanced Design */}
            <div
              className={`lg:col-span-2 bg-white/90 backdrop-blur-xl rounded-3xl border-2 border-blue-100 shadow-2xl p-8 relative overflow-hidden transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-12 opacity-0 scale-95"
              } hover:shadow-3xl hover:border-blue-200`}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-emerald-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/20 to-blue-400/20 rounded-full blur-2xl"></div>

              <div className="relative z-10 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold mb-4 shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    RENEWAL PLAN
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                    Renewal Plan Summary
                  </h1>
                  <p className="text-gray-600 mt-3 leading-relaxed">
                    Keep your AI Review System active without re-submitting
                    business details.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                      ),
                      text: "Unlimited QR scans & review generation stays live",
                      color: "green",
                    },
                    {
                      icon: (
                        <ShieldCheck className="w-5 h-5 text-blue-500 mt-1" />
                      ),
                      text: "Continued platform maintenance, security, and upgrades",
                      color: "blue",
                    },
                    {
                      icon: (
                        <CalendarClock className="w-5 h-5 text-purple-500 mt-1" />
                      ),
                      text: "Renewal processed within 12 working hours after confirmation",
                      color: "purple",
                    },
                    {
                      icon: <Phone className="w-5 h-5 text-amber-500 mt-1" />,
                      text: "Dedicated WhatsApp & call support throughout the year",
                      color: "amber",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-sm text-gray-700 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="transition-transform duration-300 group-hover:scale-125">
                        {item.icon}
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50 px-6 py-5 text-sm text-emerald-900 shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Annual Renewal Fee:</span>
                      {priceLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                          <span className="text-sm text-emerald-600">
                            Loading...
                          </span>
                        </div>
                      ) : (
                        <span className="text-3xl font-extrabold bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent">
                          ₹{renewalPrice?.toLocaleString("en-IN")}/-
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-emerald-700 mt-2">
                      Inclusive of all services & support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Form with Enhanced Design */}
            <div
              className={`lg:col-span-3 bg-white rounded-3xl border-2 border-gray-100 shadow-2xl p-8 md:p-10 relative overflow-hidden transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-12 opacity-0 scale-95"
              }`}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-emerald-400/10 to-blue-400/10 rounded-tr-full"></div>

              <div className="mb-8 relative z-10">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                  Renewal Confirmation
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Quick renewal request
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We just need confirmation that you'd like to renew. A
                  relationship manager will reach out for payment.
                </p>
              </div>

              <form
                className="space-y-6 relative z-10"
                onSubmit={(event) => {
                  event.preventDefault();
                  const selectedDate = formData.date
                    ? new Date(formData.date)
                    : new Date();
                  const formattedDate = selectedDate.toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  );
                  const message = [
                    "🔄 Renewal Request – AI Review System",
                    "",
                    "I am interested in renewing my AI Review System plan.",
                    "",
                    `👤 Name: ${formData.name}`,
                    `🏢 Business: ${formData.business}`,
                    `📧 Email: ${formData.email}`,
                    `📱 WhatsApp: ${formData.whatsapp}`,
                    `📅 Preferred Renewal Date: ${formattedDate}`,
                    "",
                    `📝 Notes: ${formData.notes || "N/A"}`,
                  ].join("\n");
                  const encodedMessage = encodeURIComponent(message);
                  window.open(
                    `https://wa.me/919909908230?text=${encodedMessage}`,
                    "_blank"
                  );
                  setFormData({
                    name: "",
                    business: "",
                    email: "",
                    whatsapp: "",
                    date: "",
                    notes: "",
                  });
                }}
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300"
                      placeholder="e.g. Rajesh Patel"
                      value={formData.name}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                      Business Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300"
                      placeholder="e.g. Patel's Family Restaurant"
                      value={formData.business}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          business: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                      Registered Email
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300"
                      placeholder="name@business.com"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.whatsapp}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          whatsapp: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                    Preferred renewal date{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="date"
                    className="w-full md:w-1/2 rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300"
                    value={formData.date}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        date: event.target.value,
                      }))
                    }
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                    Any notes for our team{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none hover:border-gray-300"
                    placeholder="Let us know if you need invoice, GST details, or have special requests."
                    value={formData.notes}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        notes: event.target.value,
                      }))
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full md:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white px-10 py-4 rounded-xl font-bold shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  Send Renewal Request
                </button>
              </form>

              <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg relative z-10">
                <p className="text-sm text-blue-800 leading-relaxed">
                  <span className="font-semibold">⚡ Quick Response:</span>{" "}
                  We'll confirm your renewal within 12 working hours and share
                  the secure payment link on your registered WhatsApp/email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(3deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) rotate(-3deg);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }

        .bg-pos-0 {
          background-position: 0% 50%;
        }

        .bg-pos-100:hover {
          background-position: 100% 50%;
        }
      `}</style>
    </div>
  );
};

export default RenewalPlanForm;
