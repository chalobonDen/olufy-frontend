import type { FC, ReactNode } from 'react'
import { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { IoClose } from 'react-icons/io5'

import './styles.scss'
import Loader from '../Loader'

export interface IDrawerProps {
  visible?: boolean
  children?: ReactNode
  closeDrawer?: VoidFunction
  isLoading?: boolean
  isOverlay?: boolean
  dialogPanelClassName?: string
  iconCloseClassName?: string
  position?: 'left' | 'right'
  className?: string
}

const Drawer: FC<IDrawerProps> = ({
  visible = false,
  children,
  closeDrawer,
  isLoading,
  isOverlay = true,
  dialogPanelClassName,
  iconCloseClassName,
  position = 'right',
  className,
}) => {
  // _Events
  const onCloseDrawer = () => {
    if (!isLoading) closeDrawer?.()
  }
  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog
        as="div"
        open={visible}
        className={clsx(
          `drawer`,
          {
            'is-not-overlay': !isOverlay,
            'drawer-left': position === 'left',
            'drawer-right': position === 'right',
          },
          className,
        )}
        onClose={() => (isOverlay ? onCloseDrawer?.() : null)}
      >
        {isOverlay && (
          <Transition.Child
            enter="drawer-overlay-transition-enter"
            enterFrom="drawer-overlay-transition-enter-from"
            enterTo="drawer-overlay-transition-enter-to"
            leave="drawer-overlay-transition-leave"
            leaveFrom="drawer-overlay-transition-leave-from"
            leaveTo="drawer-overlay-transition-leave-to"
          >
            <div className={clsx(`drawer-overlay`)} />
          </Transition.Child>
        )}

        <div className={clsx(`drawer-dialog`)}>
          <div className={clsx([`drawer-container`])}>
            <Transition.Child
              as={Fragment}
              enter="drawer-transition-enter"
              enterFrom="drawer-transition-enter-from"
              enterTo="drawer-transition-enter-to"
              leave="drawer-transition-leave"
              leaveFrom="drawer-transition-leave-from"
              leaveTo="drawer-transition-leave-to"
            >
              <Dialog.Panel
                className={clsx(
                  'drawer-panel',
                  {
                    'is-not-overlay': !isOverlay,
                  },
                  dialogPanelClassName,
                )}
              >
                <div className={clsx('relative')}>
                  <button className={clsx(`close`)} onClick={onCloseDrawer}>
                    <IoClose className={clsx(`icon`, iconCloseClassName)} />
                  </button>
                </div>

                {children}

                {isLoading && (
                  <div className={clsx('drawer-loader')}>
                    <Loader size={48} />
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Drawer
