import { motion } from 'framer-motion'
import { useContext } from 'react'
import styled from 'styled-components'
import { Action, IStateContext } from '../types'

import { FiDelete } from 'react-icons/fi'

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3px;
  gap: 0 2px;
`

interface KeyProps {
  readonly length?: number
  readonly $correct: boolean
  readonly $semicorrect: boolean
  readonly $unused: boolean
  readonly $borderColor: boolean
}

export const Key = styled(motion.button)<KeyProps>`
  font-family: inherit;
  font-weight: bold;
  padding: 0;
  height: 46px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  background: #d3d6da;
  ${(props) => props.$unused && `background: #969aa1;`}
  ${(props) => props.$semicorrect && `background: #bb9d5dc5;`}
  ${(props) => props.$correct && `background: #38913ec8;`}
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => (props.$borderColor ? '#000000' : '#ffffff')};
  width: ${(props) => (props.length ? (props.length - 1) * 6 + 32 : 32)}px;
  text-transform: uppercase;
  transition: 0.5s ease;
  :active {
    border-color: #000000;
  }
`

const keyboard =
  'q w e r t y u i o p' +
  '\n' +
  'a s d f g h j k l' +
  '\n' +
  'enter z x c v b n m del'

export default ({ State }: { State: any }) => {
  const {
    state,
    dispatch,
  }: { state: IStateContext['state']; dispatch: IStateContext['dispatch'] } =
    useContext(State)

  const correct = (letter: string) =>
    !!state.grid.find(({ letter: l, correct }) => !!(l === letter && correct))
  const semiCorrect = (letter: string) =>
    !!state.grid.find(
      ({ letter: l, semiCorrect }) => !!(l === letter && semiCorrect)
    )
  const unUsed = (letter: string) =>
    !!state.grid.find(
      ({ letter: l, correct, semiCorrect, lock }) =>
        !!(l === letter && !semiCorrect && !correct && lock)
    )

  const onClick = (l: string) => {
    if (l === 'enter') {
      dispatch({ type: Action.input, payload: { code: 'Enter' } })
    } else if (l === 'del') {
      dispatch({ type: Action.input, payload: { key: 'Backspace' } })
    } else {
      dispatch({ type: Action.input, payload: { key: l } })
    }
  }

  return (
    <Wrapper>
      {keyboard.split('\n').map((row, i) => {
        return (
          <Row key={i}>
            {row.split(' ').map((l) => (
              <Key
                onClick={() => onClick(l)}
                key={l}
                $correct={correct(l)}
                $semicorrect={semiCorrect(l)}
                $unused={unUsed(l)}
                $borderColor={
                  state.grid.filter(({ letter }) => letter).slice(-1)[0]
                    ?.letter == l
                }
                length={l.length}
              >
                {l == 'del' ? <FiDelete size={20} /> : l}
              </Key>
            ))}
          </Row>
        )
      })}
    </Wrapper>
  )
}
