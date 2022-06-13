import * as PIXI from 'pixi.js'
import { random } from './helpers';
import { rainContainer } from './pixi'

const FRAME_SPEED = 250 // milliseconds

let splashFrames = ["frames/1.gif","frames/2.gif","frames/3.gif","frames/4.gif"];
let splashTextureArray = [];

for (let i=0; i < splashFrames.length; i++) {
  let texture = PIXI.Texture.from(splashFrames[i]);
  splashTextureArray.push(texture);
};

const createSplash = (x, y) => {
  const splash = new PIXI.AnimatedSprite(splashTextureArray)
  splash.stop()
  splash.animationSpeed = (FRAME_SPEED / 1000)
  splash.alpha = random(0.2, 0.8)
  splash.scale.set(2)
  
  splash.position.set(x, y)
  return splash
}

const triggerDie = (s) => {
  setTimeout(() => s.destroy(), FRAME_SPEED);
}

const addSplash = (x, y) => {
  const s = createSplash(x, y)
  rainContainer.addChild(s)
  s.play()
  triggerDie(s)
}

export {
  addSplash
}