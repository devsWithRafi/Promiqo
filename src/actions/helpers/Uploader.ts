'use server';
import { env } from '@/lib/env';

export const UploadImages = async (files: File[]) => {
  const uploads = files.map(async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${env.IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: formData,
      },
    );

    const data = await res.json();

    if (!data.success) {
      console.error(data);
      throw new Error(data?.error?.message || 'Failed to upload image');
    }

    return {
      _id: data.data.id,
      url: data.data.url,
      delete_url: data.data.delete_url,
    };
  });

  return Promise.all(uploads);
};
