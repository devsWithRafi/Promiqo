import { assets } from '@/assets/assets';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const NavLogo = ({
  className,
  varient = 'white',
  useMobile = false,
  ...props
}: {
  className?: string;
  useMobile?: boolean;
  varient: 'white' | 'black';
}) => {
  if (varient === 'white') {
    if (useMobile) {
      return (
        <Image
          {...props}
          src={assets.logo.white}
          alt="logo"
          width={40}
          height={40}
          className={cn('w-[40px] aspect-square h-auto', className)}
        />
      );
    }
    return (
      <Image
        {...props}
        src={assets.logo.textWhite}
        alt="logo"
        width={140}
        height={40}
        className={cn('w-[140px] h-auto', className)}
      />
    );
  } else {
    if (useMobile) {
      return (
        <Image
          {...props}
          src={assets.logo.black}
          alt="logo"
          width={40}
          height={40}
          className={cn('w-[40px] aspect-square h-auto', className)}
        />
      );
    }
    return (
      <Image
        {...props}
        src={assets.logo.textBlack}
        alt="logo"
        width={140}
        height={40}
        className={cn('w-[140px] h-auto', className)}
      />
    );
  }

  // return varient === 'white' ? (
  //   <Image
  //     {...props}
  //     src={assets.logo.textWhite}
  //     alt="logo"
  //     width={140}
  //     height={40}
  //     className={cn('w-[140px] h-auto', className)}
  //   />
  // ) : (
  //   <Image
  //     {...props}
  //     src={assets.logo.textBlack}
  //     alt="logo"
  //     width={140}
  //     height={40}
  //     className={cn('w-[140px] h-auto', className)}
  //   />
  // );
};

export default NavLogo;
