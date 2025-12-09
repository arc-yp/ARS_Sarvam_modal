import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  businessName: string;
  businessCategory: string;
  personName: string;
  customerTitle: string;
  businessLogo: string;
  customerImage: string;
  review: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    businessName: "Sakhiya Skin Clinic",
    businessCategory: "Health & Medical",
    personName: "",
    customerTitle: "",
    businessLogo: "/SocialMedia Data/Sakhiya Skin/logo.webp",
    customerImage: "/SocialMedia Data/Sakhiya Skin/Photo.webp",
    review:
      "AI Review System revolutionized patient feedback collection at our clinic. Automated, personalized, and incredibly effective - our 5-star ratings doubled in just 3 months!",
    rating: 5,
  },
  {
    id: 2,
    businessName: "Candor IVF Center",
    businessCategory: "Health & Medical",
    personName: "Dr. Jaydev Dhameliya",
    customerTitle: "Gynecologist & IVF Specialist",
    businessLogo: "/SocialMedia Data/Candor IVF Center/logo.webp",
    customerImage: "/SocialMedia Data/Candor IVF Center/Photo.JPG",
    review:
      "With AI Review System, our online visibility and trust grew rapidly, we're now the top-recommended IVF centre on Google Search.",
    rating: 5,
  },
  {
    id: 3,
    businessName: "D.Khushalbhai Jewellers",
    businessCategory: "Retail & Shopping",
    personName: "D. KhushalBhai",
    customerTitle: "Owner",
    businessLogo: "/SocialMedia Data/D.Khushaldas Jewellers/logo.webp",
    customerImage: "/SocialMedia Data/D.Khushaldas Jewellers/Photo.webp",
    review:
      "The AI Review System transformed our customer engagement! We've seen a 300% increase in Google reviews and our jewellery store now ranks #1 in local searches.",
    rating: 5,
  },
    {
    id: 4,
    businessName: "Aura H 360",
    businessCategory: "Health & Medical",
    personName: "Dr. Harshal Kheni",
    customerTitle: "MBBS, PGDCC, PGDCD",
    businessLogo: "/SocialMedia Data/Aura H 360/logo.webp",
    customerImage: "/SocialMedia Data/Aura H 360/Photo.webp",
    review:
      "AI Review System gave us a smooth and intelligent way to engage clients post-treatment. Our online trust and credibility grew rapidly with authentic patient feedback.",
    rating: 5,
  },
];

const TestimonialsGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say About Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from real businesses who trust our services
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 opacity-90 transform -translate-x-1/3 -translate-y-1/3 rounded-full"></div>
          <div className="relative">
            {/* <div className="absolute top-8 left-8 bg-gradient-to-br from-blue-200 to-blue-400 text-white px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider shadow-lg z-10  transform -rotate-3 rounded-lg">
              {" "}
              What Our Client Say
              <br />
              About Us?
            </div> */}
            {/* Blue Badge */}
            <div className="absolute top-8 left-8  bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider shadow-lg z-10">
              What Our Client Say
              <br />
              About Us?
            </div>
          </div>

          {/* Content Grid */}
          <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left Side - Customer Image */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Decorative Frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-teal-400 to-green-400 transform rotate-3 rounded-lg"></div>
                <div className="relative bg-gray-200 rounded-lg overflow-hidden shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <img
                    src={currentTestimonial.customerImage}
                    alt={currentTestimonial.personName}
                    className="w-80 h-96 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Testimonial Details */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Business Logo */}
              <div className="flex items-center space-x-4 relative">
                {/* Quote Icon */}
                <div className="absolute -top-4 -right-4 text-teal-500 opacity-50">
                  <svg
                    className="w-32 h-32"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>
                </div>
                <img
                  src={currentTestimonial.businessLogo}
                  alt={currentTestimonial.businessName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-teal-400 shadow-md"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {currentTestimonial.businessName}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    {currentTestimonial.businessCategory}
                  </p>
                </div>
              </div>

              {/* Person Name */}
              <div>
                <h4 className="text-3xl font-bold text-gray-900">
                  {currentTestimonial.personName}
                </h4>
                <p className="text-gray-600 mt-1">
                  {" "}
                  {currentTestimonial.customerTitle}
                </p>
              </div>

              {/* Review Text */}
              <div className="relative">
                <p className="text-gray-700 text-lg leading-relaxed relative z-10">
                  {currentTestimonial.review}
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-8 h-8 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Badge */}
              <div className="inline-flex items-center space-x-2 bg-teal-100 px-4 py-2 rounded-full w-fit border-2 border-teal-300">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-teal-900 font-semibold">Testimonial</span>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute bottom-8 right-8 flex items-center space-x-4 z-20">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="bg-white hover:bg-teal-50 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border-2 border-teal-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Counter */}
            {/* <div className="bg-white px-4 py-2 rounded-full shadow-lg border-2 border-gray-200">
              <span className="text-gray-800 font-semibold">
                {currentIndex + 1} / {testimonialsData.length}
              </span>
            </div> */}

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-500 to-green-500 w-8"
                    : "bg-teal-200 hover:bg-teal-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Join hundreds of satisfied customers who trust our services
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsGallery;
