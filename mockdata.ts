import { RestaurantReview } from "./interface";
import { Restaurant } from "@/interface";
export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "Midnight Ramen",
    description:
      "A cozy Japanese ramen bar known for its rich tonkotsu broth and perfectly cooked noodles. Popular among night owls and ramen lovers.",
    location: "https://www.google.com/maps?q=สุขุมวิท+26+Bangkok&output=embed",
    images: [
      "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop",
    ],
    createdBy: "Kenji Tanaka",
    createdAt: "2024-04-12T18:30:00Z",
    categories: [
      { name: "Taste", score: 5 },
      { name: "Portion", score: 4 },
      { name: "Convenience", score: 5 },
      { name: "Cost", score: 4 },
      { name: "Scenery", score: 3 },
    ],
    overallScore: 4.2,
    foodType: "Japanese",
  },
  {
    id: "2",
    name: "Green Bowl Society",
    description:
      "A modern vegan restaurant serving colorful bowls made from fresh, organic ingredients. Very popular on Instagram.",
    location: "https://www.google.com/maps?q=สุขุมวิท+26+Bangkok&output=embed",
    images: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=500&fit=crop",
    ],
    createdBy: "Lily Wong",
    createdAt: "2024-03-25T10:00:00Z",
    categories: [
      { name: "Taste", score: 4 },
      { name: "Portion", score: 4 },
      { name: "Convenience", score: 4 },
      { name: "Cost", score: 3 },
      { name: "Scenery", score: 5 },
    ],
    overallScore: 4.0,
    foodType: "American",
  },
  {
    id: "3",
    name: "Bangkok Flame",
    description:
      "Authentic Thai street-style restaurant famous for bold flavors and serious spice. Fast service and great value.",
    location: "https://www.google.com/maps?q=สุขุมวิท+26+Bangkok&output=embed",
    images: [
      "https://images.unsplash.com/photo-1604908554168-8b9f60c9b2d4?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500&h=500&fit=crop",
    ],
    createdBy: "Nattapong S.",
    createdAt: "2024-02-18T12:15:00Z",
    categories: [
      { name: "Taste", score: 5 },
      { name: "Portion", score: 5 },
      { name: "Convenience", score: 4 },
      { name: "Cost", score: 5 },
      { name: "Scenery", score: 3 },
    ],
    overallScore: 4.4,
    foodType: "Thai",

  },
  {
    id: "4",
    name: "Nordic Roast",
    description:
      "Minimalist Scandinavian-style café serving specialty coffee and pastries. Ideal for work and casual meetings.",
    location: "https://www.google.com/maps?q=สุขุมวิท+26+Bangkok&output=embed",
    images: [
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop",
    ],
    createdBy: "Oliver Brown",
    createdAt: "2024-01-30T09:00:00Z",
    categories: [
      { name: "Taste", score: 4 },
      { name: "Portion", score: 3 },
      { name: "Convenience", score: 5 },
      { name: "Cost", score: 3 },
      { name: "Scenery", score: 5 },
    ],
    overallScore: 4.0,
    foodType: "Mediterranean",
  }
];
export const MOCK_REVIEWS: RestaurantReview[] = [
  {
    id: "1",
    restaurantId: "1",

    images: [
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=500&fit=crop" ],
    reviewerName: "Sarah Johnson",
    review:
      "Absolutely amazing homemade pasta and authentic Italian flavors. The ambiance is perfect for dinner dates!",
    categoriesScore: [
      { name: "Taste", score: 5 },
      { name: "Portion", score: 4 },
      { name: "Convenience", score: 4 },
      { name: "Cost", score: 3 },
      { name: "Scenery", score: 4 },
    ],
    date: "2024-06-01T10:00:00Z",
  },
  {
    id: "2",
    restaurantId: "2",
  
    images: [
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop"],
    reviewerName: "Michael Chen",
    review:
      "Fresh fish and expert sushi rolling. Prices are high but the quality is unmatched in the area.",
    categoriesScore: [
      { name: "Taste", score: 5 },
      { name: "Portion", score: 3 },
      { name: "Convenience", score: 5 },
      { name: "Cost", score: 2 },
      { name: "Scenery", score: 4 },
    ],
    date: "2024-05-28T14:30:00Z",
  },
  {
    id: "3",
    restaurantId: "3",

    images: [
      "https://images.unsplash.com/photo-1585864299869-592a5dff2b17?w=500&h=500&fit=crop" ],
    reviewerName: "Priya Patel",
    review:
      "Authentic spices and generous portions. Great value for money and the staff is super friendly!",
    categoriesScore: [
      { name: "Taste", score: 4 },
      { name: "Portion", score: 5 },
      { name: "Convenience", score: 3 },
      { name: "Cost", score: 4 },
      { name: "Scenery", score: 4 },
    ],
    date: "2024-05-20T18:15:00Z",
  },
  {
    id: "4",
    restaurantId: "4",

    images: [
      "https://images.unsplash.com/photo-1584622614875-e90145042e62?w=500&h=500&fit=crop" ],
    reviewerName: "James Wilson",
    review:
      "Quick service and delicious stir-fries. Perfect for a casual lunch break without compromising on taste.",
    categoriesScore: [
      { name: "Taste", score: 4 },
      { name: "Portion", score: 4 },
      { name: "Convenience", score: 5 },
      { name: "Cost", score: 4 },
      { name: "Scenery", score: 4 },
    ],
    date: "2024-05-15T12:45:00Z",
  },
  {
    id: "5",
    restaurantId: "5",
 
    images: [
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=500&fit=crop" ],
    reviewerName: "Carlos Rodriguez",
    review:
      "Best tacos in town! Everything is made fresh daily and the prices are unbeatable. Highly recommended!",
    categoriesScore: [
      { name: "Taste", score: 5 },
      { name: "Portion", score: 5 },
      { name: "Convenience", score: 4 },
      { name: "Cost", score: 5 },
      { name: "Overall", score: 5 },
    ],
    date: "2024-05-10T16:20:00Z",
  },
  {
    id: "6",
    restaurantId: "6",
   
    images: [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=500&fit=crop" ],
    reviewerName: "Emma Thompson",
    review:
      "Excellent French cuisine but quite expensive. Worth visiting for special occasions.",
    categoriesScore: [
      { name: "Taste", score: 5 },
      { name: "Portion", score: 3 },
      { name: "Convenience", score: 2 },
      { name: "Cost", score: 2 },
      { name: "Overall", score: 3 },
    ],
    date: "2024-05-05T19:00:00Z",
  },
];
