import type { FC } from 'react'

import clsx from 'clsx'
import { Button } from '@olufy-frontend/shared/UI'
import { formatNumber } from '@olufy-frontend/shared/utils'

interface INumberButtonProps {
  amount: number
  onSelect: (e: number) => void
  className?: string
  selected: number
}
const NumberButton: FC<INumberButtonProps> = ({ amount = 0, onSelect, className, selected }) => {
  return (
    <Button
      variant="default"
      size="medium"
      className={clsx(
        `!min-h-[42px] rounded-lg border border-white-300`,
        `dark:border-dark-200`,
        `hover:!border-primary-500 hover:bg-primary-500 hover:text-white-900`,
        { '!border-primary-500 bg-primary-500 text-white-900': amount === selected },
        className,
      )}
      onClick={() => {
        onSelect?.(amount)
      }}
    >
      <span>{formatNumber({ number: amount })} THB</span>
    </Button>
  )
}

export default NumberButton
