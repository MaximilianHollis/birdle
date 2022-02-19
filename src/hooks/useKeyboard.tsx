import { useState, useEffect } from 'react'

export default function useKeyboard() {
  const [key, setKey] = useState({ key: '', code: '' })

  //ADD THROTTLING
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      setKey({ key: e.key, code: e.code })
    })
    return window.removeEventListener('keydown', (e) => {
      setKey({ key: e.key, code: e.code })
    })
  }, [])
  return key
}
