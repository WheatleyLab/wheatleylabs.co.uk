import * as PIXI from 'pixi.js'

export const pixiApp = new PIXI.Application({
  backgroundAlpha: 0,
  autoStart: true,
  autoResize: false,
})
export const rainContainer = new PIXI.Container()
export const titleTextBg = new PIXI.Graphics()
export const textBgContainer = new PIXI.Container()