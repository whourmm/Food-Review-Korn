import mongoose, { models, model } from "mongoose";

const CalendarRoomSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.CalendarRoom ||
  model("CalendarRoom", CalendarRoomSchema);
