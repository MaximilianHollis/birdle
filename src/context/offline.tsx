import React, { useEffect, useReducer, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { Action, IAction, IStateContext, IElement } from '../types'
import { input, validate } from './reducers/game'
import useKeyboard from '../hooks/useKeyboard'
import { answers } from '../words'
import GameState from '../components/modals/gameState'

const genWord = () => {
  const choices = answers.split('\n')
  const choice = choices[Math.floor(Math.random() * choices.length)]
  return choice
}

const arr: IElement[] = new Array(30)
  .fill({ letter: '', lock: false, err: false }, 0, 5)
  .fill({ letter: '', lock: true, err: false }, 5, 30)

const defaultState = {
  grid: arr,
  answer: genWord(),
}

// @ts-ignore
/* const useReducer = createReducer() */
// @ts-ignore
const State = React.createContext<IStateContext>({ state: defaultState })

export const StateProvider = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
}) => {
  //const router = useRouter()

  const reducer = (state: any, action: IAction) => {
    const check = (letter: string, index: number, key: string) => {
      const ans = state.answer
      if (key === 'correct') {
        if (ans.split('')[index] === letter) {
          return true
        } else {
          return false
        }
      } else {
        if (ans.includes(letter)) {
          return true
        } else {
          return false
        }
      }
    }

    switch (action.type) {
      case Action.input:
        if (action.payload?.code === 'Enter') {
          return {
            ...state,
            grid: validate(state.grid, check),
          }
        } else if (action.payload?.key) {
          return {
            ...state,
            grid: input(action.payload.key, state.grid, console.log),
          }
        }
      case Action.reset:
        return { ...state, answer: genWord(), grid: arr }
      default:
        return state
    }
  }

  const [value, setValue, _remove] = useLocalStorage('offline', defaultState)

  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, value)
  const [gameModal, setGameModal] = useState('')

  useKeyboard((key) => dispatch({ type: Action.input, payload: key }))
  console.log(state.answer)

  useEffect(() => {
    setTimeout(() => {
      const userGrid = state.grid.map(
        ({ letter, lock }: { letter: string; lock: boolean }, i: number) =>
          i % 5 === 0 ? '%' + (lock ? letter || '-' : '-') : letter || '-'
      )
      const userWords = userGrid.join('').split('%')
      if (userWords.find((w: string) => w === state.answer)) {
        setGameModal('winner!')
      } else {
        if (
          userGrid.filter(
            ({ letter, lock }: { letter: string; lock: boolean }) =>
              letter && lock
          ).length > 29
        ) {
          setGameModal('looser!')
        }
      }
    }, 2000)
  }, [state.grid])

  useEffect(() => {
    setValue(state)
  }, [state])

  return (
    <State.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <GameState
        isOpen={!!gameModal}
        onClose={() => {
          setGameModal('')
          dispatch({ type: Action.reset, payload: {} })
        }}
        title='You win!'
      />
      {props.children}
    </State.Provider>
  )
}

export default State
