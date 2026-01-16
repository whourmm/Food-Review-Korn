"use client";

import { createContext, useContext } from "react";
import { Restaurant, RestaurantReview } from "@/interface";

type ReviewsContextType = {
  reviews: Restaurant[];
  handleAddReview: (review: Restaurant) => void;
};

export const ReviewsContext =
  createContext<ReviewsContextType | null>(null);

export const useReviews = () => {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error("useReviews must be used within provider");
  return ctx;
};
