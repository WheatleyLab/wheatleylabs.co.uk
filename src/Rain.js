import './Rain.scss'
// import gsap from "gsap"
import * as PIXI from 'pixi.js'

function Rain() {
  init()
  return ('')
}

const dropCount = window.innerWidth * 5
const dropSpeed = 5
const drops = []
let app, rainContainer

function random(min, max) {
  if (max == null) { max = min; min = 0 }
  if (min > max) { const tmp = min; min = max; max = tmp }
  return min + (max - min) * Math.random()
}

function randomPosition(drop) {
  drop.x = random(0, window.innerWidth)
  drop.y = random(-200, -100)
  drop.speed = random(1, 2)
  drop.delay = random(0, 500)
}

function init() {
  app = new PIXI.Application({
    backgroundAlpha: 0,
    autoStart: true,
    autoResize: true,
    // resolution: devicePixelRatio 
  })
  // window.addEventListener('resize', resize);
  rainContainer = new PIXI.Container();
  app.stage.addChild(rainContainer);
  window.app = app
  resize()
  addRain()
}

function addRain() {
  const rainTexture = PIXI.Texture.from("rain.png")
  for (let i = 0; i < dropCount; i++) {
    const raindrop = new PIXI.Sprite(rainTexture)
    raindrop.anchor.set(0.5)
    raindrop.scale.set(random(0.5, 1))
    randomPosition(raindrop)
    drops.push(raindrop)
    rainContainer.addChild(raindrop)
  }
}

function clearRain() {
  app.renderer.clear()
}

function resize() {
  // app.stop()
  // clearRain()
	app.renderer.resize(window.innerWidth, window.innerHeight);
  rainContainer.width = window.innerWidth
  rainContainer.height = window.innerHeight
  // app.start()
}

const tick = () => {
  drops.forEach(drop => {
    if (drop.delay > 0) {
      drop.delay -= 1 // wait for delay to count down
    }
    else {
      if (drop.y > window.innerHeight) randomPosition(drop) // bottom of screen, reset
      else drop.y += (drop.speed * dropSpeed) // animate down the screen
    }
  });
  requestAnimationFrame(tick)
}

tick()


export default Rain
