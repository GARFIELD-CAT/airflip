import { useEffect, useRef } from 'react'

/**
 * Hook for running a function at regular intervals
 * @param callback - Function to execute
 * @param delay - Delay in milliseconds (null to pause)
 */
export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
} 