import styled from 'styled-components'

const Wrapper = styled.div`
  z-index: 9999;
  display: flex;
  margin: 0;
  width: 100%;
  height: 48px;
  max-height: 44px;
  background: rgba(0, 0, 0, 0.92);
  font-size: 17px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Title = styled.h2`
  color: #ffffff;
`

const Statistics = styled.div`
  color: #ffffff;
`

export default () => {
  return <Wrapper>
    <Title>Birdle</Title>
  </Wrapper>
}
