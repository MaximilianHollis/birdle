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
import { useState } from 'react'
import useKeyboard from '../hooks/useKeyboard'
import { FaEarlybirds } from 'react-icons/fa'


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

const Title = styled.div`
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export default () => {
  //MAKE SOME SORT OF EFFECT TO REFOCUS GRID WHEN ANY OF THESE CLOSE
  const [menu, setMenu] = useState(false)
  const [howTo, setHowTo] = useState(false)
  const [leaderboard, setLeaderboard] = useState(false)
  const [settings, setSettings] = useState(false)
  useKeyboard((key) => {
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
  })

  return (
    <Wrapper>
      <Menu isOpen={menu} onClose={() => setMenu(false)} />
      <HowTo isOpen={howTo} onClose={() => setHowTo(false)} title='How to play' />
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
            <MdClose color='white' size={22} />
          ) : (
            <MdMenu color='white' size={22} />
          )}
        </span>
        <span onClick={() => setHowTo(true)}>
          <MdHelpOutline color='white' size={22} />
        </span>
      </span>
      <Title>
        <FaEarlybirds color='#89CFF0' size={22}/>
        <h2>Birdle</h2>
      </Title>
      <span>
        <span onClick={() => setLeaderboard(true)}>
          <MdLeaderboard color='white' size={22} />
        </span>
        <span onClick={() => setSettings(true)}>
          <MdSettings color='white' size={22} />
        </span>
      </span>
    </Wrapper>
  )
}
