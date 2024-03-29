// @ts-nocheck
import React, { useEffect } from 'react'
import { createReducer } from 'react-use'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { Action, IAction, IStateContext, IElement } from '../types'
import { input, validate } from './reducers/game'
import useKeyboard from '../hooks/useKeyboard'
import rootSaga from './sagas/multiplayer'

const arr: IElement[] = new Array(30)
  .fill({ letter: '', lock: false, err: false }, 0, 5)
  .fill({ letter: '', lock: true, err: false }, 5, 30)

const defaultState = {
  grid: arr,
}

const sagaMiddleware = createSagaMiddleware()
const useSagaReducer = createReducer(sagaMiddleware, logger)
const State = React.createContext<IStateContext>({ state: { grid: arr } })

const check = (letter: string, index: number, key: string) => {
  const ans = 'words' //server response
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
    //let actionId = nanoid()
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
      default:
        return state
    }
  }

  const [state, dispatch] = useSagaReducer(reducer, defaultState)

  useKeyboard((key) => dispatch({ type: Action.input, payload: key }))

  useEffect(() => {
    console.log('effect')
    const task = sagaMiddleware.run(rootSaga)

    return (): void => {
      console.log('cancel effect')
      task.cancel()
    }
  }, [])

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
