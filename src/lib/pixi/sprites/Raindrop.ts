import Sprite from './Sprite';
import { getConfig } from '@/lib/pixi/config';
import { pushCollision } from '@/lib/pixi/collisionQueue';

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default class Raindrop extends Sprite {
  private speed = 0;
  private length = 0;
  private delay = 0;

  constructor(screenW: number, screenH: number) {
    super(0, 0);
    this.randomise(screenW, screenH, true);
  }

  private randomise(screenW: number, screenH: number, initial: boolean) {
    const config = getConfig();
    this.speed = config.speed * random(0.5, 1);
    this.length = config.length * random(0.2, 1);
    this.delay = initial ? 0 : random(0, 500);
    this.gfx.alpha = config.alpha * random(0.4, 1);

      this.y = -this.length * 2;

     if (config.wind > 0 && Math.random() < 0.25) { // wind blowing right so spawn some drops from the left edge
      // calculate the width based on Tan of the angle of the rain
      const xSpawn = (screenW / Math.tan((90 - config.wind) * Math.PI / 180)) / 2;
      console.log(screenW, xSpawn);
      this.x = random(-10000, screenW + xSpawn);
      // this.x = random(0, screenW);
      // this.y = random(0, screenH);
    } else if (config.wind < 0 && Math.random() < 0.25) { // wind blowing left so spawn some drops from the right edge
      this.x = random(0, screenW);
      // this.y = random(0, screenH);
    } else {
      this.x = random(0, screenW);
      // this.y = -this.length * 2;
    }

    this.redraw();
  }

  public draw() {
    this.redraw();
  }

  private redraw() {
    const config = getConfig();
    const windAngle = -(config.wind * Math.PI) / 180;
    this.gfx.clear();
    this.gfx.moveTo(0, 0).lineTo(0, this.length).stroke({ color: config.color, width: 2 });
    this.gfx.rotation = windAngle;
  }

  update(dt: number, screenW: number, screenH: number, colliders?: ReadonlyMap<string, DOMRect>) {
    if (this.delay > 0) {
      this.delay -= dt * 16;
      return;
    }

    const config = getConfig();
    const windAngle = (config.wind * Math.PI) / 180;

    const prevTip = this.y + this.length;
    this.x += this.speed * Math.sin(windAngle) * dt;
    this.y += this.speed * Math.cos(windAngle) * dt;
    const newTip = this.y + this.length;

    if (this.y > screenH + this.length || this.x < -this.length || this.x > screenW + this.length) {
      this.randomise(screenW, screenH, false);
    } else if (colliders) {
      for (const [, rect] of colliders) {
        // swept check: did the tip cross rect.top during this frame?
        if (
          this.x >= rect.left &&
          this.x <= rect.right &&
          prevTip < rect.top &&
          newTip >= rect.top
        ) {
          pushCollision(this.x, rect.top);
          this.randomise(screenW, screenH, false);
          break;
        }
      }
    }

    this.gfx.x = this.x;
    this.gfx.y = this.y;
  }
}
