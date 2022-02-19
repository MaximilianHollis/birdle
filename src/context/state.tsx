import React, { useState, useEffect, useContext } from 'react'
import { createReducer } from 'react-use'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { Action, IAction, IStateContext, IElement } from '../types'
import { input, validate } from './reducers/game'

const arr: IElement[] = new Array(30)
  .fill({ letter: '', lock: false, err: false }, 0, 5)
  .fill({ letter: '', lock: true, err: false }, 5, 30)

const defaultState = {
  grid: arr,
}

const sagaMiddleware = createSagaMiddleware()
// @ts-ignore
const useSagaReducer = createReducer(sagaMiddleware, logger)
// @ts-ignore
const State = React.createContext<IStateContext>({ state: { grid: arr } })

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

  // @ts-ignore
  const [state, dispatch] = useSagaReducer(reducer, defaultState)

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
