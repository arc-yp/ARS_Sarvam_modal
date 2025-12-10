import React, { useState } from "react";
import { X, Upload, Building2, AlertCircle, Key } from "lucide-react";
import { ReviewCard } from "../types";
import {
  generateId,
  generateSlug,
  validateGoogleMapsUrl,
} from "../utils/helpers";
import { SegmentedButtonGroup } from "./SegmentedButtonGroup";
import { TagInput } from "./TagInput";
import { Link as LinkIcon } from "lucide-react";
import { sendReviewCardToSheet } from "../utils/googleSheets";

interface CompactAddCardModalProps {
  onClose: () => void;
  onSave: (card: ReviewCard) => void;
}

export const CompactAddCardModal: React.FC<CompactAddCardModalProps> = ({
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    type: "",
    description: "",
    location: "",
    services: [] as string[],
    logoUrl: "",
    googleMapsUrl: "",
    sarvamApiKey: "",
    allowedLanguages: ["English", "Gujarati", "Hindi"] as string[], // NEW
  });
  // Expiry duration state: number + unit
  const [expiryAmount, setExpiryAmount] = useState<number>(0); // 0 means no expiry
  const [expiryUnit, setExpiryUnit] = useState<
    "minutes" | "hours" | "days" | "months" | "years"
  >("days");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleServicesChange = (services: string[]) => {
    setFormData((prev) => ({ ...prev, services }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          logoUrl: "File size must be less than 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange("logoUrl", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Business category is required";
    }

    if (!formData.type.trim()) {
      newErrors.type = "Business type is required";
    }

    if (!formData.googleMapsUrl.trim()) {
      newErrors.googleMapsUrl = "Google Maps URL is required";
    } else if (!validateGoogleMapsUrl(formData.googleMapsUrl)) {
      newErrors.googleMapsUrl = "Please enter a valid Google Maps review URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Compute expiresAt if duration > 0
      let expiresAt: string | undefined = undefined;
      if (expiryAmount > 0) {
        const now = new Date();
        const end = new Date(now);
        switch (expiryUnit) {
          case "minutes":
            end.setMinutes(end.getMinutes() + expiryAmount);
            break;
          case "hours":
            end.setHours(end.getHours() + expiryAmount);
            break;
          case "days":
            end.setDate(end.getDate() + expiryAmount);
            break;
          case "months":
            end.setMonth(end.getMonth() + expiryAmount);
            break;
          case "years":
            end.setFullYear(end.getFullYear() + expiryAmount);
            break;
        }
        expiresAt = end.toISOString();
      }

      const newCard: ReviewCard = {
        id: generateId(),
        businessName: formData.businessName.trim(),
        category: formData.category.trim(),
        type: formData.type.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        services: formData.services,
        slug: generateSlug(formData.businessName),
        logoUrl: formData.logoUrl,
        googleMapsUrl: formData.googleMapsUrl.trim(),
        sarvamApiKey: formData.sarvamApiKey.trim(),
        active: true,
        expiresAt,
        allowedLanguages: formData.allowedLanguages, // NEW
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      onSave(newCard);

      // Fire-and-forget: send to Google Sheets if configured (don't block UI)
      sendReviewCardToSheet(newCard).catch((err) => {
        console.warn("[Sheets] Unable to send to Google Sheets:", err);
      });
    } catch (error) {
      console.error("Error creating card:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = [
    "Retail & Shopping",
    "Food & Beverage",
    "Services",
    "Professional Businesses",
    "Health & Medical",
    "Education",
    "Hotels & Travel",
    "Entertainment & Recreation",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Review Card
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              title="Close"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Main Form */}
          <div className="flex-1 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) =>
                      handleInputChange("businessName", e.target.value)
                    }
                    placeholder="Enter business name"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.businessName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                </div>
                {errors.businessName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.businessName}
                  </p>
                )}
                {formData.businessName && (
                  <p className="mt-1 text-sm text-gray-500">
                    URL: /{generateSlug(formData.businessName)}
                  </p>
                )}
              </div>

              {/* Business Category and Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Category *
                  </label>
                  <select
                    aria-label="Business Category"
                    value={formData.category}
                    onChange={(e) => {
                      handleInputChange("category", e.target.value);
                      handleInputChange("type", "");
                    }}
                    className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.category
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    placeholder="e.g., Software Company, Restaurant, Clinic"
                    className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.type
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.type}
                    </p>
                  )}
                </div>
              </div>

              {/* Business Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Brief description of your business, services, or specialties..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This helps generate more relevant reviews
                </p>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="City, State or Area"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional: Helps with location-specific reviews
                </p>
              </div>

              {/* Business Services */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Services / Highlights
                </label>
                <TagInput
                  tags={formData.services}
                  onChange={handleServicesChange}
                  placeholder="Add services like 'food quality', 'staff', 'ambiance'"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Add services that customers can highlight in their reviews
                </p>
              </div>

              {/* Sarvam API Configuration */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sarvam API Key *
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.sarvamApiKey}
                      onChange={(e) =>
                        handleInputChange("sarvamApiKey", e.target.value)
                      }
                      placeholder="Enter Sarvam API key"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.sarvamApiKey
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  </div>
                  {errors.sarvamApiKey && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.sarvamApiKey}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Get your API key from{" "}
                    <a
                      href="https://docs.sarvam.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Sarvam AI
                    </a>
                  </p>
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Logo
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    {formData.logoUrl ? (
                      <img
                        src={formData.logoUrl}
                        alt="Logo preview"
                        className="w-12 h-12 object-contain rounded"
                      />
                    ) : (
                      <Building2 className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps Review URL *
                </label>

                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                  {/* Icon */}
                  <div className="pl-3 text-gray-400">
                    <LinkIcon className="w-5 h-5" />
                  </div>

                  {/* Fixed URL text */}
                  <span className="text-sm text-gray-500 pl-2 whitespace-nowrap">
                    https://search.google.com/local/writereview?placeid=
                  </span>

                  {/* Input (only for Place ID) */}
                  <input
                    type="text"
                    value={formData.googleMapsUrl}
                    onChange={(e) =>
                      handleInputChange("googleMapsUrl", e.target.value)
                    }
                    placeholder="Enter Place ID"
                    className="flex-1 py-3 px-3 text-sm outline-none"
                  />
                </div>

                {/* Error display if exists */}
                {errors.googleMapsUrl && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.googleMapsUrl}
                  </p>
                )}

                {/* Help text + external link */}
                <p className="mt-1 text-xs text-gray-500">
                  Get this Place ID from your Google My Business.{" "}
                  <a
                    href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Find Place ID
                  </a>
                </p>
              </div>

              {/* Expiry Duration */}
              <div>
                <label
                  htmlFor="expiryAmount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Time Limit (optional)
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    min={0}
                    value={expiryAmount}
                    id="expiryAmount"
                    onChange={(e) => setExpiryAmount(Number(e.target.value))}
                    className="w-32 px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                  <select
                    id="expiryUnit"
                    value={expiryUnit}
                    aria-labelledby="expiryAmount"
                    onChange={(e) =>
                      setExpiryUnit(
                        e.target.value as
                          | "minutes"
                          | "hours"
                          | "days"
                          | "months"
                          | "years"
                      )
                    }
                    className="px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Leave amount 0 for no expiry. Card becomes inactive
                  automatically when time ends.
                </p>
              </div>

              {/* Allowed Languages (Admin decides) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allowed Languages *
                </label>
                <SegmentedButtonGroup
                  options={["English", "Gujarati", "Hindi"]}
                  multiple
                  selected={formData.allowedLanguages}
                  onChange={(v) =>
                    handleInputChange("allowedLanguages", v as string[])
                  }
                  size="sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Users will only see and generate reviews in selected
                  languages.
                </p>
                {(!formData.allowedLanguages ||
                  formData.allowedLanguages.length === 0) && (
                  <p className="text-xs text-red-600 mt-1">
                    Select at least one language.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating..." : "Create Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
