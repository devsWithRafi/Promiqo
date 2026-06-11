import { assets } from '@/assets/assets';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface iProps {
  className?: string;
}

const NavMobileLogo = ({ className, ...props }: iProps) => {
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
