import  { RestaurantReview } from "@/interface";

interface ReviewCardProps {
  review: RestaurantReview;
}

export default function RestaurantCard({ review }: ReviewCardProps) {
  const avgScore =
    review.categories.reduce((sum, c) => sum + c.score, 0) /
    review.categories.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
      {review.images && review.images.length > 0 && (
        <img
          src={review.images[0]}
          alt={review.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {review.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{review.foodType}</p>
          <p className="text-xs text-gray-500 mt-2">
            Reviewed by: {review.reviewerName}
          </p>
        </div>

        {review.review && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700 italic">"{review.review}"</p>
          </div>
        )}

        <div className="mb-4 p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Average Score
            </span>
            <span className="text-lg font-bold text-purple-600">
              {avgScore.toFixed(1)}/5
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-900">
            Category Scores
          </h4>
          <div className="space-y-1.5">
            {review.categories.map((cat, catIdx) => (
              <div
                key={catIdx}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-600">{cat.name}</span>
                <span className="font-semibold text-purple-600">
                  {cat.score}/5
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}