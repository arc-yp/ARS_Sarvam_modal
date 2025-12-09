import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeadForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessName: '',
    businessType: '',
    city: '',
    businessDescription: '',
    businessServices: ''
  });

  const businessTypes = [
    'Restaurant/Cafe',
    'Healthcare/Medical',
    'Beauty/Salon/Spa',
    'Retail Store',
    'Automotive',
    'Home Services',
    'Fitness/Gym',
    'Education/Training',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, businessName, businessType, city, businessDescription, businessServices } = formData;
    // Build a neat WhatsApp message
    const messageLines: string[] = [
      'New Demo Request',
      '',
      `☞ Name: ${name}`,
      `☞ Phone: ${phone}`,
      `☞ Business Name: ${businessName}`,
      `☞ Business Type: ${businessType}`,
      `☞ City: ${city}`,
    ];
    if (businessDescription?.trim()) {
      messageLines.push(`☞ Business Description: ${businessDescription.trim()}`);
    }
    if (businessServices?.trim()) {
      const services = businessServices.split(',').map(s => s.trim()).filter(Boolean);
      if (services.length) {
        messageLines.push('☞ Business Services:');
        services.forEach(s => messageLines.push(`- ${s}`));
      }
    }
    const message = messageLines.join('\n');
    const encoded = encodeURIComponent(message);
    const phoneTarget = '919909908230'; // +91 99099 08230
    const waUrl = `https://wa.me/${phoneTarget}?text=${encoded}`;

    // Fire-and-forget: send lead to our API (append to Google Sheets)
    try {
      fetch('/api/add-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          businessName,
          businessType,
          city,
          businessDescription,
          businessServices
        })
      }).catch(() => { /* ignore */ });
    } catch { /* ignore */ }

    // Open WhatsApp in a new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      businessName: '',
      businessType: '',
      city: '',
      businessDescription: '',
      businessServices: ''
    });
    
    // Navigate to thank you page
    navigate('/thank-you');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="lead-form" className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">
                Ready to Get More Reviews?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join 500+ successful businesses using our AI Review System. Get your free demo and see results in just 5 minutes!
              </p>
              
              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {[
                  'Free 30-minute personalized demo',
                  'Custom setup for your business type',
                  'Multilingual review generation',
                  'QR codes and links ready to use',
                  'No setup fees or hidden costs'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-300" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Your Free Demo
                </h3>
                <p className="text-gray-600">
                  Fill out the form below and we'll contact you within 24 hours
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="fullName"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phoneNumber"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      id="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your business name"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="businessType" className="block text-sm font-semibold text-gray-700 mb-2">
                      Type of Business *
                    </label>
                    <select
                      name="businessType"
                      id="businessType"
                      required
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select your business type</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Business Services (comma-separated) */}
                <div>
                  <label htmlFor="businessServices" className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Services
                  </label>
                  <input
                    type="text"
                    name="businessServices"
                    id="businessServices"
                    value={formData.businessServices}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="e.g., Haircut, Facial, Spa, Massage"
                  />
                  <p className="mt-1 text-xs text-gray-500">Add multiple services separated by commas.</p>
                </div>

                {/* Business Description */}
                <div>
                  <label htmlFor="businessDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Description
                  </label>
                  <textarea
                    name="businessDescription"
                    id="businessDescription"
                    rows={4}
                    value={formData.businessDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-y"
                    placeholder="Tell us briefly about your business, services, customers, and goals"
                  />
                </div>

                
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your city"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center group"
                >
                  Get Your Demo Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to receive marketing communications from us. 
                  You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;