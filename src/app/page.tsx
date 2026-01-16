"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Restaurant } from "@/interface";
import { ChevronDown } from "lucide-react";
import { Calendar } from "lucide-react";
import PlusButton from "@/src/components/button/PlusButton";
import { MOCK_RESTAURANTS } from "@/mockdata";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/cards/RestaurantCard";

export default function MainPage() {
  const { data: session } = useSession();
  const reviews = MOCK_RESTAURANTS;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedEatStatus, setSelectedEatStatus] = useState<
    "all" | "ate" | "not_ate"
  >("all");


  // Get unique food types for filter
  const foodTypes = useMemo(() => {
    return Array.from(new Set(reviews.map((r) => r.foodType))).sort();
  }, [reviews]);

  // Filter and search logic
  const filteredReviews = useMemo(() => {
    const filtered = reviews.filter((review) => {
      const matchesSearch =
        review.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) || 
        review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.foodType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFoodType =
        selectedFoodType === null || review.foodType === selectedFoodType;

      const matchesEatStatus =
        selectedEatStatus === "all" ||
        (selectedEatStatus === "ate" && review.status === "ate") ||
        (selectedEatStatus === "not_ate" && review.status !== "ate");

      return matchesSearch && matchesFoodType && matchesEatStatus;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [reviews, searchQuery, selectedFoodType, selectedEatStatus, sortOrder]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Section */}
        <div className="mb-6  flex items-center justify-between gap-4">
          <div className="">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedFoodType ? selectedFoodType : "All Restaurants"} 
            </h2>
            <p className="text-gray-600 mt-1">
              Our Eat Eat Plan Trip!
            </p>
          </div>

          {session && <PlusButton text="Create Eat Plan" path="/review/manage/add" />}
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
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
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
                        className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 hover:shadow-sm flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar size={18} className="text-green-600" />
                          <span>
                            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                          </span>
                        </div>
                        <ChevronDown
                          size={18}
                          className={`text-gray-400 transition-transform duration-300 group-hover:text-green-600 ${isSortOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full left-0 w-full md:w-64 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-300 origin-top z-10 ${isSortOpen
                            ? "opacity-100 scale-y-100 translate-y-0"
                            : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
                          }`}
                      >
                        <button
                          onClick={() => {
                            setSortOrder("newest");
                            setIsSortOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center gap-3 ${sortOrder === "newest"
                              ? "bg-green-50 text-green-700 font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          <Calendar size={16} />
                          <span>Newest First</span>
                          {sortOrder === "newest" && (
                            <span className="ml-auto text-green-600">✓</span>
                          )}
                        </button>
                        <div className="h-px bg-gray-200"></div>
                        <button
                          onClick={() => {
                            setSortOrder("oldest");
                            setIsSortOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center gap-3 ${sortOrder === "oldest"
                              ? "bg-green-50 text-green-700 font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          <Calendar size={16} />
                          <span>Oldest First</span>
                          {sortOrder === "oldest" && (
                            <span className="ml-auto text-green-600">✓</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  {/* Filter by Food Type */}
                  <div className="flex gap-10 items-center ">
                    <label className="block text-sm font-medium text-gray-700 h-full flex items-center">
                      Filter by Cuisine
                    </label>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <button
                        onClick={() => setSelectedFoodType(null)}
                        className={`px-4 py-1 rounded-full font-medium transition ${selectedFoodType === null
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                      >
                        All ({reviews.length})
                      </button>
                      {foodTypes.map((foodType) => {
                        const count = reviews.filter(
                          (r) => r.foodType === foodType,
                        ).length;
                        return (
                          <button
                            key={foodType}
                            onClick={() => setSelectedFoodType(foodType)}
                            className={`px-4 py-2 rounded-full font-medium transition ${selectedFoodType === foodType
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                          >
                            {foodType} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Filter by Eat Status */}
                  <div className="flex gap-6 items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Filter by Status
                    </label>

                    <div className="flex gap-2 text-sm">
                      <button
                        onClick={() => setSelectedEatStatus("all")}
                        className={`px-4 py-1.5 rounded-full font-medium transition ${selectedEatStatus === "all"
                            ? "bg-gray-800 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                      >
                        All
                      </button>

                      <button
                        onClick={() => setSelectedEatStatus("ate")}
                        className={`px-4 py-1.5 rounded-full font-medium transition ${selectedEatStatus === "ate"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                      >
                        Ate
                      </button>

                      <button
                        onClick={() => setSelectedEatStatus("not_ate")}
                        className={`px-4 py-1.5 rounded-full font-medium transition ${selectedEatStatus === "not_ate"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                      >
                        Not Yet Ate
                      </button>
                    </div>
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
                  className="mt-4 text-green-600 hover:text-green-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredReviews.map((review) => (
                  <RestaurantCard key={review.id} review={review} />
                ))}

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
