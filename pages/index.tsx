import { useEffect, useContext } from 'react'
import styled from 'styled-components'
import useKeyboard from '../src/hooks/useKeyboard'

import State from '../src/context/state'
import Grid from '../src/components/grid'
import Keyboard from '../src/components/keyboard'
import { Action } from '../src/types'

const Wrapper = styled.section`
  height: calc(100vh - 44px);
  :focus {
    outline: none;
  }
`

const Center = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: auto;
`

export default function Home() {
  const { dispatch } = useContext(State)
  const key = useKeyboard()
  useEffect(() => {
    if (key?.code) {
      dispatch({ type: Action.input, payload: key })
    }
  }, [key])
  return (
    <>
      {' '}
      <title>Birdle🐦 - Offline</title>
      <Wrapper>
        <Center>
          <Grid />
          <Keyboard />
        </Center>
      </Wrapper>
    </>
  )
}
