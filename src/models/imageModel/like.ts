import mongoose from 'mongoose';

export const LikeSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  profileUrl: { type: String },
});

export const Like = mongoose.models.Like || mongoose.model('Like', LikeSchema);
