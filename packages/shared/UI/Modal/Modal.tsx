import type { FC } from 'react'
import { useReducer } from 'react'

import { AnimatePresence } from 'framer-motion'

import type { IModalProps } from './types'
import ModalContext from './context'
import reducer, { initModalState } from './reducer'
import InternalModal from './InternalModal'

const Modal: FC<IModalProps> = ({ visible = false, children, initialScreenId: _initialScreenId, ...props }) => {
  const initialScreenId = _initialScreenId || 1
  const [state, dispatch] = useReducer(reducer, {
    ...initModalState,
    currentScreenId: initialScreenId,
  })

  return (
    <ModalContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      <AnimatePresence>
        {visible ? (
          <InternalModal visible={visible} initialScreenId={initialScreenId} {...props}>
            {children}
          </InternalModal>
        ) : null}
      </AnimatePresence>
    </ModalContext.Provider>
  )
}

export default Modal
