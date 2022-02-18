import styled from 'styled-components'
import { element } from '../types'

const Wrapper = styled.div``

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3px;
  gap: 0 6px;
`

const Key = styled.button<{
  length?: number
  correct?: boolean
  semiCorrect?: boolean
  unUsed?: boolean
}>`
  font-family: inherit;
  font-weight: bold;
  border: 0;
  padding: 0;
  height: 50px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  background: #d3d6da;
  ${(props) => props.unUsed && `background: #969aa1;`}
  ${(props) => props.semiCorrect && `background: #bb9d5dc5;`}
  ${(props) => props.correct && `background: #38913ec8;`}
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  width: ${(props) => (props.length ? (props.length - 1) * 8 + 40 : 40)}px;
  text-transform: uppercase;
  transition: 0.5s ease;
`

const row1 = 'Q w e r t y u i o p'.split(' ')
const row2 = 'a s d f g h j k l'.split(' ')
const row3 = 'enter z x c v b n m del'.split(' ')

export default ({ answer, grid }: { answer: string; grid: element[] }) => {
  const arr = grid.filter(({ lock }) => lock).map(({ letter }) => letter)

  const unUsed = (letter: string) => {
    return arr.some((l) => letter == l)
  }

  const correct = (letter: string) => {
    const answerPos = answer.indexOf(letter)
    const wordPos = arr.indexOf(letter)
    return wordPos % 5 === answerPos % 5 && wordPos != -1
  }

  const semiCorrect = (letter: string) => {
    const answerPos = answer.indexOf(letter)
    const wordPos = arr.indexOf(letter)
    return wordPos != -1 && answerPos != -1
  }
  return (
    <Wrapper>
      <Row>
        {row1.map((l) => (
          <Key
            key={l}
            correct={correct(l)}
            semiCorrect={semiCorrect(l)}
            unUsed={unUsed(l)}
          >
            {l}
          </Key>
        ))}
      </Row>
      <Row>
        <Row>
          {row2.map((l) => (
            <Key
              key={l}
              correct={correct(l)}
              semiCorrect={semiCorrect(l)}
              unUsed={unUsed(l)}
            >
              {l}
            </Key>
          ))}
        </Row>
      </Row>
      <Row>
        <Row>
          {row3.map((l) => (
            <Key
              key={l}
              length={l.length}
              correct={correct(l)}
              semiCorrect={semiCorrect(l)}
              unUsed={unUsed(l)}
            >
              {l}
            </Key>
          ))}
        </Row>
      </Row>
    </Wrapper>
  )
}
