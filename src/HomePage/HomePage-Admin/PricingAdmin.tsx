import React, { useState, useEffect } from 'react';
import { 
  Save, 
  RefreshCw, 
  Loader2, 
  Check, 
  ArrowLeft,
  Award,
  Plus,
  Trash2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { pricingService, PricingPlan } from '../../utils/pricingService';

export const PricingAdmin: React.FC = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    setIsLoading(true);
    try {
      const fetchedPlans = await pricingService.getPlans();
      setPlans(fetchedPlans);
    } catch (error) {
      console.error('Error loading pricing plans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePlan = async (plan: PricingPlan) => {
    setIsSaving(plan.id);
    try {
      const success = await pricingService.updatePlan(plan);
      if (success) {
        setSuccessMessage(`${plan.plan_name} updated successfully!`);
        setTimeout(() => setSuccessMessage(null), 3000);
        await loadPlans();
      } else {
        alert('Failed to update pricing plan. Please try again.');
      }
    } catch (error) {
      console.error('Error updating plan:', error);
      alert('Failed to update pricing plan. Please try again.');
    } finally {
      setIsSaving(null);
    }
  };

  const handleFieldChange = (planId: string, field: keyof PricingPlan, value: string | number | boolean | null) => {
    setPlans(prevPlans =>
      prevPlans.map(plan =>
        plan.id === planId ? { ...plan, [field]: value } : plan
      )
    );
  };

  const handleFeatureChange = (planId: string, index: number, value: string) => {
    setPlans(prevPlans =>
      prevPlans.map(plan => {
        if (plan.id === planId) {
          const newFeatures = [...plan.features];
          newFeatures[index] = value;
          return { ...plan, features: newFeatures };
        }
        return plan;
      })
    );
  };

  const handleAddFeature = (planId: string) => {
    setPlans(prevPlans =>
      prevPlans.map(plan => {
        if (plan.id === planId) {
          return { ...plan, features: [...plan.features, ''] };
        }
        return plan;
      })
    );
  };

  const handleRemoveFeature = (planId: string, index: number) => {
    setPlans(prevPlans =>
      prevPlans.map(plan => {
        if (plan.id === planId) {
          const newFeatures = plan.features.filter((_, i) => i !== index);
          return { ...plan, features: newFeatures };
        }
        return plan;
      })
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Loading Pricing Plans</h1>
          <p className="text-slate-400">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/ai-admin"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Pricing Management
              </h1>
              <p className="text-slate-300">
                Edit pricing plans that appear on your website
              </p>
            </div>
            
            <button
              onClick={loadPlans}
              className="inline-flex items-center px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center">
            <Check className="w-5 h-5 text-green-400 mr-3" />
            <span className="text-green-300">{successMessage}</span>
          </div>
        )}

        {/* Info Alert */}
        <div className="mb-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
          <div className="text-blue-200 text-sm">
            <p className="font-semibold mb-1">Important Notes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>These are the only two pricing plans shown on your website</li>
              <li>You can edit all content but cannot add or remove plans</li>
              <li>Changes are saved immediately when you click "Save Changes"</li>
              <li>Preview the cards below before saving</li>
            </ul>
          </div>
        </div>

        {/* Pricing Plans Editor */}
        <div className="grid lg:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              {/* Plan Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  {plan.is_featured && <Award className="w-6 h-6 mr-2 text-yellow-400" />}
                  Edit {plan.plan_type === 'first_year' ? 'First Year' : 'Renewal'} Plan
                </h2>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Plan Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    value={plan.plan_name}
                    onChange={(e) => handleFieldChange(plan.id, 'plan_name', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Plan name"
                  />
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Original Price (optional)
                    </label>
                  <input
                    type="number"
                    value={plan.original_price || ''}
                    onChange={(e) => handleFieldChange(plan.id, 'original_price', e.target.value ? parseInt(e.target.value) : null)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="12500"
                    title="Original price (for strikethrough display)"
                  />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Current Price *
                    </label>
                    <input
                      type="number"
                      value={plan.current_price}
                      onChange={(e) => handleFieldChange(plan.id, 'current_price', parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      title="Current selling price"
                    />
                  </div>
                </div>

                {/* Duration Text */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Duration Text
                  </label>
                  <input
                    type="text"
                    value={plan.duration_text}
                    onChange={(e) => handleFieldChange(plan.id, 'duration_text', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Duration description text"
                  />
                </div>

                {/* Badge (only for featured plans) */}
                {plan.is_featured && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Badge Text
                      </label>
                      <input
                        type="text"
                        value={plan.badge_text || ''}
                        onChange={(e) => handleFieldChange(plan.id, 'badge_text', e.target.value)}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Diwali Special Offer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Badge Icon (emoji)
                      </label>
                      <input
                        type="text"
                        value={plan.badge_icon || ''}
                        onChange={(e) => handleFieldChange(plan.id, 'badge_icon', e.target.value)}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="🎁"
                      />
                    </div>
                  </div>
                )}

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Features
                  </label>
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(plan.id, index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title={`Feature ${index + 1}`}
                          placeholder="Enter feature description"
                        />
                        <button
                          onClick={() => handleRemoveFeature(plan.id, index)}
                          className="px-3 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30"
                          title="Remove this feature"
                          aria-label={`Remove feature ${index + 1}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddFeature(plan.id)}
                      className="w-full px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feature
                    </button>
                  </div>
                </div>

                {/* Bonus Text */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Bonus Text (optional)
                  </label>
                  <input
                    type="text"
                    value={plan.bonus_text || ''}
                    onChange={(e) => handleFieldChange(plan.id, 'bonus_text', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="FREE Premium Standee included"
                  />
                </div>

                {/* Button Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={plan.button_text}
                      onChange={(e) => handleFieldChange(plan.id, 'button_text', e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Button text label"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Button Link
                    </label>
                    <input
                      type="text"
                      value={plan.button_link}
                      onChange={(e) => handleFieldChange(plan.id, 'button_link', e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Button link URL"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={() => handleUpdatePlan(plan)}
                  disabled={isSaving === plan.id}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {isSaving === plan.id ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Live Preview
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl shadow-lg p-6 md:p-8 border-2 ${plan.border_color} relative`}
              >
                {plan.badge_text && (
                  <div className="absolute -top-4 left-12 md:left-1/2 md:-translate-x-1/2 flex justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 text-gray-900 text-sm md:text-base font-extrabold shadow ring-2 ring-amber-300/60">
                      {plan.badge_icon && <Award className="w-4 h-4 text-amber-700" />}
                      <span>{plan.badge_text}</span>
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 text-center">
                  {plan.plan_name}
                </h3>

                <div className="text-center mt-2 mb-1">
                  {plan.original_price && (
                    <span className="text-xl md:text-2xl font-semibold text-gray-400 line-through mr-2">
                      {plan.currency}{plan.original_price.toLocaleString()}
                    </span>
                  )}
                  <span className="text-4xl md:text-5xl font-extrabold text-blue-700">
                    {plan.currency}{plan.current_price.toLocaleString()}
                  </span>
                  <span className="text-2xl font-extrabold text-blue-700">/-</span>
                </div>

                {plan.badge_text && (
                  <div className="text-center mb-2">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                      Limited Time Offer
                    </span>
                  </div>
                )}

                <p className="text-center text-gray-500 mb-6">
                  {plan.duration_text}
                </p>

                <ul className="space-y-3 list-none mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.bonus_text && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3 text-yellow-800 text-sm">
                      <span className="text-yellow-600">🔒</span>
                      {plan.bonus_text}
                    </div>
                  </div>
                )}

                <a
                  href={plan.button_link}
                  className={`w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${plan.button_gradient} hover:opacity-90 text-white px-6 py-4 rounded-xl font-semibold shadow-lg transition-all`}
                >
                  {plan.button_text} <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
