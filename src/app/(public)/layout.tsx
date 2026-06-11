import Navber from '@/components/shared/navber/Navber';
import React from 'react';

const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navber />
      <main className='mt-16.25'>{children}</main>
    </div>
  );
};

export default PublicLayout;
