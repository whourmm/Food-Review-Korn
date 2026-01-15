"use client";

import { Restaurant } from "@/interface";
import { useState } from "react";


interface RestaurantFormProps {
  onCreate: (restaurant: Restaurant) => void;
}

export default function RestaurantForm({ onCreate, onChange }: RestaurantFormProps & { onChange?: (restaurant: Restaurant) => void }) {
  const [form, setForm] = useState<Restaurant>({
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onCreate(form);
      }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-900">
        Create New Restaurant
      </h2>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Restaurant Name
      </label>
      <input
        required
        placeholder="Restaurant name"
        className="w-full border rounded-lg px-4 py-2"
        value={form.name}
        onChange={(e) => {
          const updatedForm = { ...form, name: e.target.value };
          setForm(updatedForm);
          if (onChange) onChange(updatedForm);
        }}
      />
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
        Description
      </label>

      <textarea
        placeholder="Description"
        className="w-full border rounded-lg px-4 py-2"
        value={form.description}
        onChange={(e) => {
          const updatedForm = { ...form, description: e.target.value };
          setForm(updatedForm);
          if (onChange) onChange(updatedForm);
        }}
      />
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
        Location (Google Maps URL)
      </label>

      <input
        placeholder="Google Maps iframe URL"
        className="w-full border rounded-lg px-4 py-2"
        value={form.location}
        onChange={(e) => {
          const updatedForm = { ...form, location: e.target.value };
          setForm(updatedForm);
          if (onChange) onChange(updatedForm);
        }}
      />
      <label htmlFor="image" className="block text-sm font-medium text-gray-700">
        Cover Image URL
      </label>

      <input
        placeholder="Cover image URL"
        className="w-full border rounded-lg px-4 py-2"
        value={form.images?.[0] || ""}
        onChange={(e) => {
          const updatedForm = { ...form, images: [e.target.value] };
          setForm(updatedForm);
          if (onChange) onChange(updatedForm);
        }}
      />

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium"
      >
        Create Restaurant
      </button>
    </form>
  );
}
