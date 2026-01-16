import Link from "next/link";
import { Restaurant } from "@/interface";

interface Props {
  review: Restaurant;
}

export default function RestaurantCard({ review }: Props) {
  const calculateAverageScore = (): number => {
    if (review.categories.length === 0) return 0;
    return (
      review.categories.reduce((sum, cat) => sum + cat.score, 0) /
      review.categories.length
    );
  };

  const avgScore = calculateAverageScore();

  return (
    <div className="h-96">
      <Link href={`/review/${review.id}`} className="block h-full">
        <div className="relative w-full h-full">
          <div className={`absolute w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between ${review.status === "ate" ? "border-green-600" : ""}`}>
            {/* Image */}
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

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1">
                  {review.name}
                </h3>
                <span className="text-xs font-bold text-white bg-green-600 px-2.5 py-1 rounded-full whitespace-nowrap">
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
              {review.status === "ate" ? (
        
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Overall Score
                </span>
                <span className="text-2xl font-bold text-green-600">
                  {avgScore.toFixed(1)}/5
                </span>
              </div>
            </div>
            ) : (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center">  
                <span className="text-sm font-medium text-gray-700">
                  Let's eat here!
                </span>
              </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
