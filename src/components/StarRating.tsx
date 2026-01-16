"use client";

import { Star } from "lucide-react";
import { cn } from "@/src/libs/utils";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export default function StarRating({
  value,
  onChange,
  max = 5,
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex justify-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const score = i + 1;
        const active = hover !== null ? score <= hover : score <= value;

        return (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            onMouseEnter={() => setHover(score)}
            onMouseLeave={() => setHover(null)}
            className="focus:outline-none"
            aria-label={`Rate ${score} star`}
          >
            <Star
              className={cn(
                "h-7 w-7 transition",
                active
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
