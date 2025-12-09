import React, { useEffect, useState, useMemo } from "react";
import { reviewStore } from "./reviewStore";
import { GeneratedReviewRecord } from "../../types";
import { Search, Building2, TrendingUp, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Review Store Search Page
 * Allows searching through all businesses in the database with autocomplete suggestions
 * Supports multiple business selection
 */
export const ReviewSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<GeneratedReviewRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
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

  // Get unique business names with review count
  const businesses = useMemo(() => {
    const businessMap: Record<string, number> = {};
    reviews.forEach((r) => {
      const name = r.businessName;
      businessMap[name] = (businessMap[name] || 0) + 1;
    });
    return Object.entries(businessMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [reviews]);

  // Filter businesses based on search query, excluding already selected ones
  const filteredBusinesses = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return businesses.filter(
      (b) =>
        b.name.toLowerCase().includes(query) &&
        !selectedBusinesses.includes(b.name)
    );
  }, [businesses, searchQuery, selectedBusinesses]);

  // Get reviews for all selected businesses
  const selectedBusinessReviews = useMemo(() => {
    if (selectedBusinesses.length === 0) return [];
    return reviews.filter((r) => selectedBusinesses.includes(r.businessName));
  }, [selectedBusinesses, reviews]);

  // Group reviews by business name
  const groupedReviews = useMemo(() => {
    const grouped: Record<string, GeneratedReviewRecord[]> = {};
    selectedBusinessReviews.forEach((review) => {
      if (!grouped[review.businessName]) {
        grouped[review.businessName] = [];
      }
      grouped[review.businessName].push(review);
    });
    return grouped;
  }, [selectedBusinessReviews]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectBusiness = (businessName: string) => {
    if (!selectedBusinesses.includes(businessName)) {
      setSelectedBusinesses([...selectedBusinesses, businessName]);
    }
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleRemoveBusiness = (businessName: string) => {
    setSelectedBusinesses(
      selectedBusinesses.filter((name) => name !== businessName)
    );
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedBusinesses([]);
    setShowSuggestions(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between gap-6">
        {/* <h1 className="text-3xl font-bold text-slate-900 whitespace-nowrap">
          Search Reviews
        </h1> */}
        <div className="relative flex-1 lg:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search and add multiple businesses..."
            className="w-full pl-12 pr-12 py-4 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <X className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Search Box */}
      <div className="mb-8 relative">
        {/* Selected Businesses Tags */}
        {selectedBusinesses.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-slate-600">
              Selected ({selectedBusinesses.length}):
            </span>
            {selectedBusinesses.map((business, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{business}</span>
                <button
                  onClick={() => handleRemoveBusiness(business)}
                  className="hover:bg-indigo-200 rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${business}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button
              onClick={handleClearAll}
              className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Autocomplete Suggestions */}
        {showSuggestions && searchQuery && filteredBusinesses.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Suggestions ({filteredBusinesses.length})
              </div>
              {filteredBusinesses.map((business, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectBusiness(business.name)}
                  className="w-full flex items-center justify-between px-3 py-3 hover:bg-indigo-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Plus className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 flex-shrink-0" />
                    <Building2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700 truncate">
                      {business.name}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 rounded-full">
                    {business.count} reviews
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading businesses...</p>
        </div>
      )}

      {/* No Search Query */}
      {!loading && selectedBusinesses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Search for Businesses
          </h3>
          <p className="text-slate-600 mb-6">
            Type a business name and add multiple businesses to view all their
            reviews
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 justify-center">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Available Businesses ({businesses.length})
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {businesses.slice(0, 10).map((business, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectBusiness(business.name)}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    {business.name}
                  </button>
                ))}
                {businesses.length > 10 && (
                  <span className="px-3 py-1.5 text-sm text-slate-500">
                    +{businesses.length - 10} more...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {!loading && selectedBusinesses.length > 0 && (
        <div>
          {/* Summary Header */}
          <div className="mb-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Search Results
                </h2>
                <p className="text-slate-600">
                  {selectedBusinessReviews.length} review
                  {selectedBusinessReviews.length !== 1 ? "s" : ""} from{" "}
                  {selectedBusinesses.length} business
                  {selectedBusinesses.length !== 1 ? "es" : ""}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-600">Total Businesses</div>
                <div className="text-3xl font-bold text-indigo-600">
                  {selectedBusinesses.length}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Grouped by Business */}
          <div className="space-y-8">
            {Object.entries(groupedReviews).map(([businessName, reviews]) => (
              <div key={businessName} className="space-y-4">
                {/* Business Header */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-200">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-xl font-bold text-slate-900">
                      {businessName}
                    </h3>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full">
                      {reviews.length} review
                      {reviews.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveBusiness(businessName)}
                    className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Remove
                  </button>
                </div>

                {/* Reviews Grid for this business */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                            {review.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-slate-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm mb-4 line-clamp-4">
                        {review.reviewText}
                      </p>

                      <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{review.language}</span>
                          {review.tone && (
                            <span className="capitalize">{review.tone}</span>
                          )}
                        </div>
                        {review.createdAt && (
                          <span>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      {review.services && review.services.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {review.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      )}

                      {review.isFallback && (
                        <div className="mt-3 text-xs text-orange-600 font-medium">
                          Fallback Review
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results for current search query */}
      {!loading &&
        searchQuery &&
        filteredBusinesses.length === 0 &&
        selectedBusinesses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No Results Found
            </h3>
            <p className="text-slate-600 mb-4">
              No businesses found matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
    </div>
  );
};

export default ReviewSearchPage;
