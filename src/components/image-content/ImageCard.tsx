'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  ArrowDownToLine,
  HatGlasses,
  Heart,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { Separator } from '../ui/separator';
import { PostType } from '@/@types/types';

const ImageCard = ({ image }: { image: PostType }) => {
  return (
    <div className="w-full relative overflow-hidden rounded-lg group bg-black">
      {image.url.length > 0 && image.url[0].url && (
        <Image
          src={image.url[0].url}
          alt={image.title}
          width={500}
          height={500}
          className="w-full h-auto object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-500"
        />
      )}

      {/* overlay */}
      <div className="absolute z-2 left-0 bottom-0 w-full h-auto opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="absolute z-2 w-full h-[120%] -bottom-10 left-0 flex items-end overflow-hidden blur-[20px] scale-x-110 scale-y-120">
          <div className="absolute z-2 bottom-0 left-0 w-full h-[85%] flex items-end overflow-hidden pointer-events-none select-none">
            {image.url.length > 0 && image.url[0].url && (
              <Image
                src={image.url[0].url}
                alt={image.title}
                width={500}
                height={500}
                className="object-cover elchi"
              />
            )}
          </div>
        </div>

        {/* content */}
        <div className="relative z-10 text-white p-3 pt-[40px] w-full gap-[10px] items-center elchi">
          <div className="flex items-center gap-2">
            <Avatar className="rounded-full sm:size-7 size-5 object-cover aspect-square">
              {image.author.profileUrl && (
                <AvatarImage src={image.author.profileUrl} />
              )}
              {image.author.isGuest ? (
                <AvatarFallback>
                  <HatGlasses size={18} />
                </AvatarFallback>
              ) : (
                <AvatarFallback>
                  {image?.author?.name?.charAt(0) || '?'}
                </AvatarFallback>
              )}
            </Avatar>
            <h5 className="sm:font-semibold font-medium sm:text-md text-sm">
              {image.author.name}
            </h5>
          </div>
          <div className="flex flex-col mt-2">
            <p className="font-medium sm:text-sm text-xs whitespace-nowrap max-w-[95%] text-ellipsis">
              {image.title}
            </p>
            <p className="sm:text-xs text-[10px] opacity-70 font-normal">
              {image.description.length > 80
                ? image.description.slice(0, 80) + '...'
                : image.description}
            </p>
          </div>
          <div className="flex items-center justify-between gap-5 sm:my-2 my-1 text-xs font-normal opacity-80">
            <span className="hover:bg-white/20 rounded-full py-1.5 duration-200 w-full flex sm:flex-row flex-col items-center justify-center sm:gap-1 sm:scale-100 scale-[0.8]">
              <Heart size={17}/>
              {image.likeCount}
            </span>
            <Separator orientation="vertical" />
            <span className="hover:bg-white/20 rounded-full py-1.5 duration-200 w-full flex sm:flex-row flex-col items-center justify-center sm:gap-1 sm:scale-100 scale-[0.8]">
              <MessageSquare size={17} />
              {image.commentCount}
            </span>
            <Separator orientation="vertical" />
            <span className="hover:bg-white/20 rounded-full py-1.5 duration-200 w-full flex sm:flex-row flex-col items-center justify-center sm:gap-1 sm:scale-100 scale-[0.8]">
              <ArrowDownToLine size={17} />
              {image.downloadCount}
            </span>
          </div>
          <Link
            href={`/post/${image._id}`}
            className={cn(
              buttonVariants(),
              'w-full rounded bg-black/70 text-white/60 hover:bg-black/80 hover:text-white h-auto py-2 sm:text-sm text-xs',
            )}
          >
            Get Prompt
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
