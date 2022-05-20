import { DROP_SPEED_MULTIPLIER } from "./constants";

const random = (min, max) => {
  if (max == null) { max = min; min = 0 }
  if (min > max) { const tmp = min; min = max; max = tmp }
  return min + (max - min) * Math.random()
}

const randomPosition = (drop, w) => {
  drop.x = random(0, w)
  drop.y = random(-200, -100)
  drop.speed = (random(15,20) * DROP_SPEED_MULTIPLIER)
  drop.delay = random(0, 500)
}

export {
  random,
  randomPosition
}