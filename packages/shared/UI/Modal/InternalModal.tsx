import type { FC, ReactNode } from 'react'
import { Fragment, useContext, Children, useEffect, useCallback, useMemo, createElement } from 'react'

import { Dialog } from '@headlessui/react'
import clsx from 'clsx'
import { flatMapDeep, isArray } from 'lodash-es'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'

import type { IModalProps } from './types'
import { ModalActionType } from './types'
import ModalContext from './context'
import type { IModalScreenProps } from './Screen'
import Title from './Title'
import Loader from '../Loader'

import './styles.scss'

const InternalModal: FC<IModalProps> = ({
  title,
  visible = false,
  closeModal,
  className,
  children,
  isLoading,
  size = 'default',
  onScreenChange,
  initialScreenId,
  isDesktopFullScreen,
  isMobileFullScreen,
  panelClassName,
  contentClassName,
  isCloseModal = true,
  titleClassName,
}) => {
  const { dispatch, ...state } = useContext(ModalContext)
  const { currentScreenId, currentScreen: activeScreen, currentScreens } = state

  // _Events
  const nextScreen = (screenId: string | number) => {
    dispatch({
      type: ModalActionType.NEXT,
      screenId,
    })
  }

  const onCloseModal = () => {
    if (!isLoading) {
      closeModal?.()

      setTimeout(() => {
        if (currentScreens.length > 0) nextScreen(initialScreenId)
      }, 150)
    }
  }

  // _Callback
  const getChildren = useCallback((child: any) => {
    if (!isArray(child.props?.children) || !child.props?.children || !child.props?.children?.length) {
      return child
    }
    return [child, flatMapDeep(child?.props?.children, getChildren)]
  }, [])

  // _Memo
  const screen = useMemo((): ReactNode => {
    if (typeof children === 'function') {
      return createElement(Fragment, { children: [activeScreen as ReactNode] })
    }
    return activeScreen as ReactNode
  }, [activeScreen, children])

  // _Effect
  useEffect(() => {
    const childrenArray = Children.toArray(typeof children === 'function' ? children?.({ nextScreen }) : children)
    const flatChildrenArray = flatMapDeep(childrenArray, getChildren).filter((e) => e.type?.displayName === 'Screen')

    // HAVE SCREENS
    if (flatChildrenArray.length > 0) {
      const [currentScreen] = flatChildrenArray.filter((child: any) => {
        const screenProps = child?.props as IModalScreenProps
        return screenProps?.screen?.toString() === currentScreenId.toString()
      })
      dispatch({
        type: ModalActionType.SET_SCREEENS,
        payload: { currentScreens: flatChildrenArray },
      })
      dispatch({ type: ModalActionType.SET_SCREEN, payload: { currentScreenId, currentScreen } })
      return
    }

    // NO SCREENS
    dispatch({ type: ModalActionType.SET_SCREEN, payload: { currentScreenId, currentScreen: children as ReactNode } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, currentScreenId, dispatch, getChildren])

  useEffect(() => {
    onScreenChange?.(currentScreenId)
  }, [currentScreenId, onScreenChange])

  return (
    <Dialog open={visible} as="div" className={clsx(`modal`, className)} onClose={onCloseModal}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'linear', duration: 0.15 }}
        className={clsx(`modal-overlay`)}
      />

      <div
        className={clsx(`modal-dialog`, {
          'is-no-desktop-fullscreen': !isDesktopFullScreen,
          'is-no-mobile-fullscreen': !isMobileFullScreen,
          'is-desktop-fullscreen': isDesktopFullScreen,
          'is-mobile-fullscreen': isMobileFullScreen,
          'is-default': !isDesktopFullScreen && !isMobileFullScreen,
        })}
      >
        <div className={clsx(`modal-dialog-wrapper`)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ ease: 'linear', duration: 0.15 }}
            className={clsx(`modal-dialog-container`)}
          >
            <Dialog.Panel
              className={clsx(
                `modal-dialog-panel`,
                // size === 'default' && `w-[536px]`,
                size === 'small' && `modal-dialog-small`,
                size === 'big' && `modal-dialog-big`,
                panelClassName,
              )}
            >
              <div className={clsx(`modal-dialog-header`)}>
                {isCloseModal && (
                  <button className={clsx(`close`)} onClick={onCloseModal}>
                    <IoClose className={clsx(`icon`)} />
                  </button>
                )}

                {!!title && <Title className={titleClassName}>{title}</Title>}
              </div>

              <div className={clsx(`modal-dialog-content`, contentClassName)}>{screen}</div>

              {isLoading && (
                <div className={clsx('modal-loader')}>
                  <Loader size={48} />
                </div>
              )}
            </Dialog.Panel>
          </motion.div>
        </div>
      </div>
    </Dialog>
  )
}

export default InternalModal
