"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import RestaurantForm from "@/components/forms/RestaurantForm";
import RestaurantPreview from "@/components/preview/RestaurantPreview";
import { Restaurant } from "@/interface";
import { MOCK_RESTAURANTS } from "@/mockdata";

export default function CreateRestaurantPage() {
  const router = useRouter();

  const [preview, setPreview] = useState<Restaurant>({
    id: "",
    name: "",
    description: "",
    location: "",
    images: [],
    createdBy: "",
    createdAt: "",
    categories: [],
    overallScore: 0,
  });

  const handleCreateRestaurant = (data: Restaurant) => {
    const newRestaurant: Restaurant = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      images: data.images,
      location: data.location,
      categories: [],
      overallScore: 0,
      createdBy: "",
      createdAt: ""
    };

    MOCK_RESTAURANTS.push(newRestaurant);

    router.push(`/restaurant/${newRestaurant.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition"
          >
            <ChevronLeft size={20} />
            Back
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Create Restaurant
          </h1>
          <p className="text-gray-600">
            Add a new place and start collecting reviews
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT — Live Preview */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Live Preview
            </h2>

            <RestaurantPreview
              name={preview.name}
              description={preview.description}
              image={preview.images[0]}
            />
          </div>

          {/* RIGHT — Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <RestaurantForm
              onCreate={handleCreateRestaurant}
              onChange={setPreview}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
