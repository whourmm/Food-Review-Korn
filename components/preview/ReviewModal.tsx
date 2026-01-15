"use client";

import { X } from "lucide-react";
import { ReviewForm } from "@/components/forms/ReviewForm";
import { RestaurantReview } from "@/interface";

interface Props {
  rid: string;
  onClose: () => void;
  onSubmit: (review: RestaurantReview) => void;
}

export default function ReviewModal({
  rid,
  onClose,
  onSubmit,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl
                      bg-white rounded-xl shadow-xl
                      max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add Review</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <ReviewForm
          rid={rid}
          onSubmit={(review: RestaurantReview) => {
            onSubmit(review);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
