'use server';

import dbConnect from '@/lib/database/mongodb';
import { Post } from '@/models/imageModel/Image';
import { formateJSON } from '../helpers/FormateJSON';

export const fetchPostOne = async (postId: string) => {
  try {
    await dbConnect();
    const data = await Post.findById(postId);

    const formateData = {
      ...data.toObject(),
      likeCount: data.toObject().like.length,
      commentCount: data.toObject().comment.length,
    };

    return {
      success: true,
      status: 200,
      data: formateJSON(formateData),
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      status: 500,
      error: error.message,
    };
  }
};
