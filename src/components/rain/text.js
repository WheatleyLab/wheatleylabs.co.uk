import { textBgContainer, titleTextBg } from "./pixi"

const getTitleCalcParams = () => {
  const titleText = document.getElementById('title-calc')
  if (!titleText) return [0, 0, 0, 0, 0]
  return [titleText?.offsetLeft, titleText?.offsetTop, titleText?.clientWidth, 70, 50]
}

const addTextBackground = () => {
  const titleText = document.getElementById('title-calc')
  if (!titleText) return setTimeout(addTextBackground, 1000)
  titleTextBg.beginFill(0xFF0000)
  titleTextBg.alpha = 0
  const gtpData = getTitleCalcParams()
  titleTextBg.drawRect(gtpData[0], gtpData[1], gtpData[2], gtpData[3], gtpData[4])
  textBgContainer.addChild(titleTextBg);
}
const updateTextBackground = () => {
  if (!titleTextBg) return
  titleTextBg.clear()
  titleTextBg.beginFill(0xFF0000)
  titleTextBg.alpha = 0
  const gtpData = getTitleCalcParams()
  titleTextBg.drawRoundedRect(gtpData[0], gtpData[1], gtpData[2], gtpData[3], gtpData[4])
}

export {
  addTextBackground,
  updateTextBackground
}