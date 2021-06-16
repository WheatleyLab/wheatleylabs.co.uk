import './Rain.scss'
// import gsap from "gsap"
import * as PIXI from 'pixi.js'

function Rain() {
  init()
  return ('')
}

let drops = []
let dropCount, app, rainContainer, textBgContainer, resizeTimeout, w, h, titleTextBg

function random(min, max) {
  if (max == null) { max = min; min = 0 }
  if (min > max) { const tmp = min; min = max; max = tmp }
  return min + (max - min) * Math.random()
}

function randomPosition(drop) {
  drop.x = random(0, w)
  drop.y = random(-200, -100)
  drop.speed = random(15,20)
  drop.delay = random(0, 500)
}

function init() {
  w = window.innerWidth
  h = window.innerHeight
  app = new PIXI.Application({
    backgroundAlpha: 0,
    autoStart: true,
    autoResize: false,
  })
  rainContainer = new PIXI.Container();
  titleTextBg = new PIXI.Graphics()
  textBgContainer = new PIXI.Container();
  app.stage.addChild(rainContainer);
  app.stage.addChild(textBgContainer);
  window.app = app
  window.addEventListener('resize', resize);
  resize()
  startRain()
  addTextBackground()
}

function collision(a, b) {
  const ab = a.getBounds();
  const bb = b.getBounds();
  return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

function addRain() {
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
}

function addTextBackground() {
  const titleText = document.getElementById('title-calc')
  if (!titleText) return setTimeout(addTextBackground, 1000)
  titleTextBg.beginFill(0xFF0000)
  titleTextBg.alpha = 0
  titleTextBg.drawRect(gtp()[0], gtp()[1], gtp()[2], gtp()[3], gtp()[4])
  textBgContainer.addChild(titleTextBg);
}

function stopRain() {
  app.stop()
  app.renderer.clear()
  drops = []
  rainContainer.removeChildren()
  textBgContainer.removeChildren()
}

function startRain() {
  clearTimeout(resizeTimeout)
  dropCount = w * 5 // 3 raindrops for each pixel wide of window
  app.start()
  addRain()
}

function resize() {
  w = window.innerWidth
  h = window.innerHeight
	app.renderer.resize(w, h);
  stopRain()
  // reset timeout on every resize event
  clearTimeout(resizeTimeout)
  // wait for a 1000ms clear after a resiuze event
  resizeTimeout = setTimeout(startRain, 100);
}

function updateTextBackground() {
  if (!titleTextBg) return
  titleTextBg.clear()
  titleTextBg.beginFill(0xFF0000)
  titleTextBg.alpha = 0
  titleTextBg.drawRoundedRect(gtp()[0], gtp()[1], gtp()[2], gtp()[3], gtp()[4])
}

function gtp() {
  //getTitleCalcParams
  const titleText = document.getElementById('title-calc')
  return [titleText.offsetLeft, titleText.offsetTop, titleText.clientWidth, 70, 50]
}

const tick = () => {
  updateTextBackground()
  drops.forEach(drop => {
    if (drop.delay > 0) {
      drop.delay -= 1 // wait for delay to count down
    }
    else {
      if (collision(drop, titleTextBg)) randomPosition(drop) // hit the text, reset
      else if (drop.y > window.innerHeight) randomPosition(drop) // bottom of screen, reset
      else drop.y += drop.speed // animate down the screen
    }
  });
  setTimeout(tick, 1000/60) // 60fps 
}

tick()


export default Rain
