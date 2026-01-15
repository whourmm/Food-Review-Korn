"use client";

import { createContext, useContext } from "react";
import { RestaurantReview } from "@/interface";

type ReviewsContextType = {
  reviews: RestaurantReview[];
  handleAddReview: (review: RestaurantReview) => void;
};

export const ReviewsContext =
  createContext<ReviewsContextType | null>(null);

export const useReviews = () => {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error("useReviews must be used within provider");
  return ctx;
};
