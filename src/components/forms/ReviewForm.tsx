"use client";
import { useState } from "react";
import { X, Pencil, Check } from "lucide-react";
import { RestaurantReview, ReviewCategory } from "@/interface";
import StarRating from "../StarRating";
import { FOOD_TYPES } from "@/interface";
import { CATEGORY_TYPES } from "@/interface";
import { useSession } from "next-auth/react";


interface ReviewFormProps {
  onSubmit: (review: RestaurantReview) => void;
}


export function ReviewForm({ onSubmit, rid }: ReviewFormProps & { rid: string }) {
  const { data: session } = useSession();
  const [reviewerName, setReviewerName] = useState(session?.user?.name || "");
  const [name, setName] = useState("");
  const [foodType, setFoodType] = useState("");
  const [imageUrl, setImageUrl] = useState([""]);
  const [review, setReview] = useState("");
  const [categories, setCategories] = useState<ReviewCategory[]>(
    CATEGORY_TYPES.map((cat) => ({ name: cat, score: 3 })),
  );
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<
    number | null
  >(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");


  const handleRenameCategory = (index: number) => {
    if (
      editingCategoryName.trim() &&
      !categories.some((c, i) => i !== index && c.name === editingCategoryName)
    ) {
      const updated = [...categories];
      updated[index].name = editingCategoryName;
      setCategories(updated);
      setEditingCategoryIndex(null);
      setEditingCategoryName("");
    }
  };

  const handleScoreChange = (index: number, score: number) => {
    const updated = [...categories];
    updated[index].score = Math.max(1, Math.min(5, score));
    setCategories(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      reviewerName.trim() &&
      name.trim() &&
      foodType.trim() &&
      categories.length > 0
    ) {
      onSubmit({
        id: crypto.randomUUID(),
        restaurantId: rid,
        reviewerName,
        images: imageUrl ? imageUrl : [],
        review: review.trim() || undefined,
        categoriesScore: categories,
        date: new Date().toISOString(),
      });
      setReviewerName("");
      setName("");
      setFoodType("");
      setImageUrl([""]);
      setReview("");
      setCategories(CATEGORY_TYPES.map((cat) => ({ name: cat, score: 3 })));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Basic Info Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Restaurant Information
        </h3>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Restaurant Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., La Bella Trattoria"
            className="w-full px-4  text-black py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Type of Food
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {FOOD_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFoodType(type)}
                className={`px-4 text-black  py-2.5 rounded-lg font-medium transition ${
                  foodType === type
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image URL <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl[0]}
            onChange={(e) => setImageUrl([...imageUrl, e.target.value])}
            placeholder="https://example.com/image.jpg"
            className="w-full text-black  px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Review <span className="text-gray-500">(Optional)</span>
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your thoughts about this restaurant... (optional)"
            rows={4}
            className="w-full text-black  px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Review
          </h3>
        
        </div>

        {/* Categories Table */}
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-center font-semibold">
                  Score
                </th>
                
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 border-t border-gray-200">
                    {editingCategoryIndex === index ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editingCategoryName}
                          onChange={(e) =>
                            setEditingCategoryName(e.target.value)
                          }
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleRenameCategory(index)}
                          className="p-1 bg-green-600 hover:bg-green-700 text-white rounded transition"
                        >
                          <Check size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="font-medium text-gray-900">
                        {category.name}
                      </span>
                    )}
                  </td>
               <td className="px-4 py-3 border-t border-gray-200 text-center">
  <StarRating
    value={category.score}
    onChange={(score) => handleScoreChange(index, score)}
  />
</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!reviewerName.trim() || !name.trim() || !foodType.trim()}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
      >
        Submit Review
      </button>
    </form>
  );
}
