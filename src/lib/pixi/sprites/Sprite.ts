import { Graphics } from 'pixi.js';

export default abstract class Sprite {
  readonly gfx = new Graphics();
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.draw();
  }

  abstract draw(): void;
  abstract update(dt: number, screenW: number, screenH: number, colliders?: ReadonlyMap<string, DOMRect>): void;
}
