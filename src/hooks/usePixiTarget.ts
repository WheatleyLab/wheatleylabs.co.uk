'use client';

import { useEffect, useRef } from 'react';
import { registerTarget, unregisterTarget } from '@/lib/pixi/targetRegistry';

export function usePixiTarget<T extends HTMLElement = HTMLElement>(id: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;

    function update() {
      if (ref.current) {
        registerTarget(id, ref.current.getBoundingClientRect());
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    }

    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
      unregisterTarget(id);
    };
  }, [id]);

  return ref;
}
