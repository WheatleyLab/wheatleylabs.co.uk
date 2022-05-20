import react from 'react'
import './rain.scss'
import { DROP_COUNT } from './constants'
import { addRain } from './raindrop'
import { collision, random, randomPosition } from './helpers'
import { addTextBackground, updateTextBackground } from './text'
import { pixiApp, rainContainer, textBgContainer, titleTextBg } from './pixi'
import { addSplash } from './splash'

const Rain = react.memo(() => {

  let drops = []
  let resizeTimeout

  const init = () => {    
    pixiApp.stage.addChild(rainContainer)
    pixiApp.stage.addChild(textBgContainer)
    window.pixiApp = pixiApp
    window.addEventListener('resize', resize)
    resize()
    addTextBackground(titleTextBg, textBgContainer)
    startRain()
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
    drops = addRain(window.innerWidth * DROP_COUNT)
  }

  const resize = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    pixiApp.renderer.resize(w, h)
    stopRain()
    // reset timeout on every resize event
    clearTimeout(resizeTimeout)
    // wait for a 1000ms clear after a resiuze event
    resizeTimeout = setTimeout(startRain, 100)
  }

  const resetDrop = (hitText, i) => {
    const { x, width } = drops[i].getBounds()
    const { y } = titleTextBg.getBounds()
    const newY = hitText ? (y - random(0, 8)) : (window.innerHeight - 8)
    const newX = x - width
    if (i%3 === 0) addSplash(newX, newY) // reduce the number of splashes 
    randomPosition(drops[i])
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
        if (collision(drops[i], titleTextBg)) resetDrop(true, i) // hit the text, reset
        else if (drops[i].y > window.innerHeight) resetDrop(false, i) // bottom of screen, reset
        else drops[i].y += drops[i].speed // animate down the screen
      }
      i++
    }
    setTimeout(tick, 1000/60) // 60fps 
  }

  tick()
  init()

  return (null)
})


export default Rain
