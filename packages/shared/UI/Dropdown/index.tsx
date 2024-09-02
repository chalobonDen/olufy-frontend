/* eslint-disable react-hooks/rules-of-hooks */
import type { FC, HTMLAttributes, KeyboardEvent, ReactNode } from 'react'
import { Fragment, useEffect } from 'react'

import { Float } from '@headlessui-float/react'
import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { IoChevronDown } from 'react-icons/io5'

import Divider from '../Divider'
import Button from '../Button'
import type { ButtonProps } from '../Button/types'
import { useIsMounted } from '../../hooks'
import type { Placement } from '../../types/float'

import './styles.scss'

export interface IDropdownProps {
  button?: ReactNode
  buttonProps?: ButtonProps
  items?: JSX.Element | JSX.Element[]
  showCaret?: boolean
  className?: string
  dialogClassName?: string
  placement?: Placement
  onMenuItemsKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
  onClose?: () => void
  getCloseFn?: (e: VoidFunction) => void
}

export enum Keys {
  Space = ' ',
  Enter = 'Enter',
  Escape = 'Escape',
  Backspace = 'Backspace',
  Delete = 'Delete',

  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowRight = 'ArrowRight',
  ArrowDown = 'ArrowDown',

  Home = 'Home',
  End = 'End',

  PageUp = 'PageUp',
  PageDown = 'PageDown',

  Tab = 'Tab',
}

export const DropdownDivider: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  return (
    <div className={clsx('dropdown-divider', className)}>
      <Divider />
    </div>
  )
}

const Dropdown: FC<IDropdownProps> = ({
  button = 'button',
  buttonProps,
  items,
  showCaret = true,
  className,
  dialogClassName,
  placement = 'bottom-end',
  onMenuItemsKeyDown,
  onClose,
  getCloseFn,
}) => {
  const { isMounted } = useIsMounted()

  return (
    <Fragment>
      {!isMounted ? (
        <div className={className}>
          <Button {...buttonProps}>
            {button} {showCaret && <IoChevronDown className={clsx(`dropdown-caret-icon`)} />}
          </Button>
        </div>
      ) : (
        <Menu as="div" className={clsx(`dropdown`, className)}>
          {({ open, close }) => {
            useEffect(() => {
              if (!open) onClose?.()
            }, [open])

            useEffect(() => {
              if (close) getCloseFn?.(close)
            }, [close])

            return (
              <Float
                as={Fragment}
                placement={placement}
                offset={3}
                shift={5}
                flip={5}
                enter="dropdown-transition-enter"
                enterFrom="dropdown-transition-enter-from"
                enterTo="dropdown-transition-enter-to"
                leave="dropdown-transition-leave"
                leaveFrom="dropdown-transition-leave-from"
                leaveTo="dropdown-transition-leave-to"
                tailwindcssOriginClass
                portal
              >
                <Menu.Button as="div" className={className} role="button" aria-label="dropdown">
                  <Button {...buttonProps}>
                    {button} {showCaret && <IoChevronDown className={clsx(`dropdown-caret-icon`)} />}
                  </Button>
                </Menu.Button>

                <Menu.Items
                  className={clsx(`dropdown-dialog`, dialogClassName)}
                  onKeyDown={(e) => onMenuItemsKeyDown?.(e)}
                >
                  <div className={clsx(`dropdown-dialog-container`)}>{items}</div>
                </Menu.Items>
              </Float>
            )
          }}
        </Menu>
      )}
    </Fragment>
  )
}

export default Dropdown
