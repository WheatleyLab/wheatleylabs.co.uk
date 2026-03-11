'use client';

import dynamic from 'next/dynamic';

const PixiBackground = dynamic(() => import('./PixiBackground'), { ssr: false });

export default function PixiBackgroundLoader() {
  return <PixiBackground />;
}
