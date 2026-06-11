import { cn } from '@/lib/utils';
import React from 'react';
import { LuLoaderPinwheel } from 'react-icons/lu';

const LoadingAnim = ({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) => {
  return (
    <>
      <LuLoaderPinwheel className={cn('animate-spin', className)} />
      {text || 'Pending...'}
    </>
  );
};

export default LoadingAnim;
