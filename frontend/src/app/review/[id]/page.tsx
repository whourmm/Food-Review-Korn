"use client";

import { ChevronLeft, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { RadarChart } from "@/src/components/RadarChart";
import { Restaurant, RestaurantReview } from "@/interface";
import { useEffect, useState } from "react";
import FlipCard from "@/src/components/cards/DetailFlipCard";
import ReviewModal from "@/src/components/preview/ReviewModal";
import ReviewAutoSlider from "@/src/components/slideshow/ReviewAutoSlider";

export default function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: restaurantId } = use(params);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<RestaurantReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch(`/api/restaurants/${restaurantId}`).then((r) => r.json()),
      fetch(`/api/reviews/${restaurantId}`).then((r) => r.json()),
    ])
      .then(([restaurantData, reviewsData]) => {
        if (!restaurantData.error) setRestaurant(restaurantData);
        if (Array.isArray(reviewsData)) setReviews(reviewsData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [restaurantId]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY <= 300) setOffsetY(scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleReviewSubmit = async (review: RestaurantReview) => {
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      // Refresh reviews after submit
      const updated = await fetch(`/api/reviews/${restaurantId}`).then((r) =>
        r.json()
      );
      if (Array.isArray(updated)) setReviews(updated);
    } catch (err) {
      console.error("Failed to submit review", err);
    }
    setShowReviewModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!restaurant) {
    return <div className="p-10 text-center">Restaurant not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-green-600 font-medium"
          >
            <ChevronLeft size={20} />
            Back
          </Link>
        </div>
      </div>

      <div className="relative h-[420px] w-full overflow-hidden">
        <img
          src={restaurant.images[0]}
          alt={restaurant.name}
          className="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
          style={{ transform: `translateY(${offsetY * 0.4}px)` }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-10 w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 h-fit items-start">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {restaurant.name}
                </h1>
                <p className="mt-3 text-gray-200 line-clamp-2">
                  {restaurant.description}
                </p>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
                >
                  Add Review
                </button>
              </div>

              <div className="flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur rounded-xl px-5 py-4 text-center shadow-lg">
                  <div className="text-4xl font-bold text-gray-900">
                    {restaurant.overallScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-500">/ 5.0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <FlipCard title="Score Summary" icon={<Star size={32} />}>
          <RadarChart categories={restaurant.categories} />
        </FlipCard>
        <FlipCard title="Location" icon={<MapPin size={32} />}>
          <iframe
            src={restaurant.location}
            className="w-full h-full rounded-lg"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </FlipCard>

        <FlipCard title="Recent Reviews" icon={<Star size={32} />}>
          {reviews.slice(0, 1).map((review) => (
            <div key={review.id}>
              {review.images?.[0] && (
                <img
                  src={review.images[0]}
                  alt=""
                  className="w-full h-36 object-cover rounded-t-xl"
                />
              )}
              <div className="p-4 space-y-2">
                <p className="text-xs text-gray-500 flex justify-between">
                  <span>By {review.reviewerName}</span>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </p>
                <p className="text-sm text-gray-700 line-clamp-3 italic">
                  "{review.review ?? "No written review"}"
                </p>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-sm text-gray-400 p-4">No reviews yet.</p>
          )}
        </FlipCard>

        {showReviewModal && (
          <ReviewModal
            rid={restaurant.id}
            onClose={() => setShowReviewModal(false)}
            onSubmit={handleReviewSubmit}
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Reviews</h2>
        <ReviewAutoSlider reviews={reviews} />
      </div>
    </div>
  );
}
