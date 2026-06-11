'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  ArrowDownToLine,
  HatGlasses,
  Heart,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { Separator } from '../ui/separator';

interface prevImageType {
  url: string;
  title: string;
  description: string;
}

const ImagePreviewCard = ({ image }: { image: prevImageType }) => {
  return (
    <div className="w-full relative overflow-hidden rounded-lg bg-black">
      {image.url && (
        <Image
          src={image.url}
          alt={image.title}
          width={500}
          height={500}
          className="w-full h-auto object-cover opacity-80"
        />
      )}

      {/* overlay */}
      <div className="absolute z-2 left-0 bottom-0 w-full h-auto">
        <div className="absolute z-2 w-full h-[120%] -bottom-10 left-0 flex items-end overflow-hidden blur-[20px] scale-x-110 scale-y-120">
          {image.url && (
            <div className="absolute z-2 bottom-0 left-0 w-full h-[85%] flex items-end overflow-hidden pointer-events-none select-none">
              <Image
                src={image.url}
                alt={image.title}
                width={500}
                height={500}
                className="object-cover elchi"
              />
            </div>
          )}
        </div>

        {/* content */}
        <div className="relative z-10 text-white p-3 pt-[40px] w-full gap-[10px] items-center elchi">
          <div className="flex items-center gap-3">
            <Avatar className="rounded-full size-7 object-cover aspect-square">
              <AvatarFallback>
                <HatGlasses className="scale-[0.8]" />
              </AvatarFallback>
            </Avatar>
            <h5 className="font-semibold text-md">Anonymous</h5>
          </div>
          <div className="flex flex-col mt-2">
            <p className="font-medium text-sm whitespace-nowrap max-w-[95%] text-ellipsis">
              {image.title}
            </p>
            <p className="text-xs opacity-70 font-normal">
              {image.description.length > 80
                ? image.description.slice(0, 80) + '...'
                : image.description}
            </p>
          </div>
          <div className="flex items-center justify-between gap-5 my-3 text-xs font-normal opacity-80">
            <span className="w-full flex items-center justify-center gap-1">
              <Heart size={17} />0
            </span>
            <Separator orientation="vertical" />
            <span className="w-full flex items-center justify-center gap-1">
              <MessageSquare size={17} />0
            </span>
            <Separator orientation="vertical" />
            <span className="w-full flex items-center justify-center gap-1">
              <ArrowDownToLine size={17} />0
            </span>
          </div>
          <Link
            href={`/`}
            className={cn(
              buttonVariants(),
              'w-full rounded bg-black/70 text-white/60 hover:bg-black/80 hover:text-white h-auto py-2',
            )}
          >
            Use Prompt
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewCard;
