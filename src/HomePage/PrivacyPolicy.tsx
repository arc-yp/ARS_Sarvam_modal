import { Link } from 'react-router-dom';
import { Shield, Cookie, Database, Info, Home, ChevronUp } from 'lucide-react';
import Footer from './Footer';

const PrivacyPolicy = () => {
  return (
    <main id="top" className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-green-500/10 to-transparent" />
        <div className="container mx-auto px-6 pt-16 pb-10">
          <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
            <Home className="w-4 h-4" />
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700 font-medium">Privacy Policy</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-medium mb-3">
              <Shield className="w-4 h-4" /> Your privacy matters
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">Privacy Policy</h1>
            <p className="text-gray-600 max-w-3xl">
              We’re committed to protecting your personal information and being transparent about how we use it across our website and services.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* TOC */}
          <aside className="lg:col-span-3 ">
            <div className="sticky top-24 hidden lg:block">
              <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-5 shadow-sm">
                <div className="flex items-center gap-2 text-gray-800 font-semibold mb-3">
                  <Info className="w-4 h-4 text-blue-600" /> On this page
                </div>
                <ul className="space-y-2 text-sm">
                  <li><a className="hover:text-blue-600 transition-colors" href="#information-we-collect">Information We Collect</a></li>
                  <li><a className="hover:text-blue-600 transition-colors" href="#how-we-use">How We Use Your Information</a></li>
                  <li><a className="hover:text-blue-600 transition-colors" href="#cookies-tracking">Cookies & Tracking</a></li>
                  <li><a className="hover:text-blue-600 transition-colors" href="#data-protection">Data Protection</a></li>
                  <li><a className="hover:text-blue-600 transition-colors" href="#contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Main */}
          <section className="lg:col-span-9 space-y-6">
            <div className="rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <p className="text-gray-700">
                At AI Review System, we are committed to protecting your privacy and ensuring transparency in how we collect, use, and protect your data.
              </p>
            </div>

            <article id="information-we-collect" className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              <p className="text-gray-700 mb-3">When you use our website or services, we may collect the following data:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Business name and type</li>
                <li>Customer feedback and rating data</li>
                <li>IP address and browser type (via analytics tools)</li>
              </ul>
            </article>

            <article id="how-we-use" className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              <p className="text-gray-700 mb-3">We use your data to:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Provide our AI-generated review service</li>
                <li>Improve user experience</li>
                <li>Send occasional communication (support, updates, offers)</li>
                <li>Analyze performance using tools like Google Analytics and Meta Pixel</li>
              </ul>
            </article>

            <article id="cookies-tracking" className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Cookie className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Cookies & Tracking</h2>
              </div>
              <p className="text-gray-700 mb-3">We use cookies and third-party tracking tools to:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Understand user behavior</li>
                <li>Serve relevant ads on Facebook, Instagram, and Google</li>
                <li>Improve our website performance</li>
              </ul>
              <p className="text-gray-700 mt-3">By using our site, you agree to the use of cookies and tracking tools.</p>
            </article>

            <article id="data-protection" className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Data Protection</h2>
              </div>
              <p className="text-gray-700">
                We do not sell or share your data with third-party marketers. We take all reasonable steps to secure your information.
              </p>
              <p id="contact" className="text-gray-700 mt-3">
                If you have any concerns, feel free to contact us at: {' '}
                <a className="text-blue-600 underline decoration-blue-300 hover:text-blue-700" href="mailto:aireviewsystem@gmail.com">aireviewsystem@gmail.com</a>
              </p>
            </article>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-between pt-2">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold shadow hover:shadow-lg transition"
              >
                Back to Home
              </Link>
              <a
                href="#top"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                aria-label="Back to top"
              >
                <ChevronUp className="w-4 h-4" /> Back to top
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
