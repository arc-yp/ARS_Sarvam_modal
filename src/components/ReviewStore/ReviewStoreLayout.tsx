import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { reviewStore } from "./reviewStore";
import { GeneratedReviewRecord } from "../../types";
import {
  LayoutDashboard,
  FolderOpen,
  Database,
  Menu,
  X,
  Search,
} from "lucide-react";

/**
 * Layout with Sidebar for Review Store
 * Provides navigation between Dashboard and Category pages
 */
export const ReviewStoreLayout: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reviews, setReviews] = useState<GeneratedReviewRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const all = await reviewStore.getAllReviews();
        if (!cancelled) setReviews(all);
      } catch (e) {
        console.error("Failed to load reviews:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const categoryMap: Record<string, number> = {};
    reviews.forEach((r) => {
      const cat = r.category || "Uncategorized";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });
    return Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [reviews]);

  const isActive = (path: string) => {
    if (path === "/review") {
      return location.pathname === "/review";
    }
    return location.pathname === path;
  };

  const SidebarContent = () => (
    <>
      {/* Logo / Header */}
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="flex items-center gap-3 text-white">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">ARS</h1>
            <p className="text-xs text-indigo-100">Review System </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {/* Dashboard Link */}
        <Link
          to="/review"
          onClick={() => setSidebarOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
            isActive("/review")
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
          {isActive("/review") && (
            <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          )}
        </Link>

        {/* Search Link */}
        <Link
          to="/review/search"
          onClick={() => setSidebarOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
            isActive("/review/search")
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="font-medium">Search</span>
          {isActive("/review/search") && (
            <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          )}
        </Link>

        {/* Categories Section */}
        <div className="mt-6 mb-2 px-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <FolderOpen className="w-4 h-4" />
            <span>Categories</span>
          </div>
        </div>

        {loading ? (
          <div className="px-4 py-8 text-center">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 mt-2">Loading...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="px-4 py-4 text-center">
            <p className="text-sm text-slate-500">No categories yet</p>
          </div>
        ) : (
          <div className="space-y-1">
            {categories.map((cat) => {
              const catPath = `/review/${encodeURIComponent(cat.name)}`;
              const active = isActive(catPath);
              return (
                <Link
                  key={cat.name}
                  to={catPath}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all group ${
                    active
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <FolderOpen
                      className={`w-4 h-4 flex-shrink-0 ${
                        active
                          ? "text-indigo-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                    <span className="text-sm font-medium truncate">
                      {cat.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      active
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    }`}
                  >
                    {cat.count}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="font-medium">System Status</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-600 font-semibold">Online</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-slate-200 shadow-sm">
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          <SidebarContent />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-slate-900">Review Store</span>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ReviewStoreLayout;
