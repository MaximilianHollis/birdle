import { useEffect } from 'react'

export default function useKeyboard(
  setKey:
    | { (key: any): void; (arg0: { key: string; code: string }): void }
) {
  const keydown = (e: { isTrusted: boolean; key: string; code: string }) => {
    if (e.isTrusted && e.key) {
      setKey({ key: e.key, code: e.code })
    }
  }

  //ADD THROTTLING
  useEffect(() => {
    window.addEventListener('keydown', (e) => keydown(e))
    return window.removeEventListener('keydown', (e) => keydown(e))
  }, [])
}
