import { DROP_SPEED_MULTIPLIER } from "./constants";

const random = (min, max) => {
  if (max == null) { max = min; min = 0 }
  if (min > max) { const tmp = min; min = max; max = tmp }
  return min + (max - min) * Math.random()
}

const randomPosition = (drop) => {
  drop.x = random(0, window.innerWidth)
  drop.y = random(-200, -100)
  drop.speed = (random(15,20) * DROP_SPEED_MULTIPLIER)
  drop.delay = random(0, 500)
}

const collision = (a, b) => {
  const ab = a.getBounds()
  const bb = b.getBounds()
  return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height
}

export {
  random,
  randomPosition,
  collision
}