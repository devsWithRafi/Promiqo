'use client';

import { ImageType } from '@/@types/types';
import ImageCard from '@/components/image-content/ImageCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const ImageLists = ({ imageData }: { imageData: ImageType[] }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        350: 2,
        600: 3,
        900: 4,
        1100: 4,
        1400: 5,
        1800: 6,
        2200: 7,
      }}
    >
      <Masonry gutter="10px">
        {imageData.map((item) => (
          <ImageCard key={item.id} image={item} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ImageLists;
