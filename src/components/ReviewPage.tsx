import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ReviewForm } from "@/src/components/forms/ReviewForm";
import { RadarChart } from "@/src/components/RadarChart";
import { RestaurantReview, ReviewCategory } from "@/interface";


interface ReviewPageProps {
  reviews: RestaurantReview[];
  onAddReview: (review: RestaurantReview) => void;
}

export default function ReviewPage({ reviews, onAddReview }: ReviewPageProps) {
  const [previewCategories, setPreviewCategories] = useState<ReviewCategory[]>([
    { name: "Taste", score: 3 },
    { name: "Portion", score: 3 },
    { name: "Convenience", score: 3 },
    { name: "Cost", score: 3 },
    { name: "Scenary", score: 3 },
  ]);
  const [previewImageUrl, setPreviewImageUrl] = useState("");

  const handleFormSubmit = (review: RestaurantReview) => {
    onAddReview(review);
    setPreviewCategories([
      { name: "Taste", score: 3 },
      { name: "Portion", score: 3 },
      { name: "Convenience", score: 3 },
      { name: "Cost", score: 3 },
      { name: "Scenary", score: 3 },
    ]);
    setPreviewImageUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition"
              >
                <ChevronLeft size={20} />
                Back
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🍽️</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Food Review Pro
                </h1>
              </div>
            </div>
          
          </div>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Preview and Recent Reviews */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Live Chart Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Live Preview
              </h2>
              <RadarChart
                categories={previewCategories}
                imageUrl={previewImageUrl}
              />
            </div>

            {/* Recent Reviews */}
            {reviews.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Recent Reviews ({reviews.length})
                </h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {reviews.map((review, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start gap-4">
                        {review.images && review.images.length > 0 && (
                          <img
                            src={review.images[0]}
                            alt={review.id}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {review.id}
                          </h3>
                         
                          <p className="text-xs text-gray-500 mb-2">
                            By {review.reviewerName}
                          </p>
                          {review.review && (
                            <p className="text-sm text-gray-700 mb-2 italic">
                              "{review.review}"
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {review.categoriesScore.map((cat, catIdx) => (
                              <span
                                key={catIdx}
                                className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded"
                              >
                                {cat.name}:{" "}
                                <span className="font-bold">{cat.score}/5</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Form Section */}
          {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 order-1 lg:order-2">
            <ReviewForm onSubmit={handleFormSubmit} />
          </div> */}
        </div>
      </div>
    </div>
  );
}
