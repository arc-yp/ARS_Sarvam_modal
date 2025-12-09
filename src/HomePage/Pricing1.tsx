import { Check, Award, ArrowRight, Sparkles } from "lucide-react";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="py-6 sm:py-16 bg-white relative overflow-hidden"
    >
      {/* Diwali Banner */}
      <div className="absolute top-0 left-0 w-full flex justify-center z-20 pointer-events-none">
        <div className="flex items-center gap-2 sm:gap-4 bg-gradient-to-r from-yellow-400 via-pink-300 to-orange-400 px-4 sm:px-8 py-3 sm:py-4 rounded-b-2xl sm:rounded-b-3xl shadow-lg border-b-4 border-yellow-500">
          <img
            src="/diwali-lamp.png"
            alt="Diwali Lamp"
            className="w-10 h-10 sm:w-14 sm:h-14 mr-1 sm:mr-2"
          />
          <span className="text-base sm:text-xl md:text-2xl font-extrabold text-red-500 tracking-wide flex items-center gap-1 sm:gap-2">
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white animate-pulse" />
            Diwali Dhamaka Offer – Save Big This Festive Season!
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white animate-pulse" />
          </span>
          <img
            src="/diwali-lamp.png"
            alt="Diwali Lamp"
            className="w-10 h-10 sm:w-14 sm:h-14 ml-1 sm:ml-2"
          />
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-6 mt-16 sm:mt-8 relative z-10">
        <div className="text-center mb-10 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-700 drop-shadow-lg">
            Simple, Transparent Pricing Plans
          </h2>
          <p className="text-yellow-900 mt-2 font-semibold text-sm sm:text-base">
            Celebrate Diwali with exclusive discounts and festive benefits!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* First Year Plan */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-8 border-2 border-yellow-300 hover:border-yellow-400 relative">
            <div className="absolute -top-4 left-8 sm:left-12 md:left-1/2 md:-translate-x-1/2 md:top-[-18px] flex justify-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 text-gray-900 text-xs sm:text-sm md:text-base font-extrabold shadow ring-2 ring-amber-300/60 backdrop-blur border border-amber-200">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-amber-700" />{" "}
                <span className="tracking-tight leading-tight">
                  Diwali Special Offer
                </span>
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center">
              Go For Review Plan
            </h3>
            <div className="text-center mt-2 mb-1">
              <span className="text-base sm:text-xl md:text-2xl font-semibold text-gray-400 line-through mr-2">
                ₹10,500
              </span>
              <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-blue-700">
                ₹9,500
              </span>
              <span className="text-lg sm:text-2xl font-extrabold text-blue-700">
                /-
              </span>
            </div>
            <div className="text-center mb-2">
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                Limited Time Offer
              </span>
            </div>
            <p className="text-center text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
              One-time payment for the first year
            </p>

            <ul className="space-y-2 sm:space-y-3 list-none text-sm sm:text-base">
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Custom QR code for your business</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>AI-generated personalized reviews</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Mobile-optimized review page</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Direct Google Reviews integration</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Unlimited scans & reviews</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>24/7 WhatsApp support</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Free updates & improvements</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Setup within 24 hours</span>
              </li>
            </ul>

            <div className="mt-4 sm:mt-6">
              <div className="flex items-center gap-2 rounded-xl bg-yellow-50 border border-yellow-200 px-3 sm:px-4 py-2 sm:py-3 text-yellow-800 text-xs sm:text-sm">
                <span className="text-yellow-600">🔒</span>
                FREE Premium Standee included
              </div>
            </div>

            <a
              href="/#lead-form"
              className="mt-4 sm:mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold shadow-lg transition-all text-sm sm:text-base"
            >
              Get Your QR Code Now{" "}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>

          {/* Renewal Plan */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-8 border border-gray-100 hover:border-gray-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center">
              Renewal from Second Year
            </h3>
            <div className="text-center mt-2 mb-1">
              <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-blue-700">
                ₹2,000
              </span>
              <span className="text-lg sm:text-2xl font-extrabold text-blue-700">
                /-
              </span>
            </div>
            <p className="text-center text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
              Annual renewal for continued access
            </p>

            <ul className="space-y-2 sm:space-y-3 list-none text-sm sm:text-base">
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Continued QR code access (no downtime)</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Keep unlimited scans & reviews active</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Ongoing access to AI review generator</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Lifetime support & future upgrades</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Google review page remains live</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-700">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Annual platform maintenance & security updates</span>
              </li>
            </ul>

            <a
              href="/renewalplanform"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold shadow-lg transition-all text-sm sm:text-base"
            >
              Renew Your Access <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>

        <div className="text-center text-gray-700 mt-8 sm:mt-10 font-medium text-sm sm:text-base">
          • Start with the first year plan, then enjoy affordable renewals
        </div>
        <p className="text-center text-gray-600 mt-2 max-w-3xl mx-auto text-xs sm:text-base">
          Get everything you need to transform your business reputation. No
          contracts, no hidden fees, just results.
        </p>
      </div>

      {/* Festive floating lamps at corners */}
      <img
        src="/diwali-lamp.png"
        alt="Lamp"
        className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 w-10 h-10 sm:w-16 sm:h-16 opacity-80 pointer-events-none"
      />
      <img
        src="/diwali-lamp.png"
        alt="Lamp"
        className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 w-10 h-10 sm:w-16 sm:h-16 opacity-80 pointer-events-none"
      />

      {/* Festive confetti animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="animate-confetti">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Custom Styles for Confetti */}
      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(-100px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        @keyframes confetti-left {
          0% {
            transform: translateY(-100px) translateX(-20px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) translateX(20px) rotate(360deg);
          }
        }
        @keyframes confetti-right {
          0% {
            transform: translateY(-100px) translateX(20px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) translateX(-20px) rotate(360deg);
          }
        }
        .animate-confetti {
          position: absolute;
          left: 0;
          top: 0;
          width: 100vw;
          height: 0;
          pointer-events: none;
        }
        .animate-confetti::before,
        .animate-confetti::after {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #ffd700 60%, transparent 100%);
          border-radius: 50%;
          left: 10vw;
          animation: confetti 4s infinite linear;
        }
        .animate-confetti::after {
          left: 80vw;
          background: radial-gradient(circle, #ff69b4 60%, transparent 100%);
          animation-delay: 1.5s;
        }
        /* Additional confetti particles */
        .animate-confetti {
          position: relative;
        }
        .animate-confetti > div:nth-child(1) {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #ff8c00 60%, transparent 100%);
          border-radius: 50%;
          left: 25vw;
          animation: confetti-left 3.5s infinite linear;
          animation-delay: 0.5s;
        }
        .animate-confetti > div:nth-child(2) {
          position: absolute;
          width: 12px;
          height: 12px;
          background: radial-gradient(circle, #00ff88 60%, transparent 100%);
          border-radius: 50%;
          left: 45vw;
          animation: confetti 3s infinite linear;
          animation-delay: 1s;
        }
        .animate-confetti > div:nth-child(3) {
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #ff1493 60%, transparent 100%);
          border-radius: 50%;
          left: 60vw;
          animation: confetti-right 4.5s infinite linear;
          animation-delay: 2s;
        }
        .animate-confetti > div:nth-child(4) {
          position: absolute;
          width: 9px;
          height: 9px;
          background: radial-gradient(circle, #9370db 60%, transparent 100%);
          border-radius: 50%;
          left: 35vw;
          animation: confetti-left 4s infinite linear;
          animation-delay: 0.8s;
        }
        .animate-confetti > div:nth-child(5) {
          position: absolute;
          width: 11px;
          height: 11px;
          background: radial-gradient(circle, #ffa500 60%, transparent 100%);
          border-radius: 50%;
          left: 70vw;
          animation: confetti 3.8s infinite linear;
          animation-delay: 1.2s;
        }
        .animate-confetti > div:nth-child(6) {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #00ced1 60%, transparent 100%);
          border-radius: 50%;
          left: 15vw;
          animation: confetti-right 3.2s infinite linear;
          animation-delay: 1.8s;
        }
        .animate-confetti > div:nth-child(7) {
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #ff4500 60%, transparent 100%);
          border-radius: 50%;
          left: 55vw;
          animation: confetti-left 4.2s infinite linear;
          animation-delay: 0.3s;
        }
        .animate-confetti > div:nth-child(8) {
          position: absolute;
          width: 12px;
          height: 12px;
          background: radial-gradient(circle, #ffd700 60%, transparent 100%);
          border-radius: 50%;
          left: 90vw;
          animation: confetti 3.6s infinite linear;
          animation-delay: 2.5s;
        }
      `}</style>
    </section>
  );
};

export default Pricing;
