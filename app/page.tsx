"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Search, X } from "lucide-react";
import { RadarChart } from "@/components/RadarChart";
import { Restaurant, RestaurantReview } from "@/interface";
import { useReviews } from "@/providers/reviews-context";
import { ChevronDown } from "lucide-react";
import { Calendar } from "lucide-react";
import PlusButton from "@/components/button/PlusButton";
import { MOCK_RESTAURANTS } from "@/mockdata";


export default function MainPage() {
  const  reviews  = MOCK_RESTAURANTS;
 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);



  const calculateAverageScore = (review: Restaurant): number => {
    if (review.categories.length === 0) return 0;
    return (
      review.categories.reduce((sum, cat) => sum + cat.score, 0) /
      review.categories.length
    );
  };

  // Get unique food types for filter
  const foodTypes = useMemo(() => {
    return Array.from(new Set(reviews.map((r) => r.foodType))).sort();
  }, [reviews]);

  // Filter and search logic
  const filteredReviews = useMemo(() => {
    const filtered =  reviews.filter((review) => {
      const matchesSearch =
  
        review.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        selectedFoodType === null || review.foodType === selectedFoodType;
      return matchesSearch && matchesFilter;
    });
    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    
  }, [reviews, searchQuery, selectedFoodType, sortOrder]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍽️</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Food Review Pro
              </h1>
            </div>

            <div className="flex items-center gap-4">
              

              {/* Profile Section */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    Guest User
                  </p>
                  <p className="text-xs text-gray-600">
                    {reviews.length} reviews
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:shadow-lg transition">
                  G
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-600">
            Discover and review your favorite restaurants
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Section */}
            <div className="mb-6  flex items-center justify-between gap-4">
              <div className="">
                <h2 className="text-2xl font-bold text-gray-900">
                {selectedFoodType ? selectedFoodType : "All Restaurants"} (
                {filteredReviews.length})
              </h2>
              <p className="text-gray-600 mt-1">
                Click a card to edit or hover to see the radar chart
              </p>
              </div>
              
              <PlusButton text="Create Memory" path="/review/manage/add" />
            </div>
        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Reviews Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start by adding your first restaurant review!
            </p>
            <Link
              href="/review"
              className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
            >
              Add Your First Review
            </Link>
          </div>
        ) : (
          <div>
            {/* Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <div className="relative w-full md:flex-1 mb-4 md:mb-0">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search restaurants, cuisines, or reviewers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
                {/* Sort by Date */}
                  <div>
               
                    <div className="relative">
                      <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-300 hover:shadow-sm flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar size={18} className="text-purple-600" />
                          <span>
                            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                          </span>
                        </div>
                        <ChevronDown
                          size={18}
                          className={`text-gray-400 transition-transform duration-300 group-hover:text-purple-600 ${
                            isSortOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full left-0 w-full md:w-64 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-300 origin-top z-10 ${
                          isSortOpen
                            ? "opacity-100 scale-y-100 translate-y-0"
                            : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
                        }`}
                      >
                        <button
                          onClick={() => {
                            setSortOrder("newest");
                            setIsSortOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center gap-3 ${
                            sortOrder === "newest"
                              ? "bg-purple-50 text-purple-700 font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <Calendar size={16} />
                          <span>Newest First</span>
                          {sortOrder === "newest" && (
                            <span className="ml-auto text-purple-600">✓</span>
                          )}
                        </button>
                        <div className="h-px bg-gray-200"></div>
                        <button
                          onClick={() => {
                            setSortOrder("oldest");
                            setIsSortOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center gap-3 ${
                            sortOrder === "oldest"
                              ? "bg-purple-50 text-purple-700 font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <Calendar size={16} />
                          <span>Oldest First</span>
                          {sortOrder === "oldest" && (
                            <span className="ml-auto text-purple-600">✓</span>
                          )}
                        </button>
                      </div>
                    </div>
                    </div>
                    </div>

                {/* Filter by Food Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Cuisine
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedFoodType(null)}
                      className={`px-4 py-2 rounded-full font-medium transition ${
                        selectedFoodType === null
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      All Cuisines ({reviews.length})
                    </button>
                    {foodTypes.map((foodType) => {
                      const count = reviews.filter(
                        (r) => r.foodType === foodType,
                      ).length;
                      return (
                        <button
                          key={foodType}
                          onClick={() => setSelectedFoodType(foodType)}
                          className={`px-4 py-2 rounded-full font-medium transition ${
                            selectedFoodType === foodType
                              ? "bg-purple-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {foodType} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            
          

            {/* Restaurant Cards Grid */}
            {filteredReviews.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <p className="text-gray-600 text-lg">
                  No restaurants found matching your search.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFoodType(null);
                  }}
                  className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((review, idx) => {
                  const avgScore = calculateAverageScore(review);
              

                  return (
                    <div
                      key={idx}
                      className="h-96 [perspective:1000px]"
                  
                    >
                      <Link href={`/review/${review.id}`} className="block h-full">
                        <div
                          className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] `}
                        >
                          {/* Front Side - Restaurant Info */}
                          <div className="absolute w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between [backface-visibility:hidden]">
                            {review.images && review.images.length > 0 ? (
                              <img
                                src={review.images[0]}
                                alt={review.name}
                                className="w-full h-40 rounded-lg object-cover mb-4"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-full h-40 rounded-lg bg-gray-200 mb-4 flex items-center justify-center">
                                <span className="text-4xl">🍽️</span>
                              </div>
                            )}

                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1">
                                  {review.name}
                                </h3>
                                <span className="text-xs font-bold text-white bg-purple-600 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                                  {review.foodType}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mb-2">
                                By {review.createdBy}
                              </p>
                              {review.description && (
                                <p className="text-sm text-gray-700 line-clamp-2 italic">
                                  "{review.description}"
                                </p>
                              )}
                            </div>

                            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                  Overall Score
                                </span>
                                <span className="text-2xl font-bold text-purple-600">
                                  {avgScore.toFixed(1)}/5
                                </span>
                              </div>
                            </div>

                         
                          </div>

                          {/* Back Side - Radar Chart */}
                     
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
