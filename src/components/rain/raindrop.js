import * as PIXI from 'pixi.js'
import { random, randomPosition } from './helpers'
import { rainContainer } from './pixi'

const addRain = (dropCount) => {
  const drops = []
  const rainTexture = PIXI.Texture.from("rain.png")
  for (let i = 0; i < dropCount; i++) {
    const raindrop = new PIXI.Sprite(rainTexture)
    raindrop.anchor.set(0.5)
    raindrop.scale.set(random(0.5, 1))
    raindrop.alpha = random(0.2, 1)
    randomPosition(raindrop)
    drops.push(raindrop)
    rainContainer.addChild(raindrop)
  }

  return drops
}

export {
  addRain
}