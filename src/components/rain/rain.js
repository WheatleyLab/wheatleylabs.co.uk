import react from 'react'
import './rain.scss'
import { DROP_COUNT } from './constants'
import { addRain } from './raindrop'
import { randomPosition } from './helpers'
import { addTextBackground, updateTextBackground } from './text'
import { pixiApp, rainContainer, textBgContainer, titleTextBg } from './pixi'

const Rain = react.memo(() => {

  let drops = []
  let resizeTimeout, w, h

  const init = () => {
    w = window.innerWidth
    h = window.innerHeight
    
    pixiApp.stage.addChild(rainContainer)
    pixiApp.stage.addChild(textBgContainer)
    window.pixiApp = pixiApp
    window.addEventListener('resize', resize)
    resize()
    addTextBackground(titleTextBg, textBgContainer)
    startRain()
  }

  const collision = (a, b) => {
    const ab = a.getBounds()
    const bb = b.getBounds()
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height
  }

  const stopRain = () => {
    pixiApp.stop()
    pixiApp.renderer.clear()
    drops = []
    rainContainer.removeChildren()
    textBgContainer.removeChildren()
  }

  const startRain = () => {
    clearTimeout(resizeTimeout)
    pixiApp.start()
    drops = addRain(w * DROP_COUNT)
  }

  const resize = () => {
    w = window.innerWidth
    h = window.innerHeight
    pixiApp.renderer.resize(w, h)
    stopRain()
    // reset timeout on every resize event
    clearTimeout(resizeTimeout)
    // wait for a 1000ms clear after a resiuze event
    resizeTimeout = setTimeout(startRain, 100)
  }

  const tick = () => {
    updateTextBackground(titleTextBg, textBgContainer)
    let i = 0
    let len = drops.length
    while (i < len) {
      if (drops[i].delay > 0) {
        drops[i].delay -= 1 // wait for delay to count down
      }
      else {
        if (collision(drops[i], titleTextBg)) randomPosition(drops[i], w) // hit the text, reset
        else if (drops[i].y > window.innerHeight) randomPosition(drops[i], w) // bottom of screen, reset
        else drops[i].y += drops[i].speed // animate down the screen
      }
      i++
    }
    setTimeout(tick, 1000/60) // 60fps 
  }

  tick()
  init()

  return (
    <div></div>
  )
})


export default Rain
