import { AnimatePresence, motion } from 'framer-motion'
import Portal from '../../HOCs/portal'
import { IoMenu, IoClose } from 'react-icons/io5'
import styled from 'styled-components'
import React, { ReactNode } from 'react'

export const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding-bottom: 5%;
  &:focus {
    outline: none;
  }
`

export const Wrapper = styled(motion.div)`
  width: 600px;
  max-width: 100%;
  height: 600px;
  position: relative;
  border-radius: 8px;
  border: 2px solid #d3d6da;
  background: white;
  box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
  width: 90%;
  max-height: 90%;
  overflow-y: auto;
  box-sizing: border-box;
  border-radius: 10px;
`

export const Header = styled(motion.div)`
  border-bottom: 1px solid #1e2131;
  box-sizing: border-box;
  height: 56px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */
  display: flex;
  align-items: center;
  color: #ffffff;
  padding: 10px 15px;
  position: relative;
`

export const IconBox = styled(motion.div)`
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: 5px;
  float: right;
  margin-right: 12px;
`

export const CloseBox = styled(motion.div)`
  position: absolute;
  right: 16px;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: 5px;
  float: right;
  cursor: pointer;
`

export const Content = styled(motion.div)``

const spring = {
  type: 'spring',
  stiffness: 500,
  mass: 1,
  damping: 50,
  bounce: 1,
}

export default function ModalSkeleton({
  children,
  isOpen,
  onClose,
  title,
}: {
  children: ReactNode
  isOpen: boolean
  onClose: VoidFunction
  title: string
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <Container
            transition={spring}
            /* initial={{ backdropFilter: 'brightness(1)' }}
            animate={{ backdropFilter: 'brightness(0.7)' }}
            exit={{ backdropFilter: 'brightness(1)' }} */
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
            tabIndex={0}
          >
            <Wrapper
              transition={spring}
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -200 }}
            >
              <Header>
                <IconBox>
                  <IoMenu size={20} color='black' />
                </IconBox>
                {title}{' '}
                <CloseBox
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IoClose size={20} color='black' />
                </CloseBox>
              </Header>
              <Content>{children}</Content>
            </Wrapper>
          </Container>
        </Portal>
      )}
    </AnimatePresence>
  )
}
