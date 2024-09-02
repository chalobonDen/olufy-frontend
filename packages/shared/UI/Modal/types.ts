import type { ReactNode } from 'react'

interface IModalChildrenOptions {
  nextScreen: (key: string | number) => void
}

export type ModalChildrenPureComponent = (options?: IModalChildrenOptions) => ReactNode | ReactNode[]

export interface IModalProps {
  title?: ReactNode
  titleClassName?: string
  visible?: boolean
  className?: string
  children?: ModalChildrenPureComponent | ReactNode
  isLoading?: boolean
  size?: 'default' | 'small' | 'big'
  leftComponent?: ReactNode
  rightComponent?: ReactNode
  initialScreenId?: string | number
  closeModal?: VoidFunction
  onScreenChange?: (id: string | number) => void
  isDesktopFullScreen?: boolean
  isMobileFullScreen?: boolean
  panelClassName?: string
  contentClassName?: string
  isCloseModal?: boolean
}

export enum ModalActionType {
  SET_SCREEN = 'SET_SCREEN',
  SET_SCREEENS = 'SET_SCREEENS',
  NEXT = 'NEXT',
}

export type ModalState = {
  currentScreen: ModalChildrenPureComponent | ReactNode
  currentScreens: ReactNode[]
  currentScreenId: string | number
}

export type ModalAction =
  | {
      type: ModalActionType.SET_SCREEN
      payload: Pick<ModalState, 'currentScreen' | 'currentScreenId'>
    }
  | {
      type: ModalActionType.SET_SCREEENS
      payload: Pick<ModalState, 'currentScreens'>
    }
  | {
      type: ModalActionType.NEXT
      screenId: string | number
    }
