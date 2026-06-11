'use client';

import { PostType, UrlType } from '@/@types/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

const PostImageContainer = ({ post }: { post: PostType }) => {
  const images = post.url;
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="w-full h-full relative flex sm:flex-row gap-3 flex-col items-center justify-center sm:p-8 p-5">
      <div className="w-auto h-full">
        <Image
          src={selectedImage.url}
          alt={post.title}
          width={1000}
          height={1000}
          className="h-full w-auto"
        />
      </div>

      {images.length > 1 && (
        <div className="flex sm:flex-col flex-row gap-2">
          {images.map((item: UrlType) => (
            <div
              key={item._id}
              onClick={() => setSelectedImage(item)}
              className={cn(
                'sm:size-22 size-18 group object-cover aspect-square rounded-xl opacity-70 border-2 overflow-hidden cursor-pointer',
                item._id === selectedImage._id &&
                  'border-white opacity-100 shadow-xl/15',
              )}
            >
              <Image
                src={item.url}
                alt={post.title}
                width={300}
                height={300}
                className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostImageContainer;
