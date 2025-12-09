import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { reviewStore } from "./reviewStore";
import { GeneratedReviewRecord } from "../../types";
import { StarRating } from "../StarRating";
import {
  Search,
  ArrowLeft,
  FolderOpen,
  Calendar,
  Tag,
  Sparkles,
  Database,
} from "lucide-react";

/**
 * Category-specific Review Page
 * Shows reviews filtered by category
 * Route: /review/:categoryName
 */
export const ReviewCategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<GeneratedReviewRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const decodedCategory = categoryName ? decodeURIComponent(categoryName) : "";

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const all = await reviewStore.getAllReviews();
        if (!cancelled) setReviews(all);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Failed to load reviews");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    let base = reviews.filter((r) => r.category === decodedCategory);

    if (search.trim()) {
      const q = search.toLowerCase();
      base = base.filter(
        (r) =>
          r.businessName.toLowerCase().includes(q) ||
          r.reviewText.toLowerCase().includes(q)
      );
    }

    return base.sort((a, b) =>
      (a.createdAt || "") < (b.createdAt || "") ? 1 : -1
    );
  }, [reviews, decodedCategory, search]);

  const stats = useMemo(() => {
    return {
      total: filtered.length,
      ai: filtered.filter((r) => !r.isFallback).length,
      fallback: filtered.filter((r) => r.isFallback).length,
    };
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Category header */}
            <div className="flex items-center gap-3">
              <FolderOpen className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-slate-900">
                {decodedCategory}
              </h1>
            </div>

            {/* Right side - Search Control */}
            <div className="lg:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by business name or review text..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Search results info */}
          {search && (
            <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold">{filtered.length}</span>{" "}
                result{filtered.length !== 1 ? "s" : ""} for "{search}"
              </p>
              <button
                onClick={() => setSearch("")}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <Database className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-medium text-slate-600">
                Total Reviews
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-medium text-slate-600">
                AI Generated
              </span>
            </div>
            <p className="text-2xl font-bold text-indigo-600">{stats.ai}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <Tag className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-slate-600">
                Fallback
              </span>
            </div>
            <p className="text-2xl font-bold text-amber-600">
              {stats.fallback}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-600 font-medium">Loading reviews...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-sm font-bold">!</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-red-900 mb-1">
                  Error Loading Reviews
                </h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-20">
            <div className="text-center">
              <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                No Reviews Found
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                {search
                  ? "Try adjusting your search criteria"
                  : `No reviews available in ${decodedCategory} category yet`}
              </p>
              <button
                onClick={() => navigate("/review")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Reviews Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <div
                key={(r.id || Math.random()) + r.reviewText.slice(0, 8)}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-3 border-b border-slate-200">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h2
                        className="text-base font-semibold text-slate-900 truncate mb-1"
                        title={r.businessName}
                      >
                        {r.businessName}
                      </h2>
                      {/* <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-700">
                          {r.category}
                        </span>
                      </div> */}
                    </div>
                    <div className="shrink-0">
                      <StarRating
                        rating={r.rating}
                        onRatingChange={() => {}}
                        size="sm"
                        interactive={false}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <p className="text-sm text-slate-700 leading-relaxed mb-4 ">
                    {r.reviewText}
                  </p>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="font-medium">{r.language}</span>
                      {r.tone && (
                        <>
                          {/* <span className="text-slate-300">•</span> */}
                          {/* <span className="capitalize">{r.tone}</span> */}
                        </>
                      )}
                    </div>
                     <div className="flex items-center gap-1.5 flex-wrap">
                      {/* Services Tags */}
                      {r.services && r.services.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {r.services.slice(0, 3).map((s, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                            >
                              {s}
                            </span>
                          ))}
                          {r.services.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600">
                              +{r.services.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 ">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      {/* Timestamp */}
                      {r.createdAt && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500">
                            {new Date(r.createdAt).toLocaleString("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                     <div className="flex items-center gap-1.5 flex-wrap">
                      {r.isFallback ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <Tag className="w-3 h-3 mr-1" />
                          Fallback
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                          <Sparkles className="w-3 h-3 mr-1" />
                          AI
                        </span>
                      )}
                      {r.generationSource === "auto" && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          ⚡ Auto
                        </span>
                      )}
                      {r.generationSource === "service" && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          🎯 Service
                        </span>
                      )}
                      {r.generationSource === "manual" && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                          🔄 Manual
                        </span>
                      )}
                    </div>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCategoryPage;
