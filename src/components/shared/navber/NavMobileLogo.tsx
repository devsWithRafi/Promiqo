import { assets } from '@/assets/assets';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const NavMobileLogo = ({ className, ...props }) => {
  return (
    <Image
      {...props}
      src={assets.logo.white}
      alt="logo"
      width={140}
      height={40}
      className={cn('w-[140px] h-auto', className)}
    />
  );
};

export default NavMobileLogo;
