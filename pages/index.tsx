import styled from 'styled-components'
import Grid from '../src/components/grid'
import Keyboard from '../src/components/keyboard'

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
    <>
      {' '}
      <title>Birdle🐦 - Offline</title>
      <Wrapper>
        <Center>
          <Main>
            <Grid />
          </Main>
          <Keyboard />
        </Center>
      </Wrapper>
    </>
  )
}
