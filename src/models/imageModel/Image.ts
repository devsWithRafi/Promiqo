import { Schema, model, models } from 'mongoose';
import { LikeSchema } from './like';
import { CommentSchema } from './comment';

const ImageUrlsSchema = new Schema(
  {
    _id: { type: String, required: true },
    url: { type: String, required: true },
    delete_url: { type: String },
  },
  { _id: false },
);

const PromptSchema = new Schema(
  {
    value: { type: String, required: true },
  },
  { _id: false },
);

/** MAIN POST / IMAGE SCHEMA */
const PostSchema = new Schema(
  {
    postType: {
      type: String,
      default: 'image',
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    url: {
      type: [ImageUrlsSchema],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      maxlength: 100,
    },

    prompt: {
      type: [PromptSchema],
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    author: {
      isGuest: { type: Boolean, default: true },
      authorId: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },

    like: {
      type: [LikeSchema],
      default: [],
    },

    comment: {
      type: [CommentSchema],
      default: [],
    },

    downloadCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Post = models.Post || model('Post', PostSchema);
