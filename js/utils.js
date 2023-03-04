import { getPlayAgainButton, getTimerElement } from './selectors.js'

function shuffele(arr) {
  for (let index = arr.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * index)
    const temp = arr[index]
    arr[index] = arr[randomIndex]
    arr[randomIndex] = temp
  }
}
export const getRandomColorPairs = (count) => {
  // receive count --> return count * 2 random colors
  // using lib: https://github.com/davidmerfield/randomColor
  if (count <= 0) return

  let colorsList = []
  const hueList = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink ', 'monochrome']

  for (let index = 0; index < count; index++) {
    const color = randomColor({ luminosity: 'dark', hue: hueList[index] })
    colorsList.push(color)
  }
  colorsList = [...colorsList, ...colorsList]
  shuffele(colorsList)

  return colorsList
}

export function showPlayAgainButton() {
  const playAgainButton = getPlayAgainButton()
  playAgainButton.classList.add('show')
}
export function HidePlayAgainButton() {
  const playAgainButton = getPlayAgainButton()
  playAgainButton.classList.remove('show')
}
export function setTimmerText(text) {
  const timerText = getTimerElement()
  if (timerText) timerText.textContent = text
}

export function createCountTimeOut({ second, onChange, onFinish }) {
  let idInterval = null
  function start() {
    let currentSecond = second
    clear()
    idInterval = setInterval(() => {
      // if (onChange) onChange(currentSecond)
      onChange?.(currentSecond)
      currentSecond -= 1
      if (currentSecond < 0) {
        clear()
        onFinish?.()
      }
    }, 1000)
  }
  function clear() {
    clearInterval(idInterval)
  }

  return {
    start,
    clear,
  }
}
