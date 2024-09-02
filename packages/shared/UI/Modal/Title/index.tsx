import type { FC, PropsWithChildren } from 'react'

import { Dialog } from '@headlessui/react'
import clsx from 'clsx'

export interface IModalTitleProps extends PropsWithChildren {
  className?: string
}

const Title: FC<IModalTitleProps> = ({ className, children }) => {
  return (
    <Dialog.Title as="div" className={clsx(`modal-dialog-content-title`)}>
      <h3 className={className}>{children}</h3>
    </Dialog.Title>
  )
}

export default Title
