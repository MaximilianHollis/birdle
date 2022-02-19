import { useRef, useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import State from '../src/context/state'
import Grid from '../src/components/grid'
import Keyboard from '../src/components/keyboard'
import { Action } from '../src/types'
import HowTo from '../src/components/modals/howTo'

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

export default function Home() {
  const ref = useRef<any>()
  const { dispatch } = useContext(State)
  const [open, isOpen] = useState(false)

  useEffect(() => {
    if (ref.current) ref.current.focus()
  }, [ref.current])
  return (
    <>
      <HowTo isOpen={open} onClose={() => isOpen(!open)} title='Hello' />
      <Wrapper
        tabIndex={-1}
        ref={ref}
        onKeyDown={(key) => {
          if (key.code === 'Enter') {
            dispatch({ type: Action.input, payload: { key: 'enter' } })
          } else if (key.code === 'Backspace') {
            dispatch({ type: Action.input, payload: { key: 'del' } })
          } else {
            dispatch({ type: Action.input, payload: { key: key.key } })
          }
        }}
      >
        <Center>
          <Grid />
          <Keyboard />
        </Center>
      </Wrapper>
    </>
  )
}
