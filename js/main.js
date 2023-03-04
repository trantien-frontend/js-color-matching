import { GAME_STATUS, GAME_TIME } from './constants.js'
import {
  getRandomColorPairs,
  showPlayAgainButton,
  setTimmerText,
  HidePlayAgainButton,
  createCountTimeOut,
} from './utils.js'
import {
  getColorElementList,
  getParentColorElementList,
  getColorElementListActive,
  getPlayAgainButton,
  getColorBackground,
} from './selectors.js'
// Global variables
let selections = []
let gameState = GAME_STATUS.PLAYING
let countTimeOut = createCountTimeOut({
  second: GAME_TIME,
  onChange: handleTimerChange,
  onFinish: handleTimerFinish,
})

function handleTimerChange(second) {
  const currentSecond = `0${second}`.slice(-2)
  setTimmerText(currentSecond)
}
function handleTimerFinish() {
  console.log('Finish')
  setTimmerText('Game Over!!🔄🔄🔄')
  showPlayAgainButton()
  gameState = GAME_STATUS.FINISHED
}

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
  const isClicked = liElement.className.includes('active')
  if (!liElement || isClicked || gameStatusCurrent) return

  liElement.classList.add('active')
  // check same color
  selections.push(liElement)

  if (selections.length < 2) return

  const fistColor = selections[0].dataset.color
  const secondColor = selections[1].dataset.color

  const hasSameColor = fistColor === secondColor

  gameState = GAME_STATUS.BLOCKING

  if (hasSameColor) {
    const isEndGame = getColorElementListActive().length === 0
    getColorBackground().style.backgroundColor = fistColor
    if (isEndGame) {
      showPlayAgainButton()
      setTimmerText('YOU WIN !!!🌸🌸🌸')
      countTimeOut.clear()
      gameState = GAME_STATUS.FINISHED
      return
    }

    selections = []
    gameState = GAME_STATUS.PLAYING
    return
  }

  // remove active
  setTimeout(() => {
    selections[0].classList.remove('active')
    selections[1].classList.remove('active')

    selections = []
    if (gameState !== GAME_STATUS.FINISHED) {
      gameState = GAME_STATUS.PLAYING
    }
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
function resetGame() {
  // reset variables local
  selections = []
  initBindColor()
  // rest Dom
  // - Hide Button
  HidePlayAgainButton()
  // - remove active ElementColorList
  const colorElementList = getColorElementList()
  for (const colorElement of colorElementList) {
    colorElement.className = ''
  }
  // - rest TimmerText
  setTimmerText('')
  startTimer()
  gameState = GAME_STATUS.PLAYING
}
function attachEventReplayClick() {
  const playAgainButton = getPlayAgainButton()
  playAgainButton.addEventListener('click', () => resetGame())
}
function startTimer() {
  countTimeOut.start()
}

;(() => {
  initBindColor()
  attachEventColorList()
  attachEventReplayClick()
  startTimer()
})()
