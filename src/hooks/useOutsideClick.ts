import { RefObject, useEffect, useRef } from 'react'

type OutsideClickHandler = () => void

export function useOutsideClick(
  handler: OutsideClickHandler,
  listenCapturing = true
): RefObject<any> {
  const ref = useRef<any>()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler()
      }
    }

    document.addEventListener('click', handleClick, listenCapturing)

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing)
    }
  }, [handler, listenCapturing])

  return ref
}
