'use client';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

interface iProps {
  children: React.ReactNode;
  customSize?: Record<number, number>;
}

const GridLayoutPost = ({ children, customSize }: iProps) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={
        customSize || {
          350: 2,
          600: 3,
          900: 4,
          1100: 4,
          1400: 5,
          1800: 6,
          2200: 7,
        }
      }
    >
      <Masonry gutter="10px">{children}</Masonry>
    </ResponsiveMasonry>
  );
};

export default GridLayoutPost;
