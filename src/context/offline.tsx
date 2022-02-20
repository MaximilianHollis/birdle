import React, { useEffect, useReducer } from 'react'
import { useLocalStorage } from 'react-use'
import { Action, IAction, IStateContext, IElement } from '../types'
import { input, validate } from './reducers/game'
import useKeyboard from '../hooks/useKeyboard'
import { answers } from '../words'

const genWord = () => {
  const choices = answers.split('\n')
  return choices[Math.random() * choices.length]
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
        if (ans.indexOf(letter) === index) {
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

    const checkWord = (word: string) => {
      if (word === state.answer) {
        //YOU MAY WANT TO PUT A DELAY HERE
        alert('You win!')
        return true
      } else {
        return false
      }
    }
    //let actionId = nanoid()
    switch (action.type) {
      case Action.input:
        if (action.payload?.code === 'Enter') {
          return {
            ...state,
            grid: validate(state.grid, check, checkWord),
          }
        } else if (action.payload?.key) {
          return {
            ...state,
            grid: input(action.payload.key, state.grid, console.log),
          }
        }
      case Action.reset:
        return {...state, answer: genWord()}
      default:
        return state
    }
  }

  const [value, setValue, _remove] = useLocalStorage('offline', defaultState)

  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, value)

  useKeyboard((key) => dispatch({ type: Action.input, payload: key }))

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
      {props.children}
    </State.Provider>
  )
}

export default State
