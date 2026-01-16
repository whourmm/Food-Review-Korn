"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface FlipCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  autoFlip?: boolean;     // enable / disable auto flip
  flipOnce?: boolean;    // flip only first time in view
}

export default function FlipCard({
  title,
  icon,
  children,
  autoFlip = true,
  flipOnce = true,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const hasFlipped = useRef(false);

  useEffect(() => {
    if (!autoFlip || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (flipOnce && hasFlipped.current) return;

          setFlipped(true);
          hasFlipped.current = true;
        }
      },
      {
        threshold: 1.0, // 100% visible before flipping
      }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [autoFlip, flipOnce]);

  return (
    <div
      ref={cardRef}
      className="relative h-[320px] w-full cursor-pointer"
      onClick={() => setFlipped((p) => true)}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-white rounded-xl border shadow-lg flex flex-col items-center justify-center gap-3"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="text-purple-600">{icon}</div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">Scroll to reveal</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-white rounded-xl border shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="h-full w-full p-4 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
