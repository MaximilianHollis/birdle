import { IElement } from '../../types'
import { words } from '../../words'

export const input = (key: string, grid: IElement[]) => {
  let newGrid: IElement[] = JSON.parse(JSON.stringify(grid))
  const index = newGrid.filter(({ letter }) => letter).length
  if (key.match(/^[a-zA-Zs]*$/)) {
    if (key && key.length < 2 && index < 30) {
      if (!newGrid[index]?.lock) {
        newGrid[index] = {
          ...newGrid[index],
          letter: key.toLowerCase(),
        }
        return newGrid
      }
    } else if (key === 'del') {
      if (!newGrid[index > 0 ? index - 1 : 0].lock) {
        newGrid[index > 0 ? index - 1 : 0] = {
          ...newGrid[index > 0 ? index - 1 : 0],
          letter: '',
          err: false,
        }
        return newGrid
      }
    }
  }
  return newGrid
}

export const validate = (
  grid: IElement[],
  check: (arg0: string, arg1: number, arg2: string) => boolean | undefined
) => {
  let newGrid: IElement[] = JSON.parse(JSON.stringify(grid))
  const index = newGrid.filter(({ letter }) => letter).length
  let word = grid
    .filter(({ lock }, i) => !lock && i < index)
    .map(({ letter }) => letter)

  const start = newGrid.findIndex(({ lock }) => !lock)
  const isWord = word.length === 5 && words.includes(word.join(''))
  if (index > 28) {
    if (isWord) {
      for (let i = start; i < start + 5; i++) {
        newGrid[i].lock = true
        newGrid[i].err = false
      }
      setTimeout(() => alert('Game Over!'), 1500)
    } else if (start == -1) {
      alert('Game Over!')
    } else {
      for (let i = start; i < 30; i++) {
        newGrid[i].err = true
      }
    }
  } else {
    if (isWord && index % 5 === 0) {
      for (let i = start; i < start + 5 && i < 25; i++) {
        newGrid[i].lock = true
        newGrid[i].correct = check(newGrid[i].letter, i % 5, 'correct')
        newGrid[i].semiCorrect = check(newGrid[i].letter, i % 5, 'semiCorrect')
        newGrid[i + 5].lock = false
        newGrid[i].err = false
      }
    } else if (!isWord && word.length === 5) {
      for (let i = start; i < start + 5 && i < 25; i++) {
        newGrid[i].err = true
      }
    }
  }
  return newGrid
}