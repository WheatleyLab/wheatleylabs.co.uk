import type { Container } from 'pixi.js';
import SplashEmitter from '@/lib/pixi/sprites/SplashEmitter';

const active = new Set<SplashEmitter>();
const free: SplashEmitter[] = [];

export function acquire(stage: Container): SplashEmitter {
  const emitter = free.pop() ?? new SplashEmitter();
  stage.addChild(emitter.gfx);
  active.add(emitter);

  emitter.onRecycle = () => {
    release(emitter, stage);
  };

  return emitter;
}

export function release(emitter: SplashEmitter, stage: Container) {
  stage.removeChild(emitter.gfx);
  active.delete(emitter);
  emitter.onRecycle = undefined;
  free.push(emitter);
}

export function drawAll() {
  for (const emitter of active) {
    emitter.draw();
  }
}

export function destroyAll(stage: Container) {
  for (const emitter of active) {
    stage.removeChild(emitter.gfx);
    emitter.destroy();
  }
  active.clear();

  for (const emitter of free) {
    emitter.destroy();
  }
  free.length = 0;
}

export function getActiveCount() {
  return active.size;
}

export function getFreeCount() {
  return free.length;
}
