import { useState } from 'react'
import styled from 'styled-components'
import Grid from '../src/components/grid'
import Keyboard from '../src/components/keyboard'
import { element } from '../src/types'
import { answers, words } from '../src/words'

const Wrapper = styled.section`
  height: calc(100vh - 44px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px 50px;
  margin: 0;
  align-content: center;
  align-items: center;
  justify-items: center;
  p {
    height: 300px;
  }
`

const arr: element[] = new Array(30)
  .fill({ letter: '', lock: false, err: false }, 0, 5)
  .fill({ letter: '', lock: true, err: false }, 5, 30)

const answer =
  answers.split('\n')[Math.floor(Math.random() * answers.split('\n').length)]

export default function Home() {
  const [grid, setGrid] = useState(arr)
  const [index, setIndex] = useState(0)

  const onChange = ({ target: { value } }: { target: { value: string } }) => {
    let newGrid: element[] = JSON.parse(JSON.stringify(grid))
    if (value.match(/^[a-zA-Zs]*$/)) {
      if (value.length > grid.filter(({ letter }) => letter).length) {
        if (index < 30) {
          if (!newGrid[index]?.lock) {
            newGrid[index] = {
              ...newGrid[index],
              letter: value.toLowerCase().slice(-1),
            }
            setGrid(newGrid)
            setIndex(index + 1)
          }
        }
      } else {
        console.log(index, newGrid[index - 1])
        if (!newGrid[index > 0 ? index - 1 : 0].lock) {
          setIndex(index > 0 ? index - 1 : 0)
          newGrid[index > 0 ? index - 1 : 0] = {
            ...newGrid[index > 0 ? index - 1 : 0],
            letter: '',
            err: false,
          }
          setGrid(newGrid)
        }
      }
    } else {
      console.log('bad input')
    }
  }
  const validate = () => {
    let word = grid
      .filter(({ lock }, i) => !lock && i < index)
      .map(({ letter }) => letter)
    let newGrid: element[] = JSON.parse(JSON.stringify(grid))
    const start = newGrid.findIndex(({ lock }) => !lock)
    const isWord = word.length === 5 && words.includes(word.join(''))
    if (isWord && index > 25) {
      alert('Game Over!')
    } else {
      if (isWord && index % 5 === 0) {
        for (let i = start; i < start + 5 && i < 25; i++) {
          newGrid[i].lock = true
          newGrid[i + 5].lock = false
          newGrid[i].err = false
        }
      } else if (!isWord && word.length === 5) {
        for (let i = start; i < start + 5 && i < 25; i++) {
          newGrid[i].err = true
        }
      }
      setGrid(newGrid)
    }
  }
  return (
    <>
      <Wrapper>
        <Grid grid={grid} word={answer} />
        <Grid grid={grid} word={answer} />

        <input
          value={grid.map(({ letter }) => letter).join('')}
          maxLength={30}
          onChange={onChange}
          onKeyDown={(key) => key.code === 'Enter' && validate()}
        />
        <Keyboard answer={answer} grid={grid} />
      </Wrapper>
    </>
  )
}
