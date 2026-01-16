export function ReviewCard({ review }: { review: any }) {
  return (
    <div
      className="min-w-[320px] max-w-[320px]
                 bg-white rounded-xl shadow-sm
                 flex-shrink-0"
    >
      {review.images?.[0] && (
        <img
          src={review.images[0]}
          alt=""
          className="w-full h-36 object-cover rounded-t-xl"
        />
      )}

      <div className="p-4 space-y-2">
        <p className="font-semibold text-gray-900 text-sm">
          {review.name}
        </p>

        <p className="text-xs text-gray-500 flex justify-between">
          <span>By {review.reviewerName} </span> <span>{new Date(review.date).toLocaleDateString()}  </span>
        </p>

        <p className="text-sm text-gray-700 line-clamp-3 italic">
          “{review.review ?? "No written review"}”
        </p>
      </div>
    </div>
  );
}
