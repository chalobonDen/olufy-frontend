import type { FC, PropsWithChildren } from 'react'
import { useContext } from 'react'

import ModalContext from '../context'
import { ModalActionType } from '../types'

interface IModalNextProps extends PropsWithChildren {
  screen?: string | number
}

const Next: FC<IModalNextProps> = ({ children, screen }) => {
  const { dispatch } = useContext(ModalContext)

  // _Events
  const onNext = () => {
    dispatch({
      type: ModalActionType.NEXT,
      screenId: screen,
    })
  }

  return <div onClick={onNext}>{children}</div>
}

export default Next
