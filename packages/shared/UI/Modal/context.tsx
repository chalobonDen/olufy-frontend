import type { Dispatch } from 'react'
import { createContext } from 'react'

import type { ModalAction, ModalState } from './types'

interface IModalContext extends ModalState {
  dispatch: Dispatch<ModalAction>
}

const ModalContext = createContext<Partial<IModalContext>>({})

export default ModalContext
