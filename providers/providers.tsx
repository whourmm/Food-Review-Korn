"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RestaurantReview } from "@/interface";
import { ReviewsContext } from "./reviews-context";
import { MOCK_REVIEWS } from "@/mockdata";


const queryClient = new QueryClient();



export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reviews, setReviews] =
    useState<RestaurantReview[]>(MOCK_REVIEWS);

  const handleAddReview = (review: RestaurantReview) => {
    setReviews((prev) => [review, ...prev]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* ส่ง state ผ่าน Context */}
        <ReviewsContext.Provider value={{ reviews, handleAddReview }}>
          {children}
        </ReviewsContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
