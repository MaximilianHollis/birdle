import { AnimatePresence, motion } from 'framer-motion'
import Portal from '../HOCs/portal'
import { IoMenu, IoClose } from 'react-icons/io5'
import styled from 'styled-components'
import React from 'react'

const Container = styled(motion.div)`
  position: fixed;
  top: 44px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 44px);
  display: flex;
  justify-content: center;
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
  align-items: center;
`

//MAKE LINKS TO FOR PREFETCHING
const Item = styled(motion.div)`
  padding: 20px 10px;
  font-weight: bold;
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

export default function Menu({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: VoidFunction
}) {
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
              <Item variants={item}>Hello</Item>
              <Item variants={item}>Hello</Item>
              <Item variants={item}>Hello</Item>
              <Item variants={item}>Hello</Item>
              <Item variants={item}>Hello</Item>
            </Wrapper>
          </Container>
        </Portal>
      )}
    </AnimatePresence>
  )
}
