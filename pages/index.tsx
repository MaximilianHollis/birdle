import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Grid from '../src/components/grid'
import Keyboard from '../src/components/keyboard'
import { element } from '../src/types'
import { answers, words } from '../src/words'

const Wrapper = styled.section`
  height: 100%;
  padding: 100px 0;
  :focus {
    outline: none;
  }
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: auto;
`

const arr: element[] = new Array(30)
  .fill({ letter: '', lock: false, err: false }, 0, 5)
  .fill({ letter: '', lock: true, err: false }, 5, 30)

const answer =
  answers.split('\n')[Math.floor(Math.random() * answers.split('\n').length)]

export default function Home() {
  const [grid, setGrid] = useState(arr)
  const [index, setIndex] = useState(0)
  const [key, setKey] = useState('')
  const ref = useRef<any>()

  const onChange = (value: string) => {
    let newGrid: element[] = JSON.parse(JSON.stringify(grid))
    if (value.match(/^[a-zA-Zs]*$/) && value.length < 2) {
      if (value) {
        if (index < 30) {
          if (!newGrid[index]?.lock) {
            newGrid[index] = {
              ...newGrid[index],
              letter: value.toLowerCase(),
            }
            setGrid(newGrid)
            setIndex(index + 1)
          }
        }
      } else {
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
    if (index > 28) {
      if (isWord) {
        for (let i = start; i < start + 5; i++) {
          newGrid[i].lock = true
          newGrid[i].err = false
        }
        setTimeout(() => alert('Game Over!'), 1500)
      } else {
        for (let i = start; i < start + 5; i++) {
          newGrid[i].err = true
        }
      }
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
    }
    setGrid(newGrid)
  }

  useEffect(() => {
    if (ref.current) ref.current.focus()
  }, [ref.current])
  return (
    <>
      <Wrapper
        tabIndex={-1}
        ref={ref}
        onKeyDown={(key) => {
          if (key.code === 'Enter') {
            validate()
            setKey('enter')
          } else if (key.code === 'Backspace') {
            onChange('')
            setKey('del')
          } else {
            onChange(key.key)
            setKey(key.key)
          }
        }}
      >
        <Center>
          <Grid grid={grid} word={answer} />
          <Keyboard answer={answer} grid={grid} key={key} />
        </Center>
      </Wrapper>
    </>
  )
}
