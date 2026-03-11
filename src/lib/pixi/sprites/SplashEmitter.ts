import { Graphics } from 'pixi.js';
import { gsap } from 'gsap';
import { getConfig } from '@/lib/pixi/config';

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

interface Particle {
  x: number;
  y: number;
  alpha: number;
  radius: number;
  active: boolean;
}

const PARTICLE_COUNT = 3;

export default class SplashEmitter {
  readonly gfx = new Graphics();
  private particles: Particle[];
  private tweens: gsap.core.Tween[] = [];
  onRecycle?: () => void;

  constructor() {
    this.particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: 0,
      y: 0,
      alpha: 0,
      radius: 1.5,
      active: false,
    }));
  }

  get isFree(): boolean {
    return this.particles.every((p) => !p.active);
  }

  emit(cx: number, cy: number) {
    // kill any active tweens from a previous emission
    for (const t of this.tweens) t.kill();
    this.tweens.length = 0;
    const rScale = Math.min(Math.max((getConfig().length / 10), 1), 3); // 1-3 based on drop length

    for (const p of this.particles) {
      p.x = cx;
      p.y = cy;
      p.alpha = random(0.25, 0.75);
      p.radius = rScale;
      p.active = true;

      // animationDuration is a speed percentage, 0-100
      const animationDuration = getConfig().speed / 100;

      const angle = random(-150, -30);

      // clamp velocity and gravity
      const velocity = 50 + 200 * (animationDuration);
      const gravity = 75 + 300 * (animationDuration);

      const physicsTween = gsap.to(p, {
        physics2D: {
          velocity,
          angle,
          gravity,
          friction: 0.1,
        },
        duration: 1,
        alpha: 0,
        ease: 'power1.out',
        onComplete: () => {
          p.active = false;
          if (this.isFree) this.onRecycle?.();
        },
      });

      this.tweens.push(physicsTween);
    }
  }

  draw() {
    this.gfx.clear();

    let hasActive = false;
    const config = getConfig();

    for (const p of this.particles) {
      if (!p.active) continue;
      hasActive = true;
      this.gfx.circle(p.x, p.y, p.radius).fill({ color: config.color, alpha: p.alpha });
    }

    if (!hasActive) {
      this.gfx.clear();
    }
  }

  destroy() {
    for (const t of this.tweens) t.kill();
    this.tweens.length = 0;
    this.gfx.destroy();
  }
}
