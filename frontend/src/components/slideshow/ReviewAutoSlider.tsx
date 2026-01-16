"use client";

import { useEffect, useRef, useState } from "react";
import { RestaurantReview } from "@/interface";
import { ReviewCard } from "../cards/ReviewCard";

export default function ReviewAutoSlider({
  reviews,
}: {
  reviews: RestaurantReview[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let scrollAmount = 0;

    const interval = setInterval(() => {
      if (paused) return;

      scrollAmount += 1;
      el.scrollLeft = scrollAmount;

      // Infinite loop
      if (
        el.scrollLeft + el.clientWidth >=
        el.scrollWidth
      ) {
        scrollAmount = 0;
        el.scrollLeft = 0;
      }
    }, 20); // speed

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex gap-6 overflow-x-hidden py-4 w-full"
    >
      {[...reviews].map((review, idx) => (
        <ReviewCard key={idx} review={review} />
      ))}
    </div>
  );
}
