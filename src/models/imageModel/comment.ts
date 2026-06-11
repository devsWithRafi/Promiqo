import mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  isGuest: { type: Boolean, default: true },
  postId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  profileUrl: { type: String },
  comment: { type: String, required: true },
});

export const Comment =
  mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
