"use client";

import { ChevronLeft, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { RadarChart } from "@/components/RadarChart";
import { Restaurant } from "@/interface";
import {MOCK_RESTAURANTS} from "@/mockdata"
import { useEffect, useState } from "react";
import { MOCK_REVIEWS } from "@/mockdata";
import FlipCard from "@/components/cards/DetailFlipCard";
import ReviewModal from "@/components/preview/ReviewModal";
import ReviewAutoSlider from "@/components/slideshow/ReviewAutoSlider";





export default function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: restaurantId } = use(params);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const restaurant: Restaurant = MOCK_RESTAURANTS.find( (r : Restaurant) => r.id === restaurantId)!;
  const reviews = MOCK_REVIEWS.filter( (rev) => rev.restaurantId === restaurantId);
  const [offsetY, setOffsetY] = useState(0);

  // 🔹 Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // จำกัด effect แค่ช่วง banner
      if (scrollY <= 300) {
        setOffsetY(scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!restaurant) {
    return <div className="p-10 text-center">Restaurant not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-purple-600 font-medium"
          >
            <ChevronLeft size={20} />
            Back
          </Link>
        </div>
      </div>

      {/* Parallax Banner */}
      {/* Parallax Banner */}
<div className="relative h-[420px] w-full overflow-hidden">
  {/* Background image */}
  <img
    src={restaurant.images[0]}
    alt={restaurant.name}
    className="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
    style={{
      transform: `translateY(${offsetY * 0.4}px)`,
    }}
  />

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

  {/* Content on banner */}
  <div className="absolute inset-0 flex items-end">
    <div className="max-w-7xl mx-auto px-6 pb-10 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 h-fit items-start">
        {/* Left: Name + description */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {restaurant.name}
          </h1>
          <p className="mt-3 text-gray-200 line-clamp-2">
            {restaurant.description}
          </p>
          <button
  onClick={() => setShowReviewModal(true)}
  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5
             bg-purple-600 hover:bg-purple-700
             text-white font-medium rounded-lg transition"
>
  Add Review
</button>
        </div>

        {/* Right: Score */}
       <div className=" flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur rounded-xl px-5 py-4 text-center shadow-lg  ">
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


      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
    
<FlipCard
  title="Score Summary"
  icon={<Star size={32} />}
>
  <RadarChart categories={restaurant.categories} />
</FlipCard>
<FlipCard
  title="Location"
  icon={<MapPin size={32} />}
>
  <iframe
    src={restaurant.location}
    className="w-full h-full rounded-lg"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</FlipCard>

<FlipCard
  title="Recent Reviews"
  icon={<Star size={32} />}
>
 
    {reviews.slice(0, 1).map((review, idx) => (
      <div
      
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
      
    ))}

</FlipCard>




{showReviewModal && (
  <ReviewModal
    rid={restaurant.id}
    onClose={() => setShowReviewModal(false)}
    onSubmit={(review) => {
      console.log("New review:", review);
      // later: save to DB or update state
    }}
  />
)}



           
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10">

<h2 className="text-2xl font-bold text-gray-900 mb-4 ">
  All Reviews
</h2>
<div className=" ">

<ReviewAutoSlider reviews={reviews} />
</div>

</div>
    </div>
  );
}