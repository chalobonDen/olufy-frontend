import { useEffect, useState } from 'react'

export const useIsMounted = () => {
  // _State
  const [isMounted, setIsMounted] = useState<boolean>(false)

  // _Effect
  useEffect(() => {
    setIsMounted(true)
  }, [setIsMounted])

  return {
    isMounted,
  }
}
