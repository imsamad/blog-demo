import Link from 'next/link';
import React from 'react';

export default function Navbar({ height }) {
  return (
    <div
      className={`min-h-[${height}px] h-[${height}px] grid place-items-center py-2  border-b-2`}
    >
      <Link href='/'>
        <h1 className='text-center text-xl italic no-underline text-black'>
          TidBit.com
        </h1>
      </Link>
    </div>
  );
}
