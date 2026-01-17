import mongoose, { Schema, models, model } from "mongoose";

const CalendarMemberSchema = new Schema(
  {
    calendarCode: {
      type: String,
      required: true,
      index: true,
    },

    userId: {
      type: String,
      required: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    name: String,
    avatar: String,

    role: {
      type: String,
      enum: ["owner", "member"],
      default: "member",
    },

    // 🔑 REQUIRED FOR CALENDAR ACCESS
    accessToken: {
      type: String,
      select: false,
    },

    refreshToken: {
      type: String,
      select: false,
    },

    tokenExpiresAt: Date,

    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// prevent duplicate join
CalendarMemberSchema.index(
  { calendarCode: 1, email: 1 },
  { unique: true }
);

export default models.CalendarMember ||
  model("CalendarMember", CalendarMemberSchema);
