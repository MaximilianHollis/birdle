import styled from 'styled-components'
import {
  MdLeaderboard,
  MdHelpOutline,
  MdSettings,
  MdMenu,
  MdClose,
} from 'react-icons/md'
import HowTo from '../components/modals/howTo'
import Menu from './menu'
import { useEffect, useState } from 'react'
import useKeyboard from '../hooks/useKeyboard'

const Wrapper = styled.div`
  z-index: 9999;
  display: flex;
  margin: 0;
  width: 100%;
  height: 48px;
  padding: 0 14px;
  max-height: 44px;
  background: rgba(0, 0, 0, 0.92);
  font-size: 17px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  & > span {
    width: 65px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > span {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }
  }
`

const Title = styled.h2`
  color: #ffffff;
`

export default () => {
  //MAKE SOME SORT OF EFFECT TO REFOCUS GRID WHEN ANY OF THESE CLOSE
  const [menu, setMenu] = useState(false)
  const [howTo, setHowTo] = useState(false)
  const [leaderboard, setLeaderboard] = useState(false)
  const [settings, setSettings] = useState(false)
  const key = useKeyboard()

  useEffect(() => {
    if (!(howTo || leaderboard || settings)) {
      if (key.key === '1') setMenu(!menu)
      if (key.key === '2') setHowTo(!howTo)
      if (key.key === '3') setLeaderboard(!leaderboard)
      if (key.key === '4') setSettings(!settings)
    }

    if (key.code === 'Escape') {
      if (menu && (howTo || leaderboard || settings)) {
      } else {
        setMenu(false)
      }
      setHowTo(false)
      setLeaderboard(false)
      setSettings(false)
    }
  }, [key])

  return (
    <Wrapper>
      <Menu isOpen={menu} onClose={() => setMenu(false)} />
      <HowTo isOpen={howTo} onClose={() => setHowTo(false)} title='How to' />
      <HowTo
        isOpen={leaderboard}
        onClose={() => setLeaderboard(false)}
        title='History'
      />
      <HowTo
        isOpen={settings}
        onClose={() => setSettings(false)}
        title='Settings'
      />

      <span>
        <span onClick={() => setMenu(!menu)}>
          {menu ? (
            <MdClose color='white' size={30} />
          ) : (
            <MdMenu color='white' size={30} />
          )}
        </span>
        <span onClick={() => setHowTo(true)}>
          <MdHelpOutline color='white' size={28} />
        </span>
      </span>
      <Title>Birdle🐦</Title>
      <span>
        <span onClick={() => setLeaderboard(true)}>
          <MdLeaderboard color='white' size={28} />
        </span>
        <span onClick={() => setSettings(true)}>
          <MdSettings color='white' size={28} />
        </span>
      </span>
    </Wrapper>
  )
}
