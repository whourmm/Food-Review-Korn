// src/models/Presence.ts
import mongoose from "mongoose";

const PresenceSchema = new mongoose.Schema({
  calendarId: String,
  userId: String,
  name: String,
  avatar: String,
  lastSeen: Date,
});

export default mongoose.models.Presence ||
  mongoose.model("Presence", PresenceSchema);
