import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children, id }: { children: ReactNode; id: string }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? //@ts-expect-error stupid
      createPortal(children, document.querySelector('#' + id))
    : null
}

export default Portal
