import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  avatar: String,
  online: Boolean,
  lastSeen: Date,
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
