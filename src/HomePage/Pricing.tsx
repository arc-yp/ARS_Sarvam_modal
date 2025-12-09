import { Check, Award, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { pricingService, PricingPlan } from "../utils/pricingService";

const Pricing = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      setIsLoading(true);
      try {
        const fetchedPlans = await pricingService.getPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Error loading pricing plans:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPlans();
  }, []);

  if (isLoading) {
    return (
      <section
        id="pricing"
        className="py-10 sm:py-20 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Loading Pricing Plans
            </h3>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </div>
      </section>
    );
  }

  // Find the two plans by type
  const firstYearPlan = plans.find((p) => p.plan_type === "first_year");
  const renewalPlan = plans.find((p) => p.plan_type === "renewal");

  return (
    <section
      id="pricing"
      className="py-10 sm:py-20 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-[40%] sm:mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Simple, Transparent Pricing Plans
          </h2>
          <p className="text-gray-600 mt-2">
            No hidden charges. Just clear value that grows your business.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
          {/* First Year Plan */}
          {firstYearPlan && (
            <div
              className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 md:p-8 border-2 ${firstYearPlan.border_color} hover:border-yellow-400 relative`}
            >
              {firstYearPlan.badge_text && (
                <div className="absolute -top-4 left-12 md:left-1/2 md:-translate-x-1/2 md:top-[-18px] flex justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 text-gray-900 text-sm md:text-base font-extrabold shadow ring-2 ring-amber-300/60 backdrop-blur border border-amber-200">
                    {firstYearPlan.badge_icon && (
                      <Award className="w-4 h-4 text-amber-700" />
                    )}
                    <span className="tracking-tight leading-tight">
                      {firstYearPlan.badge_text}
                    </span>
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 text-center">
                {firstYearPlan.plan_name}
              </h3>
              <div className="text-center mt-2 mb-1">
                {firstYearPlan.original_price && (
                  <span className="text-xl md:text-2xl font-semibold text-gray-400 line-through mr-2">
                    {firstYearPlan.currency}
                    {firstYearPlan.original_price.toLocaleString()}
                  </span>
                )}
                <span className="text-4xl md:text-5xl font-extrabold text-blue-700">
                  {firstYearPlan.currency}
                  {firstYearPlan.current_price.toLocaleString()}
                </span>
                <span className="text-2xl font-extrabold text-blue-700">
                  /-
                </span>
              </div>
              {firstYearPlan.badge_text && (
                <div className="text-center mb-2">
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                    Limited Time Offer
                  </span>
                </div>
              )}
              <p className="text-center text-gray-500 mb-6">
                {firstYearPlan.duration_text}
              </p>

              <ul className="space-y-3 list-none">
                {firstYearPlan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {firstYearPlan.bonus_text && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3 text-yellow-800 text-sm">
                    <span className="text-yellow-600">🔒</span>
                    {firstYearPlan.bonus_text}
                  </div>
                </div>
              )}

              <a
                href={firstYearPlan.button_link}
                className={`mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${firstYearPlan.button_gradient} hover:opacity-90 text-white px-6 py-4 rounded-xl font-semibold shadow-lg transition-all`}
              >
                {firstYearPlan.button_text} <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          )}

          {/* Renewal Plan */}
          {renewalPlan && (
            <div
              className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 md:p-8 border ${renewalPlan.border_color} hover:border-gray-200`}
            >
              <h3 className="text-xl font-bold text-gray-900 text-center">
                {renewalPlan.plan_name}
              </h3>
              <div className="text-center mt-2 mb-1">
                <span className="text-4xl md:text-5xl font-extrabold text-blue-700">
                  {renewalPlan.currency}
                  {renewalPlan.current_price.toLocaleString()}
                </span>
                <span className="text-2xl font-extrabold text-blue-700">
                  /-
                </span>
              </div>
              <p className="text-center text-gray-500 mb-6">
                {renewalPlan.duration_text}
              </p>

              <ul className="space-y-3 list-none">
                {renewalPlan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={renewalPlan.button_link}
                className={`mt-8 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${renewalPlan.button_gradient} hover:opacity-90 text-white px-6 py-4 rounded-xl font-semibold shadow-lg transition-all`}
              >
                {renewalPlan.button_text} <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          )}
        </div>

        <div className="text-center text-gray-700 mt-10 font-medium">
          • Start with the first year plan, then enjoy affordable renewals
        </div>
        <p className="text-center text-gray-600 mt-2 max-w-3xl mx-auto">
          Get everything you need to transform your business reputation. No
          contracts, no hidden fees, just results.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
