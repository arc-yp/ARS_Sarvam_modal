import { Link } from 'react-router-dom';
import { RotateCcw, FileWarning, Home, ChevronUp, Mail } from 'lucide-react';
import Footer from './Footer';

const RefundPolicy = () => {
  return (
    <main id="top" className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-green-500/10 to-transparent" />
        <div className="container mx-auto px-6 pt-16 pb-10">
          <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
            <Home className="w-4 h-4" />
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700 font-medium">Refund & Cancellation Policy</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-200 bg-rose-50 text-rose-700 text-xs font-medium mb-3">
              <RotateCcw className="w-4 h-4" /> Policy Notice
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">Refund & Cancellation Policy</h1>
            <p className="text-gray-600 max-w-3xl">
              We strive to provide exceptional value through our AI Review System. Please read the terms below carefully before making a purchase.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          <aside className="lg:col-span-3">
            <div className="sticky top-24 hidden lg:block">
              <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-5 shadow-sm">
                <div className="flex items-center gap-2 text-gray-800 font-semibold mb-3">
                  <FileWarning className="w-4 h-4 text-rose-600" /> Sections
                </div>
                <ul className="space-y-2 text-sm">
                  <li><a className="hover:text-rose-600 transition-colors" href="#subscription">Subscription Plans</a></li>
                  <li><a className="hover:text-rose-600 transition-colors" href="#one-time">One-Time Packages</a></li>
                  <li><a className="hover:text-rose-600 transition-colors" href="#contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-9 space-y-6">
            <div className="rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <p className="text-gray-700">This policy explains how refunds and cancellations are handled for our services.</p>
            </div>

            <article id="subscription" className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">For Subscription Plans</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>All purchases are final and non-refundable.</li>
                <li>Subscriptions are non-transferable and apply only to the business specified at the time of onboarding.</li>
                <li>You may cancel your subscription at any time, but no refunds will be issued for the remaining period.</li>
              </ul>
            </article>

            <article id="one-time" className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">For One-Time Packages</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Due to the digital nature of our product, once activated and delivered, no refunds or replacements will be provided.</li>
              </ul>
            </article>

            <div className="rounded-3xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-100 p-6 md:p-8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1" id="contact">Need help?</h3>
                <p className="text-gray-700">For assistance, email us at: <a className="text-blue-600 underline decoration-blue-300 hover:text-blue-700" href="mailto:aireviewsystem@gmail.com">aireviewsystem@gmail.com</a></p>
              </div>
            </div>

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

export default RefundPolicy;
