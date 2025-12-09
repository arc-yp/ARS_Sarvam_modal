import React, { useState } from "react";
import { Check, Sparkles, ChevronDown } from "lucide-react";

interface ServiceSelectorProps {
  services: string[];
  selectedServices: string[];
  onSelectionChange: (services: string[]) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  selectedServices,
  onSelectionChange,
  className = "",
  size = "md",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-xs",
    lg: "px-4 py-2 text-xs",
  };

  const handleServiceToggle = (service: string) => {
    if (selectedServices.includes(service)) {
      onSelectionChange([]);
    } else {
      onSelectionChange([service]);
    }
  };

  const isSelected = (service: string) => selectedServices.includes(service);

  if (services.length === 0) return null;

  // Split services: first 2 as cards, rest in dropdown
  const cardServices = services.slice(0, 2);
  const dropdownServices = services.slice(2);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
          Select Services to Highlight
        </label>
        {selectedServices.length > 0 && (
          <div className="flex items-center text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
            <Check className="w-3 h-3 mr-1" />
            {selectedServices.length} selected
          </div>
        )}
      </div>

      {/* All services in one row */}
      <div className="flex flex-wrap gap-2 items-start">
        {/* First 2 services as cards */}
        {cardServices.map((service) => (
          <button
            key={service}
            type="button"
            onClick={() => handleServiceToggle(service)}
            className={`
              ${sizeClasses[size]}
              rounded-full font-medium transition-all duration-200
              border-2 whitespace-nowrap
              ${
                isSelected(service)
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg transform scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              active:transform active:scale-95
            `}
          >
            {service}
          </button>
        ))}

        {/* Dropdown for remaining services */}
        {dropdownServices.length > 0 && (
          <div className="relative inline-block">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                ${sizeClasses[size]}
                rounded-full font-medium transition-all duration-200
                border-2 whitespace-nowrap inline-flex items-center gap-1
                ${
                  dropdownServices.some((s) => isSelected(s))
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              `}
            >
              <Sparkles className="w-3 h-3" />
              <span>
                {dropdownServices.some((s) => isSelected(s))
                  ? dropdownServices.find((s) => isSelected(s))
                  : "More Services"}
              </span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 left-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl min-w-[280px] max-h-64 overflow-y-auto">
                <div className="p-2 space-y-1">
                  {dropdownServices.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => {
                        handleServiceToggle(service);
                        setIsDropdownOpen(false);
                      }}
                      className={`
                      w-full px-4 py-2.5 rounded-md text-sm font-medium text-left transition-all duration-200
                      ${
                        isSelected(service)
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                          : "bg-gray-50 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700"
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                    `}
                    >
                      <div className="flex items-center justify-between">
                        <span>{service}</span>
                        {isSelected(service) && <Check className="w-4 h-4" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
