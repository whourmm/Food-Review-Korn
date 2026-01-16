"use client";

import { MapPin, Star } from "lucide-react";
import { getGoogleMapsEmbedSrc } from "@/src/utils/map/getGoogleMapsEmbedSrc";

interface RestaurantPreviewProps {
  name: string;
  description: string;
  image: string;
  location: string;
}

export default function RestaurantPreview({
  name,
  description,
  image,
  location,
}: RestaurantPreviewProps) {
  const mapSrc = getGoogleMapsEmbedSrc(location);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Image */}
      <div className="h-48 bg-gray-200">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Image preview
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h2 className="text-2xl font-bold text-gray-900">
          {name || "Restaurant Name"}
        </h2>

        <p className="text-gray-600 line-clamp-3">
          {description || "Restaurant description will appear here..."}
        </p>

        {/* Location text */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={16} />
          
        </div>

        {/* 🗺️ Google Map Preview */}
        {location && (
          <div className="w-full h-40 rounded-lg overflow-hidden border">
            <iframe
              src={mapSrc}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        <div className="flex items-center gap-1 text-yellow-500 pt-2">
          <Star size={16} />
          <span className="text-gray-700 text-sm">No ratings yet</span>
        </div>
      </div>
    </div>
  );
}
