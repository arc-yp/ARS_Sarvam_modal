import { Link } from 'react-router-dom';
import { FileText, Shield, Lock, RefreshCw, Home, ChevronUp } from 'lucide-react';
import Footer from './Footer';

const TermsConditions = () => {
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
            <span className="text-gray-700 font-medium">Terms & Conditions</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-xs font-medium mb-3">
              <FileText className="w-4 h-4" /> Legal Agreement
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">Terms & Conditions</h1>
            <p className="text-gray-600 max-w-3xl">
              By accessing or using AI Review System, you agree to the following terms. Please read them carefully.
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
                  <FileText className="w-4 h-4 text-amber-600" /> Sections
                </div>
                <ul className="space-y-2 text-sm">
                  <li><a className="hover:text-amber-600 transition-colors" href="#service-usage">1. Service Usage</a></li>
                  <li><a className="hover:text-amber-600 transition-colors" href="#license">2. License</a></li>
                  <li><a className="hover:text-amber-600 transition-colors" href="#account-security">3. Account Security</a></li>
                  <li><a className="hover:text-amber-600 transition-colors" href="#limitation">4. Limitation of Liability</a></li>
                  <li><a className="hover:text-amber-600 transition-colors" href="#changes">5. Changes</a></li>
                  <li><a className="hover:text-amber-600 transition-colors" href="#contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Main */}
          <section className="lg:col-span-9 space-y-6">
            <div className="rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <p className="text-gray-700">
                Welcome to AI Review System. These Terms & Conditions govern your use of our platform and services. By using the platform, you accept these terms in full.
              </p>
            </div>

            <article id="service-usage" className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Service Usage</h2>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>You may use our tool to generate AI-powered Google review suggestions for your business.</li>
                <li>You agree not to misuse the platform, reverse-engineer it, or exploit its features beyond their intended use.</li>
              </ul>
            </article>

            <article id="license" className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. License</h2>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>All content generated is for personal or business use only.</li>
                <li>We retain ownership of our technology, interface, and branding.</li>
              </ul>
            </article>

            <article id="account-security" className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. Account Security</h2>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>You are responsible for any activity under your account.</li>
                <li>Sharing credentials is not permitted.</li>
              </ul>
            </article>

            <article id="limitation" className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">4. Limitation of Liability</h2>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>We do not guarantee Google will publish every review.</li>
                <li>Review quality depends on the data provided by the business.</li>
                <li>We are not liable for any damages or reputation issues resulting from misuse of generated content.</li>
              </ul>
            </article>

            <article id="changes" className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">5. Changes</h2>
              </div>
              <p className="text-gray-700">We reserve the right to update these terms at any time. Continued use constitutes acceptance of new terms.</p>
              <p id="contact" className="text-gray-700 mt-3">If you have questions, contact us at: {' '}<a className="text-blue-600 underline decoration-blue-300 hover:text-blue-700" href="mailto:aireviewsystem@gmail.com">aireviewsystem@gmail.com</a></p>
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

export default TermsConditions;
