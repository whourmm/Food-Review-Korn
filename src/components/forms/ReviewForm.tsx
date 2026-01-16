"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { RestaurantReview, ReviewCategory, FOOD_TYPES, CATEGORY_TYPES } from "@/interface";
import StarRating from "../StarRating";
import { useSession } from "next-auth/react";
import { uploadToCloudinary } from "@/src/libs/uploadToCloudinary";

interface ReviewFormProps {
  onSubmit: (review: RestaurantReview) => void;
  rid: string;
}

export function ReviewForm({ onSubmit, rid }: ReviewFormProps) {
  const { data: session } = useSession();

  const [reviewerName] = useState(session?.user?.name || "");
  const [name, setName] = useState("");
  const [foodType, setFoodType] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [review, setReview] = useState("");
  const [uploading, setUploading] = useState(false);

  const [categories, setCategories] = useState<ReviewCategory[]>(
    CATEGORY_TYPES.map((cat) => ({ name: cat, score: 3 }))
  );

  const handleScoreChange = (i: number, score: number) => {
    const copy = [...categories];
    copy[i].score = Math.max(1, Math.min(5, score));
    setCategories(copy);
  };

  /* ---------- IMAGE UPLOAD ---------- */
  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);

      console.log("Uploaded image URL:", url);
      setImageUrls((prev) => [...prev, url]);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !foodType) return;

    onSubmit({
      id: crypto.randomUUID(),
      restaurantId: rid,
      reviewerName,
      images: imageUrls,
      review: review || undefined,
      categoriesScore: categories,
      date: new Date().toISOString(),
    });

    setName("");
    setFoodType("");
    setImageUrls([]);
    setReview("");
    setCategories(CATEGORY_TYPES.map((cat) => ({ name: cat, score: 3 })));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* BASIC INFO */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Restaurant name"
        className="w-full px-4 py-2.5 border border-gray-200 border-1 rounded-lg text-black"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {FOOD_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFoodType(type)}
            className={`px-4 py-2 rounded-lg ${foodType === type
                ? "bg-green-600 text-white"
                : "bg-gray-100 border border-gray-200 border-1"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* IMAGE UPLOAD */}
      <div>
        <label className="block mb-2 font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          capture="environment" // 👉 opens camera on phone (rear camera)
          onChange={async (e) => {
            if (!e.target.files?.[0]) return;

            const file = e.target.files[0];
            const url = await uploadToCloudinary(file);

            setImageUrls((prev) => [...prev, url]);
          }}
          className="block w-full text-sm text-gray-600"
        />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

        <div className="grid grid-cols-3 gap-3 mt-4">
          {imageUrls.map((url, i) => (
            <div key={i} className="relative">
              <img
                src={url}
                className="w-full h-24 object-cover rounded-lg border border-gray-200 border-1"
              />

              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEW */}
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={4}
        className="w-full px-4 py-2.5 border border-gray-200 border-1 rounded-lg text-black"
        placeholder="Your review (optional)"
      />

      {/* CATEGORY SCORES */}
      <table className="w-full border border-gray-200 border-1 rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-center">Score</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, i) => (
            <tr key={i} className="even:bg-gray-50">
              <td className="p-3">{cat.name}</td>
              <td className="p-3 text-center">
                <StarRating
                  value={cat.score}
                  onChange={(s) => handleScoreChange(i, s)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="submit"
        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
      >
        Submit Review
      </button>
    </form>
  );
}
