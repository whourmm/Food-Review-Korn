import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Restaurant  } from "@/interface";
import { ReviewCard } from "./cards/ReviewCard";

interface ReviewsListPageProps {
  reviews: Restaurant[];
}

export default function RestaurantList({ reviews }: ReviewsListPageProps) {
  const uniqueFoods = Array.from(new Set(reviews.map((r) => r.id)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-4"
          >
            <ChevronLeft size={20} />
            Back to Review
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍽️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              All Food Reviews
            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            Browse all {reviews.length} reviews
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg">
              No reviews yet. Start by adding one!
            </p>
            <Link
              to="/"
              className="inline-block mt-4 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
            >
              Create Your First Review
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-sm font-medium text-gray-600">
                  Total Reviews
                </div>
                <div className="text-3xl font-bold text-green-600 mt-2">
                  {reviews.length}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-sm font-medium text-gray-600">
                  Food Types
                </div>
                <div className="text-3xl font-bold text-green-600 mt-2">
                  {uniqueFoods.length}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-sm font-medium text-gray-600">
                  Unique Restaurants
                </div>
                <div className="text-3xl font-bold text-green-600 mt-2">
                  {new Set(reviews.map((r) => r.name)).size}
                </div>
              </div>
            </div>

            {/* Food Types Overview */}
            {uniqueFoods.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Food Types
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uniqueFoods.map((food) => {
                    const count = reviews.filter(
                      (r) => r.foodType === food,
                    ).length;
                    const avgScore =
                      reviews
                        .filter((r) => r.foodType === food)
                        .reduce(
                          (acc, r) =>
                            acc +
                            r.categories.reduce((sum, c) => sum + c.score, 0) /
                              r.categories.length,
                          0,
                        ) / count || 0;
                    return (
                      <div
                        key={food}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <h3 className="font-semibold text-gray-900">{food}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {count} review{count !== 1 ? "s" : ""}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600">
                            Avg Score:
                          </span>
                          <span className="text-sm font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded">
                            {avgScore.toFixed(1)}/5
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review, idx) => (
                <ReviewCard key={idx} review={review} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
