import { answers } from './words'

export const validate = (guess: string, mode: string) => {
  const answer =
    answers.split('\n')[Math.floor(Math.random() * answers.split('\n').length)]
  return true
  /* word?.split('')[i % 5] === letter, word?.indexOf(letter) != -1 */
}

//return
// guess: lemon
// actual answer: looms
// semicorrect [ o, m]
// correct [l, -, -, -, -]
