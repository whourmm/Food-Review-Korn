"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import RestaurantForm from "@/src/components/forms/RestaurantForm";
import RestaurantPreview from "@/src/components/preview/RestaurantPreview";
import { Restaurant } from "@/interface";

export default function CreateRestaurantPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    foodType: "Others",
    status: "draft",
  });

  const handleCreateRestaurant = async (data: Restaurant) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          location: data.location,
          images: data.images,
          createdBy: session?.user?.name ?? "",
          categories: [],
          overallScore: 0,
          foodType: data.foodType,
          status: "draft",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(JSON.stringify(err));
        return;
      }

      const created: Restaurant = await res.json();
      router.push(`/review/${created.id}`);
    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Live Preview
            </h2>

            <RestaurantPreview
              name={preview.name}
              description={preview.description}
              image={preview.images[0]}
              location={preview.location}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {submitting ? (
              <p className="text-gray-500 text-center py-8">Creating restaurant...</p>
            ) : (
              <RestaurantForm
                onCreate={handleCreateRestaurant}
                onChange={setPreview}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
