export interface ReviewCategory {
  name: string;
  score: number;
}

export const FOOD_TYPES = [
  "Italian",
  "Japanese",
  "Indian",
  "Chinese",
  "Mexican",
  "French",
  "Thai",
  "Korean",
  "American",
  "Mediterranean",
] as const;

export const CATEGORY_TYPES = [
  "Taste",
  "Portion",
  "Convenience",
  "Cost",
  "Scenary",
] as const;

export type CategoryType = 
  "Taste" | 
  "Portion" |
  "Convenience" |
  "Cost" |
  "Scenary";

export type FoodType =
  | "Italian"
  | "Japanese"
  | "Indian"
  | "Chinese"
  | "Mexican"
  | "French"
  | "Thai"
  | "Korean"
  | "American"
  | "Mediterranean";



export interface RestaurantReview {
  id: string;
  restaurantId: string;
  images: string[];
  reviewerName: string;
  categoriesScore: ReviewCategory[];
  review?: string;
  date: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: string;
  images: string[];
  createdBy: string;
  createdAt: string;
  categories: ReviewCategory[];
  overallScore: number;
  foodType: FoodType;
}
/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}