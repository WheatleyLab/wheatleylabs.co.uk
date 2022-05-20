import * as PIXI from 'pixi.js'
import { random, randomPosition } from './helpers'
import { rainContainer } from './pixi'


const rainTexture = PIXI.Texture.from("rain.png")

const createDrop = () => {
  const raindrop = new PIXI.Sprite(rainTexture)
  raindrop.anchor.set(0.5)
  raindrop.scale.set(random(0.5, 1))
  raindrop.alpha = random(0.2, 1)
  randomPosition(raindrop)
  return raindrop
}

const addRain = (dropCount) => {
  const drops = []
  for (let i = 0; i < dropCount; i++) {
    const rainDrop = createDrop()
    drops.push(rainDrop)
    rainContainer.addChild(rainDrop)
  }

  return drops
}

export {
  addRain
}