import mongoose, { Schema } from "mongoose";

const FreeSlotSchema = new Schema({
  start: String,
  end: String,
});

const AvailabilitySchema = new Schema({
  calendarId: Schema.Types.ObjectId,
  userId: String,
  date: String,
  freeHours: Number,
  freeSlots: [FreeSlotSchema],
});

export default mongoose.models.Availability ||
  mongoose.model("Availability", AvailabilitySchema);
