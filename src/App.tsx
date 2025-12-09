import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import ReactGA from "react-ga4";

import { AdminDashboard } from "./components/AdminDashboard";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { CompactReviewCardView } from "./components/CompactReviewCardView";
import { LoginPage } from "./components/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { storage } from "./utils/storage";
import { ReviewCard } from "./types";
import PrivacyPolicy from "./HomePage/PrivacyPolicy";
import ShippingPolicy from "./HomePage/ShippingPolicy";
import TermsConditions from "./HomePage/TermsConditions";
import RefundPolicy from "./HomePage/RefundPolicy";
import HomeLink from "./HomePage/HomeLink";
import RenewalPlanForm from "./HomePage/RenewalPlanForm";
import ArsPage from "./HomePage/ArsPage";
import ThankYouPage from "./HomePage/ThankYouPage";
import { PricingAdmin } from "./HomePage/HomePage-Admin/PricingAdmin";
import {
  ReviewStoreLayout,
  ReviewDashboard,
  ReviewCategoryPage,
  ReviewSearchPage,
} from "./components/ReviewStore";

// Initialize GA4 once
ReactGA.initialize("G-J7T5QPZPQ9");

function App() {
  const location = useLocation();

  // Track every route change (GA4)
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <Routes>
      {/* Auth / Static */}
      <Route path="/ai-login" element={<LoginPage />} />
      <Route
        path="/ai-admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-admin/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-admin/pricing"
        element={
          <ProtectedRoute>
            <PricingAdmin />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<HomeLink />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/shipping-policy" element={<ShippingPolicy />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/renewalplanform" element={<RenewalPlanForm />} />
      <Route path="/ars" element={<ArsPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />

      {/* Generated Reviews Store with Sidebar */}
      <Route path="/review" element={<ReviewStoreLayout />}>
        <Route index element={<ReviewDashboard />} />
        <Route path="search" element={<ReviewSearchPage />} />
        <Route path=":categoryName" element={<ReviewCategoryPage />} />
      </Route>

      {/* Dynamic card at root level */}
      <Route path="/:slug" element={<DynamicReviewCard />} />

      {/* Fallback */}
      <Route path="*" element={<NotFoundFallback />} />
    </Routes>
  );
}

// Wrap App with Router (moved Router out so useLocation works)
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

// Component to handle dynamic review card routing
const DynamicReviewCard: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [card, setCard] = React.useState<ReviewCard | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Guard: ignore blank or asset-like slugs
    if (!slug || slug.includes(".") || slug === "favicon.ico") {
      return;
    }

    let cancelled = false;
    const loadCard = async () => {
      setLoading(true);
      try {
        const foundCard = await storage.getCardBySlug(slug);
        if (!cancelled) setCard(foundCard);
      } catch {
        if (!cancelled) setCard(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadCard();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Guard: ignore blank or asset-like slugs
  if (!slug || slug.includes(".") || slug === "favicon.ico") {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 via-purple-200 to-slate-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-blue-900 mb-2">
            Loading Review Card
          </h1>
          <p className="text-slate-900">Please wait...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <img
            src="/aireviewsystm_qrcode.webp"
            alt="AI Review System QR Code"
            className="mx-auto mb-6 w-40 max-w-full border-4 border-blue-500 rounded-lg shadow-lg bg-white"
          />
          <h1 className="text-xl font-bold text-white mb-4">
            If Card Not Found
          </h1>
          <h1 className="text-3xl font-bold text-white mb-4">
            Please! Contact Admin&nbsp;
            <a
              href="https://www.aireviewsystem.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400 hover:text-blue-600"
            >
              https://www.aireviewsystem.com/
            </a>
          </h1>
          <p className="text-slate-400 mb-8">
            The review card for "/{slug}" doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  if (card.active === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-lg p-8 bg-slate-800/40 backdrop-blur rounded-2xl border border-white/10">
          <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Temporarily Unavailable
          </h1>
          <p className="text-slate-300 mb-4">
            The review card for "/{slug}" is currently inactive.
          </p>
          <p className="text-slate-400 text-sm">
            Please check back later or contact the business owner if you believe
            this is an error.
          </p>
          <h1 className="text-sm text-white mb-4">
            Please! Contact Admin&nbsp;
            <a
              href="https://www.aireviewsystem.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400 hover:text-blue-600"
            >
              https://www.aireviewsystem.com/
            </a>
          </h1>
        </div>
      </div>
    );
  }

  return <CompactReviewCardView card={card} />;
};

// Simple fallback for any unmatched path
const NotFoundFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-slate-300">Page not found</p>
      <a href="/" className="text-blue-400 underline">
        Go Home
      </a>
    </div>
  </div>
);

export default AppWithRouter;
