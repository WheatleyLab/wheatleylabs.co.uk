'use client';

import '@/lib/pixi/extend';
import { Application } from '@pixi/react';
import AnimatedObjects from './AnimatedObjects';
import styles from './PixiBackground.module.scss';

export default function PixiBackground() {
  return (
    <div className={styles.canvas}>
      <Application
        resizeTo={typeof window !== 'undefined' ? window : undefined}
        backgroundAlpha={0}
        preference="webgpu"
      >
        <AnimatedObjects />
      </Application>
    </div>
  );
}
