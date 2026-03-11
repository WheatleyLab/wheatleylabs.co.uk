'use client';

import { usePixiTarget } from '@/hooks/usePixiTarget';
import styles from './page.module.scss';

export default function HomePage() {
  const boxRef = usePixiTarget<HTMLDivElement>('collide:box');
  const boxRefWide = usePixiTarget<HTMLDivElement>('collide:boxWide');

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <div ref={boxRef} className={styles.innerBox}></div>
        <div ref={boxRefWide} className={`${styles.innerBox} ${styles.innerBoxWide}`}></div>
      </div>
    </div>
  );
}
