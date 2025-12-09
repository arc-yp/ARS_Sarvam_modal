import { Link } from "react-router-dom";
import {
  Package,
  Clock,
  Truck,
  AlertTriangle,
  RefreshCw,
  Home,
  ChevronUp,
  CheckCircle,
  MapPin,
  Phone,
} from "lucide-react";
import Footer from "./Footer";

const ShippingPolicy = () => {
  return (
    <main
      id="top"
      className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50"
    >
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-green-500/10 to-transparent" />
        <div className="container mx-auto px-6 pt-16 pb-10">
          <nav
            className="text-sm text-gray-500 mb-6 flex items-center gap-2"
            aria-label="Breadcrumb"
          >
            <Home className="w-4 h-4" />
            <Link to="/" className="hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700 font-medium">Shipping Policy</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-medium mb-3">
              <Package className="w-4 h-4" /> Delivery Information
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
              Shipping Policy
            </h1>
            <p className="text-gray-600 max-w-3xl">
              AI Review System (ARS) – Understanding our digital and physical
              product delivery process.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last Updated: 01-04-2025
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* TOC */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 hidden lg:block">
              <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-5 shadow-sm">
                <div className="flex items-center gap-2 text-gray-800 font-semibold mb-3">
                  <Package className="w-4 h-4 text-blue-600" /> Sections
                </div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      className="hover:text-blue-600 transition-colors"
                      href="#nature-of-product"
                    >
                      1. Nature of Product
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-blue-600 transition-colors"
                      href="#delivery-timeline"
                    >
                      2. Delivery Timeline
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-blue-600 transition-colors"
                      href="#shipping-method"
                    >
                      3. Shipping Method
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-blue-600 transition-colors"
                      href="#delays-exceptions"
                    >
                      4. Delays & Exceptions
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-blue-600 transition-colors"
                      href="#lost-damaged"
                    >
                      5. Lost, Damaged, or Incorrect
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-blue-600 transition-colors"
                      href="#digital-access"
                    >
                      6. Digital Access Guarantee
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-blue-600 transition-colors"
                      href="#shipping-coverage"
                    >
                      7. Shipping Coverage
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-blue-600 transition-colors"
                      href="#contact"
                    >
                      8. Contact Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Main */}
          <section className="lg:col-span-9 space-y-6">
            <div className="rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8">
              <p className="text-gray-700">
                AI Review System (ARS) is a hybrid digital + physical product.
                This policy explains how and when you will receive your digital
                credentials and physical items (if applicable).
              </p>
            </div>

            <article
              id="nature-of-product"
              className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  1. Nature of Product
                </h2>
              </div>
              <p className="text-gray-700 mb-3 font-semibold">
                You will receive:
              </p>

              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">
                  📱 Digital Deliverables (All Plans):
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>ARS login credentials</li>
                  <li>Business-specific review link</li>
                  <li>Digital QR code</li>
                  <li>Dashboard access</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-2">
                  📦 Physical Deliverables (Specific Plans):
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>QR Standee (Standard / Premium – based on your plan)</li>
                  <li>NFC Card (if included in the plan)</li>
                </ul>
              </div>
            </article>

            <article
              id="delivery-timeline"
              className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  2. Delivery Timeline
                </h2>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">
                  ⚡ Digital Items:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>
                    ARS login + dashboard access →{" "}
                    <strong>within 24 hours</strong> of successful payment
                  </li>
                  <li>
                    Digital QR code + review link →{" "}
                    <strong>within 1 hour</strong> after onboarding details
                  </li>
                  <li>
                    Custom branding setup (if purchased) →{" "}
                    <strong>1–3 business days</strong>
                  </li>
                </ul>
              </div>

              <div className="mb-3">
                <p className="font-semibold text-gray-800 mb-2">
                  📦 Physical Items (QR Standee / NFC Card):
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>
                    Order processing: <strong>2–3 business days</strong>
                  </li>
                  <li>
                    Printing & packaging: <strong>2–4 business days</strong>
                  </li>
                  <li>
                    Dispatch through courier: <strong>5–9 business days</strong>
                    , depending on your city/state
                  </li>
                  <li>Tracking link will be shared once dispatched</li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-amber-800 text-sm">
                  ⚠️ Delivery timelines may vary during festival seasons or
                  courier delays.
                </p>
              </div>
            </article>

            <article
              id="shipping-method"
              className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  3. Shipping Method
                </h2>
              </div>
              <p className="text-gray-700 mb-3">
                All physical products are shipped via trusted courier partners:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Delhivery</li>
                <li>DTDC</li>
                <li>BlueDart</li>
                <li>Professional Couriers</li>
                <li>Local logistics (for nearby areas)</li>
              </ul>
            </article>

            <article
              id="delays-exceptions"
              className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  4. Delays & Exceptions
                </h2>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">
                  ARS is not responsible for delays caused by:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Incorrect delivery address</li>
                  <li>Wrong or unreachable phone number</li>
                  <li>
                    Courier service delays due to climate, lockdowns, traffic,
                    or operational issues
                  </li>
                  <li>Customer not accepting the parcel</li>
                  <li>Festival or holiday rush</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-2">
                  Digital delivery delays may occur due to:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Incorrect email/phone details</li>
                  <li>Server maintenance</li>
                  <li>Payment gateway confirmation delay</li>
                </ul>
              </div>
            </article>

            <article
              id="lost-damaged"
              className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  5. Lost, Damaged, or Incorrect Shipment
                </h2>
              </div>

              <p className="text-gray-700 mb-3">
                If your standee or NFC card is:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-4">
                <li>Damaged</li>
                <li>Lost</li>
                <li>Incorrectly printed</li>
                <li>Wrongly delivered</li>
              </ul>

              <p className="text-gray-700 mb-2 font-semibold">
                Please report within{" "}
                <span className="text-rose-600">48 hours</span> of delivery
                with:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-4">
                <li>Photos/video of the damage</li>
                <li>Your order ID</li>
                <li>Packaging image</li>
              </ul>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="font-semibold text-gray-800 mb-2">
                  We will provide:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>
                    <strong>Free replacement</strong> (if issue is verified on
                    our end)
                  </li>
                  <li>
                    Reprint charges may apply if customer provided incorrect
                    details
                  </li>
                </ul>
              </div>
            </article>

            <article
              id="digital-access"
              className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  6. Digital Access Guarantee
                </h2>
              </div>
              <p className="text-gray-700 mb-3 font-semibold">We guarantee:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>100% delivery of ARS login credentials</li>
                <li>Active dashboard access during subscription period</li>
                <li>Re-sharing of credentials anytime upon request</li>
                <li>Free technical support for login/setup issues</li>
              </ul>
            </article>

            <article
              id="shipping-coverage"
              className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  7. Shipping Coverage
                </h2>
              </div>
              <p className="text-gray-700 mb-2">
                We ship QR Standees and NFC cards <strong>across India</strong>.
              </p>
              <p className="text-gray-700">
                International shipping is currently not available.
              </p>
            </article>

            <article
              id="contact"
              className="scroll-mt-28 rounded-3xl bg-white border border-gray-100 shadow-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  8. Contact for Shipping Support
                </h2>
              </div>
              <p className="text-gray-700 mb-3 font-semibold">
                Customer Support Team – AI Review System
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  📧 Email:{" "}
                  <a
                    className="text-blue-600 underline decoration-blue-300 hover:text-blue-700"
                    href="mailto:aireviewsystem@gmail.com"
                  >
                    aireviewsystem@gmail.com
                  </a>
                </p>
                <p>
                  📱 WhatsApp:{" "}
                  <a
                    className="text-blue-600 underline decoration-blue-300 hover:text-blue-700"
                    href="https://wa.me/919909908230"
                  >
                    +91-990 990 8230
                  </a>
                </p>
                <p>🕒 Support Hours: 10 AM – 6 PM (Monday–Friday)</p>
              </div>
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

export default ShippingPolicy;
