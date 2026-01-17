import mongoose, { Schema, models } from "mongoose";

const CalendarSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Calendar =
  models.Calendar || mongoose.model("Calendar", CalendarSchema);
