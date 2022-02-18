import styled from 'styled-components'

const Wrapper = styled.div`
  z-index: 9999;
  display: block;
  margin: 0;
  width: 100%;
  min-width: 1024px;
  height: 48px;
  max-height: 44px;
  background: rgba(0, 0, 0, 0.92);
  font-size: 17px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export default () => {
  return <Wrapper>hello</Wrapper>
}
