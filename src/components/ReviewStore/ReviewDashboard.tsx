import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { reviewStore } from "./reviewStore";
import { GeneratedReviewRecord } from "../../types";
import {
  Database,
  Filter,
  Eye,
  Calendar,
  FolderOpen,
  TrendingUp,
  Building2,
} from "lucide-react";

/**
 * Review Store Dashboard
 * Shows statistics and overview of all generated reviews
 */
export const ReviewDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<GeneratedReviewRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  const stats = useMemo(() => {
    const categoryMap: Record<string, number> = {};
    reviews.forEach((r) => {
      const cat = r.category || "Uncategorized";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    // Recent activity (last 7 days)
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentReviews = reviews.filter(
      (r) => r.createdAt && new Date(r.createdAt) >= sevenDaysAgo
    );

    // This month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonth = reviews.filter(
      (r) => r.createdAt && new Date(r.createdAt) >= startOfMonth
    );

    // Day-wise analysis
    const dayWiseMap: Record<
      string,
      {
        date: string;
        totalReviews: number;
        categories: Set<string>;
        businesses: Set<string>;
      }
    > = {};

    reviews.forEach((r) => {
      if (!r.createdAt) return;

      const date = new Date(r.createdAt);
      const dateKey = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });

      if (!dayWiseMap[dateKey]) {
        dayWiseMap[dateKey] = {
          date: dateKey,
          totalReviews: 0,
          categories: new Set(),
          businesses: new Set(),
        };
      }

      dayWiseMap[dateKey].totalReviews++;
      dayWiseMap[dateKey].categories.add(r.category || "Uncategorized");
      dayWiseMap[dateKey].businesses.add(r.businessName);
    });

    const dayWiseStats = Object.values(dayWiseMap)
      .map((day) => ({
        date: day.date,
        totalReviews: day.totalReviews,
        categories: day.categories.size,
        businesses: day.businesses.size,
      }))
      .sort((a, b) => {
        // Sort by date (most recent first)
        const [dayA, monthA, yearA] = a.date.split("/").map(Number);
        const [dayB, monthB, yearB] = b.date.split("/").map(Number);
        const dateA = new Date(2000 + yearA, monthA - 1, dayA);
        const dateB = new Date(2000 + yearB, monthB - 1, dayB);
        return dateB.getTime() - dateA.getTime();
      });

    return {
      total: reviews.length,
      ai: reviews.filter((r) => !r.isFallback).length,
      fallback: reviews.filter((r) => r.isFallback).length,
      categories: Object.keys(categoryMap).length,
      categoryBreakdown: Object.entries(categoryMap)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count })),
      recent: recentReviews.length,
      thisMonth: thisMonth.length,
      dayWiseStats,
    };
  }, [reviews]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      {/* <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-600 font-medium">Loading dashboard...</p>
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
                  Error Loading Dashboard
                </h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Top Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Reviews */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Database className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  Total Reviews
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.total}
                </p>
              </div>

              {/* Active Today */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Eye className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  Active Today
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.total}
                </p>
              </div>

              {/* This Month */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    +40.0%
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  This Month
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.thisMonth}
                </p>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Filter className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  Categories
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.categories}
                </p>
              </div>
            </div>

            {/* Day-wise Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Day-wise Analysis
                  </h3>
                </div>
              </div>
              <div className="p-6">
                {stats.dayWiseStats.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600">No daily data available</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                            Date
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">
                            Total Reviews
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">
                            Categories
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">
                            Businesses
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.dayWiseStats.map((day, index) => (
                          <tr
                            key={day.date}
                            className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                              index === 0 ? "bg-blue-50" : ""
                            }`}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <span className="font-medium text-slate-900">
                                  {day.date}
                                </span>
                                {index === 0 && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                                    Latest
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="inline-flex items-center gap-1.5">
                                <Database className="w-4 h-4 text-blue-600" />
                                <span className="font-bold text-slate-900 text-lg">
                                  {day.totalReviews}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="inline-flex items-center gap-1.5">
                                <Filter className="w-4 h-4 text-indigo-600" />
                                <span className="font-bold text-slate-900 text-lg">
                                  {day.categories}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="inline-flex items-center gap-1.5">
                                <Building2 className="w-4 h-4 text-emerald-600" />
                                <span className="font-bold text-slate-900 text-lg">
                                  {day.businesses}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Categories Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-slate-600" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    All Categories
                  </h3>
                </div>
              </div>
              <div className="p-6">
                {stats.categoryBreakdown.length === 0 ? (
                  <div className="text-center py-8">
                    <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600">No categories found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stats.categoryBreakdown.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() =>
                          navigate(`/review/${encodeURIComponent(cat.name)}`)
                        }
                        className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group text-left"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors flex-shrink-0">
                            <FolderOpen className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-slate-900 truncate">
                              {cat.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {cat.count} review{cat.count !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-semibold text-sm group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                            {cat.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewDashboard;
