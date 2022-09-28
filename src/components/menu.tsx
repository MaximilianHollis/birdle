import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Portal from '../HOCs/portal'
import styled from 'styled-components'
import React, { useState } from 'react'
/* import { Key } from './keyboard'
 */
const Container = styled(motion.div)`
  position: fixed;
  top: 44px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 44px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  background: white;
  &:focus {
    outline: none;
  }
`

const Wrapper = styled(motion.div)`
  height: calc(100% - 44px);
  width: 200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  & > span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`

const TipBox = styled.div`
  width: 400px;
  max-width: 95%;
  height: 200px;
  border: 2px solid black;
  border-radius: 10px;
  margin: 10px auto;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const JoinRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3px;
  gap: 0 2px;
`

const Item = styled(motion.div)<{ selected: boolean }>`
  font-weight: bold;
  position: relative;
  font-size: 24px;
  text-transform: uppercase;
  cursor: pointer;
  :before {
    position: absolute;
    content: '';
    width: ${(props) => (props.selected ? '100%' : '0%')};
    bottom: 0;
    height: 2px;
    background: black;
    transition: width 0.3s;
  }
  user-select: none;
`

const SideText = styled.span`
  position: relative;

  :before {
    position: absolute;
    height: 100%;
    top: -25px;
    left: 0px;

    content: '';
    text-align: center;
    font-size: 12px;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: gray;
`

const spring = {
  type: 'spring',
  stiffness: 500,
  mass: 0.5,
  damping: 50,
  bounce: 0.1,
}

const container = {
  hidden: {
    opacity: 0,
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.025,
      duration: 0.1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.025,
      duration: 0.1,
    },
  },
}

const item = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
  },
}

//const items = ['Standard', 'Daily', 'Create', 'Join']

export default function Menu({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: VoidFunction
}) {
  const router = useRouter()

  const [tip, setTip] = useState('Standard')
  /*   const [code, setCode] = useState('')
   */
  return (
    <AnimatePresence>
      {isOpen && (
        <Portal id='menu'>
          <Container
            variants={container}
            transition={spring}
            initial={['hidden']}
            animate={['visible']}
            exit={['hidden']}
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
          >
            <Wrapper>
              <SideText>
                <ItemLink
                  tip={tip}
                  setTip={setTip}
                  onSelect={() => {
                    router.push('/')
                    onClose()
                  }}
                >
                  Unlimited
                </ItemLink>
                <ItemLink
                  tip={tip}
                  setTip={setTip}
                  onSelect={() => {
                    alert('Not yet implemented')
                  }}
                >
                  Daily
                </ItemLink>
              </SideText>

              <Divider />
              <SideText>
                <ItemLink
                  tip={tip}
                  setTip={setTip}
                  onSelect={() => {
                    alert('Not yet implemented')
                    onClose()
                  }}
                >
                  Create
                </ItemLink>
                <ItemLink
                  tip={tip}
                  setTip={setTip}
                  onSelect={() => {
                    alert('Not yet implemented')
                    onClose()
                  }}
                >
                  Join
                </ItemLink>
              </SideText>
            </Wrapper>
            {/*put more info here */}
            <TipBox>
              {tip === 'Join'
                ? 'Please enter join code:'
                : 'Click again to select'}
              {tip === 'Join' && (
                <JoinRow>
                 {/*  <Key>L</Key>
                  <Key>L</Key>
                  <Key>L</Key>
                  <Key>L</Key>
                  <Key>L</Key> */}
                </JoinRow>
              )}
            </TipBox>
          </Container>
        </Portal>
      )}
    </AnimatePresence>
  )
}

const ItemLink = ({
  children: name,
  setTip,
  onSelect,
  tip,
}: {
  children: string
  setTip: Function
  onSelect: VoidFunction
  tip: string
}) => {
  return (
    <Item
      variants={item}
      onClick={() => (tip === name ? onSelect() : setTip(name))}
      /*       onMouseOver={() => setTip(name)}
       */ selected={name === tip}
    >
      {name}
    </Item>
  )
}
