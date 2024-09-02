import type { FC } from 'react'
import { Fragment, useEffect } from 'react'

import { useCountdown } from 'usehooks-ts'

interface ICountdownProps {
  countStart: number
  onFinish?: VoidFunction
}

const Countdown: FC<ICountdownProps> = ({ countStart, onFinish }) => {
  const [count, { startCountdown }] = useCountdown({
    countStart,
    intervalMs: 1000,
  })

  // _Effect
  useEffect(() => {
    if (countStart > 0) startCountdown()
  }, [countStart, startCountdown])

  useEffect(() => {
    if (count === 0 && countStart > 0) return onFinish?.()
  }, [count, countStart, onFinish])

  return <Fragment>{count}</Fragment>
}

export default Countdown
