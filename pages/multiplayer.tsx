import styled from 'styled-components'
import Grid from '../src/components/grid'
import Keyboard from '../src/components/keyboard'
import { StateProvider } from '../src/context/multiplayer'
import State from '../src/context/multiplayer'

const Wrapper = styled.section`
  height: calc(100vh - 44px);
  :focus {
    outline: none;
  }
`

const Center = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

const Main = styled.div`
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`

export default function Home() {
  return (
    <StateProvider>
      {' '}
      <title>Birdle🐦 - Multiplayer</title>
      <Wrapper>
        <Center>
          <Main>
            <Grid State={State} />
          </Main>
          <Keyboard State={State}/>
        </Center>
      </Wrapper>
    </StateProvider>
  )
}
