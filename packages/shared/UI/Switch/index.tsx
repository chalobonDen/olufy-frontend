import type { ElementType, FC } from 'react'
import { Fragment } from 'react'

import type { SwitchProps } from '@headlessui/react'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import clsx from 'clsx'

import './styles.scss'
import { useIsMounted } from '../../hooks'

type SwitchVariant = 'primary' | 'success' | 'error' | 'info' | 'warning'

interface ISwitchProps extends SwitchProps<ElementType> {
  variant?: SwitchVariant
  dotClassName?: string
  label?: string
  containerClassName?: string
  labelClassName?: string
}

const Switch: FC<ISwitchProps> = ({
  variant = 'primary',
  className,
  dotClassName,
  label,
  containerClassName,
  labelClassName,
  ...props
}) => {
  const { isMounted } = useIsMounted()

  if (!isMounted) return

  return (
    <HeadlessSwitch as={Fragment} {...props}>
      {({ checked }) => (
        <button className={clsx(`switch-container`, containerClassName)}>
          <span className={clsx(`switch`, [variant], { active: checked }, className)}>
            <span aria-hidden="true" className={clsx(`switch-dot`, dotClassName)} />
          </span>
          {label && <span className={clsx(`switch-label`, labelClassName)}>{label}</span>}
        </button>
      )}
    </HeadlessSwitch>
  )
}

Switch.displayName = 'Switch'

export default Switch
