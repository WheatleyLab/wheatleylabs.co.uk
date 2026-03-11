'use client';

import '@/lib/pixi/gsapSetup';
import { useCallback, useEffect, useRef } from 'react';
import { useTick, useApplication } from '@pixi/react';
import Raindrop from '@/lib/pixi/sprites/Raindrop';
import { getConfig, setFps } from '@/lib/pixi/config';
import { getTargets } from '@/lib/pixi/targetRegistry';
import { drainCollisions } from '@/lib/pixi/collisionQueue';
import { acquire, drawAll as drawAllEmitters, destroyAll as destroyAllEmitters } from '@/lib/pixi/emitterPool';
import type Sprite from '@/lib/pixi/sprites/Sprite';

export default function AnimatedObjects() {
  const { app, isInitialised } = useApplication();
  const spritesRef = useRef<Sprite[]>([]);

  useEffect(() => {
    if (!isInitialised) return;

    const w = app.screen.width;
    const h = app.screen.height;
    const { dropCount } = getConfig();

    for (let i = 0; i < dropCount; i++) {
      const drop = new Raindrop(w, h);
      app.stage.addChild(drop.gfx);
      spritesRef.current.push(drop);
    }

    return () => {
      for (const sprite of spritesRef.current) {
        app.stage.removeChild(sprite.gfx);
        sprite.gfx.destroy();
      }
      spritesRef.current = [];

      destroyAllEmitters(app.stage);
    };
  }, [app, isInitialised]);

  const tick = useCallback(
    (ticker: { deltaTime: number }) => {
      const w = app.screen.width;
      const h = app.screen.height;
      const { dropCount } = getConfig();

      // update pool size if dropCount changed
      while (spritesRef.current.length < dropCount) {
        const drop = new Raindrop(w, h);
        app.stage.addChild(drop.gfx);
        spritesRef.current.push(drop);
      }
      while (spritesRef.current.length > dropCount) {
        const sprite = spritesRef.current.pop()!;
        app.stage.removeChild(sprite.gfx);
        sprite.gfx.destroy();
      }

      setFps(app.ticker.FPS);

      // collect collide targets
      const allTargets = getTargets();
      const colliders = new Map<string, DOMRect>();
      for (const [id, rect] of allTargets) {
        if (id.startsWith('collide:')) {
          colliders.set(id, rect);
        }
      }

      // update raindrops (may push to collision queue)
      for (const sprite of spritesRef.current) {
        sprite.update(ticker.deltaTime, w, h, colliders);
      }

      // dispatch collision events to splash emitters
      const collisions = drainCollisions();
      for (const { x, y } of collisions) {
        const emitter = acquire(app.stage);
        emitter.emit(x, y);
      }

      // draw only active emitters
      drawAllEmitters();
    },
    [app],
  );

  useTick(tick);

  return null;
}
