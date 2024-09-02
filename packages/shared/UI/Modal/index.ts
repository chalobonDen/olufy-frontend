import type { ForwardRefExoticComponent } from 'react'

import { default as BaseModal } from './Modal'
import Next from './Next'
import Screen from './Screen'
import Title from './Title'
import Footer from './Footer'
import type { IModalProps } from './types'

type CompoundedComponent = ForwardRefExoticComponent<IModalProps> & {
  Screen: typeof Screen
  Next: typeof Next
  Title: typeof Title
  Footer: typeof Footer
}

const Modal = BaseModal as CompoundedComponent

Modal.Screen = Screen
Modal.Next = Next
Modal.Title = Title
Modal.Footer = Footer

export default Modal
