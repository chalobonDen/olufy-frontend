import type { FC, HTMLAttributes, ReactNode } from 'react'
import { Fragment, useRef, useEffect } from 'react'

import { Popover as HLPopover } from '@headlessui/react'
import clsx from 'clsx'
import { Float } from '@headlessui-float/react'
import { IoChevronDown } from 'react-icons/io5'

import Divider from '../Divider'
import Button from '../Button'
import type { ButtonProps } from '../Button/types'
import { useIsMounted } from '../../hooks'
import type { Placement } from '../../types/float'

import './styles.scss'

export interface IPopoverProps {
  button?: ReactNode
  buttonProps?: (open?: boolean) => ButtonProps
  showCaret?: boolean
  className?: string
  dialogClassName?: string
  children?: ReactNode
  onClose?: () => void
  getClose?: (
    close: (
      focusableElement?: HTMLElement | React.MutableRefObject<HTMLElement> | React.MouseEvent<HTMLElement, MouseEvent>,
    ) => void,
  ) => void
  isHover?: boolean
  placement?: Placement
}

export const PopoverDivider: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  return (
    <div className={clsx(`w-full`, className)}>
      <Divider className={clsx(`my-2`)} />
    </div>
  )
}

const Popover: FC<IPopoverProps> = ({
  button = 'button',
  buttonProps,
  showCaret = true,
  className,
  dialogClassName,
  children,
  onClose,
  getClose,
  isHover = true,
  placement = 'bottom-start',
}) => {
  const buttonRef = useRef(null)
  const timeout = useRef<NodeJS.Timeout[]>([])
  const timeoutDuration = 200
  const { isMounted } = useIsMounted()

  // _Events
  const closePopover = () => {
    return buttonRef.current?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      }),
    )
  }

  const onMouseEnter = (open: boolean) => {
    timeout?.current?.map((time) => clearTimeout(time))
    if (open) return
    return buttonRef.current?.click()
  }

  const onMouseLeave = (open: boolean) => {
    if (!open) return
    timeout.current.push(
      setTimeout(() => {
        closePopover()
      }, timeoutDuration),
    )
  }

  return (
    <Fragment>
      {!isMounted ? (
        <div className={clsx(`popover`, className)}>
          <Button as="a" ref={buttonRef} {...buttonProps}>
            {button} {showCaret && <IoChevronDown className={clsx(`popover-caret-icon`)} />}
          </Button>
        </div>
      ) : (
        <HLPopover className={clsx(`popover`, className)}>
          {({ open, close }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              if (!open) onClose?.()
            }, [open])

            getClose?.(close)

            return (
              <Float
                as={Fragment}
                placement={placement}
                offset={3}
                shift={5}
                flip={5}
                enter="popover-transition-enter"
                enterFrom="popover-transition-enter-from"
                enterTo="popover-transition-enter-to"
                leave="popover-transition-leave"
                leaveFrom="popover-transition-leave-from"
                leaveTo="popover-transition-leave-to"
                tailwindcssOriginClass
              >
                <HLPopover.Button as="button">
                  <Button
                    ref={buttonRef}
                    onMouseEnter={isHover ? onMouseEnter.bind(null, open) : null}
                    onMouseLeave={isHover ? onMouseLeave.bind(null, open) : null}
                    as="a"
                    {...buttonProps?.(open)}
                  >
                    {button} {showCaret && <IoChevronDown className={clsx(`popover-caret-icon`)} />}
                  </Button>
                </HLPopover.Button>
                <HLPopover.Panel className={clsx(`popover-dialog`, [`popover-dialog-${placement}`], dialogClassName)}>
                  <div onMouseEnter={onMouseEnter.bind(null, open)} onMouseLeave={onMouseLeave.bind(null, open)}>
                    {children}
                  </div>
                </HLPopover.Panel>
              </Float>
            )
          }}
        </HLPopover>
      )}
    </Fragment>
  )
}

export default Popover
