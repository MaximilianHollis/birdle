import { motion } from 'framer-motion'
import { useContext } from 'react'
import styled from 'styled-components'
import { IStateContext } from '../types'

const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 4px;
  margin: 10px 0;
  position: relative;
`

const Square = styled(motion.div)<{ filled?: boolean }>`
  width: 55px;
  height: 55px;
  border-style: solid;
  border-width: 3px;
  border-color: #d3d6da;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  line-height: 24px;
  font-weight: bold;
  vertical-align: middle;
  box-sizing: border-box;
  text-transform: uppercase;
  user-select: none;
  border-radius: 20%;
  font-family: 'Poppins';
`

const container = {
  hidden: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.025,
    },
  },
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.025,
    },
  },
}

const item = {
  hidden: { scale: 0, rotation: 180 },
  visible: {
    scale: 1,
    rotation: 0,
  },
}

const square = (
  letter: boolean,
  lock: boolean,
  err: boolean,
  correct: boolean,
  semiCorrect: boolean
) => {
  let properties = {
    borderColor: '#d3d6da',
    background: '#ffffff',
    x: [0, 0, 0, 0, 0, 0, 0],
    rotateY: 0,
  }
  if (letter && err) {
    properties = {
      ...properties,
      borderColor: '#c04949c0',
      x: [0, 3, -3, 3, -3, 3, 0],
    }
  } else {
    if (letter) {
      properties = {
        ...properties,
        borderColor: '#878a8cc0',
      }
      if (lock) {
        properties = {
          ...properties,
          background: '#878a8c26',
        }
        if (semiCorrect) {
          properties = {
            ...properties,
            borderColor: '#bb9d5dc5',
            background: '#bb9d5d1a',
          }
        }
        if (correct) {
          properties = {
            ...properties,
            borderColor: '#38913ec8',
            background: '#5dbb631a',
            rotateY: 360,
          }
        }
      }
    }
  }

  return properties
}

export default ({ State }: { State: any }) => {
  const { state }: { state: IStateContext['state'] } = useContext(State)
  return (
    <Wrapper variants={container} initial='hidden' animate='visible'>
      {state.grid.map(({ letter, lock, err, correct, semiCorrect }, i) => (
        <Square
          transition={{
            rotateY: {
              duration: 1,
              delay: (i % 5) * 0.1,
            },
          }}
          variants={item}
          animate={square(!!letter, lock, !!err, !!correct, !!semiCorrect)}
          key={i}
        >
          {letter}
        </Square>
      ))}
    </Wrapper>
  )
}
