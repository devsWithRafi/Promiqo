'use server';

import dbConnect from '@/lib/database/mongodb';
import { Post } from '@/models/imageModel/Image';
import { formateJSON } from '../helpers/FormateJSON';

export const fetchAllPost = async () => {
  try {
    await dbConnect();
    const data = await Post.find({}).sort({ createdAt: -1 });
    const formateData = data.map((item) => {
      const itemObj = item.toObject();
      return {
        ...itemObj,
        likeCount: itemObj.like.length,
        commentCount: itemObj.comment.length,
      };
    });
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
