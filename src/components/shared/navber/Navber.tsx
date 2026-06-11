'use client';

import NavLogo from './NavLogo';
import { Button } from '@/components/ui/button';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { ThemeToggleButton } from '@/components/theme/ThemeToggleButton';
import { useRouter } from 'next/navigation';
import { CgMathPlus } from "react-icons/cg";


const Navber = () => {
  const router = useRouter();
  return (
    <header className="w-full z-99 fixed top-0 left-0 dark:bg-black/30 bg-white/95 backdrop-blur-lg">
      <nav className="w-full h-16.25 mx-auto flex items-center justify-between sm:px-5 px-4 sm:gap-5 gap-2">
        <div className="flex items-center justify-start sm:gap-5 gap-1 w-full">
          <Link href="/">
            <span className="dark:block hidden">
              <NavLogo varient="white" className="sm:block hidden" />
              <NavLogo varient="white" useMobile className="sm:hidden" />
            </span>
            <span className="dark:hidden block">
              <NavLogo varient="black" className="sm:block hidden" />
              <NavLogo varient="black" useMobile className="sm:hidden" />
            </span>
          </Link>

          <div
            className="w-full max-w-md border dark:border-white/20 rounded-full overflow-hidden px-4 flex items-center gap-2 text-muted-foreground dark:focus-within:border-white/30 
          border-zinc-300 focus-within:border-zinc-500 transition-all duration-300"
          >
            <FiSearch />
            <input
              placeholder="Search..."
              className="bg-transparent border-0 outline-0 w-full h-auto text-sm py-2"
            />
          </div>
        </div>

        <div className="flex items-center sm:gap-5 gap-2">
          <ThemeToggleButton />
          <Button
            onClick={() => router.push('/post/create')}
            className="rounded-full h-auto py-2 sm:px-5 px-2"
          >
            <span className='sm:block hidden'>Upload</span>
            <CgMathPlus className='scale-110'/>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navber;
