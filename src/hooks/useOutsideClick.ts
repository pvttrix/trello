import type { RefObject} from 'react';
import { useEffect, useRef } from 'react'

type OutsideClickHandler = () => void
/* eslint-disable @typescript-eslint/no-explicit-any */
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
