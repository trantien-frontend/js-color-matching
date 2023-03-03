import { GAME_STATUS } from './constants.js'
import { getRandomColorPairs } from './utils.js'
import { getColorElementList, getParentColorElementList } from './selectors.js'
// Global variables
let selections = []
let gameState = GAME_STATUS.PLAYING
// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

function initBindColor() {
  // get list random color
  const colorList = getRandomColorPairs(8)
  const liList = getColorElementList()

  liList.forEach((liElement, index) => {
    liElement.dataset.color = colorList[index]
    const colorElement = liElement.querySelector('.overlay')
    if (colorElement) colorElement.style.backgroundColor = colorList[index]
  })
}
function handleClickEvent(liElement) {
  const gameStatusCurrent = gameState === GAME_STATUS.BLOCKING || gameState === GAME_STATUS.FINISHED
  if (!liElement || gameStatusCurrent) return
  liElement.classList.add('active')

  // check same color
  selections.push(liElement)
  console.log('li:', liElement)
  if (selections.length < 2) return

  const fistColor = selections[0].dataset.color
  const secondColor = selections[1].dataset.color

  const hasSameColor = fistColor === secondColor

  if (hasSameColor) {
    selections = []
    return
  }

  gameState = GAME_STATUS.BLOCKING
  // remove active
  setTimeout(() => {
    console.log('timeOut')
    selections[0].classList.remove('active')
    selections[1].classList.remove('active')

    selections = []

    gameState = GAME_STATUS.PLAYING
  }, 500)
}
function attachEventColorList() {
  const ul = getParentColorElementList()
  if (!ul) return
  ul.addEventListener('click', (e) => {
    let target = e.target.closest('li')
    if (!target) return
    if (!ul.contains(target)) return
    handleClickEvent(target)
  })
}
// main
;(() => {
  initBindColor()
  attachEventColorList()
})()
