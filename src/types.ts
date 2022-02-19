import { Dispatch } from 'react'

export interface IElement {
  letter: string
  lock: boolean
  err?: boolean
  correct?: boolean
  semiCorrect?: boolean
}

export interface IStateContext {
  state: {
    grid: IElement[]
  }
  dispatch: Dispatch<any>
}

export enum Action {
  input = 'input',
  get = 'get',
  set = 'set',
  check = 'check',
  setIndex = 'setIndex',
}

export interface IAction {
  type: Action
  payload: any
}
