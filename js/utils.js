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
    console.log(color)
    colorsList.push(color)
  }
  colorsList = [...colorsList, ...colorsList]
  shuffele(colorsList)

  return colorsList
}
