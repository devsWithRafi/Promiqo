'use server';

import dbConnect from '@/lib/database/mongodb';
import { Post } from '@/models/imageModel/Image';
import { revalidatePath } from 'next/cache';

interface UrlsType {
  _id: string;
  url: string;
  delete_url: string;
}
interface imagePayloadType {
  postType: 'image' | 'video';
  url: UrlsType[];
  title: string;
  description: string;
  prompt: {
    value: string;
  }[];
  tags?: string[];
  category: string;
}

export const createImage = async (payload: imagePayloadType) => {
  try {
    await dbConnect();
    const author = {
      authorId: `anonymous-${Date.now()}`,
      isGuest: true,
      name: 'Anonymous',
      email: 'anonymous@gmail.com',
    };

    await Post.create({
      ...payload,
      author,
    });
    revalidatePath('/');
    return {
      success: true,
      status: 201,
    };
  } catch (error: any) {
    return {
      success: false,
      status: 500,
      error: error.message,
    };
  }
};
