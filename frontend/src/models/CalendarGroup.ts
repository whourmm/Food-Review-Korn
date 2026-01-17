import mongoose, { Schema } from "mongoose";

const MemberSchema = new Schema({
  userId: String,
  name: String,
  avatar: String,
  joinedAt: { type: Date, default: Date.now },
});

const CalendarGroupSchema = new Schema({
  inviteCode: { type: String, unique: true },
  ownerId: String,
  members: [MemberSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.CalendarGroup ||
  mongoose.model("CalendarGroup", CalendarGroupSchema);
