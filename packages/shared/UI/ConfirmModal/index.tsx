import type { FC, PropsWithChildren } from 'react'
import { Fragment } from 'react'

import clsx from 'clsx'

import Button from '../Button'
import Modal from '../Modal'
import type { IModalProps } from '../Modal/types'

import './styles.scss'

interface IConfirmModalProps extends Omit<IModalProps, 'children'>, PropsWithChildren {
  cancelText?: string
  confirmText?: string
  cancelClassName?: string
  confirmClassName?: string
  onCancel?: VoidFunction
  onConfirm?: VoidFunction
}

const ConfirmModal: FC<IConfirmModalProps> = ({
  size = 'small',
  className,
  children,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  cancelClassName,
  confirmClassName,
  onCancel,
  onConfirm,
  ...props
}) => {
  return (
    <Modal size={size} className={clsx(`confirm-modal`, className)} {...props}>
      <Fragment>
        {children}

        <div className={clsx(`confirm-modal-footer`)}>
          <Button variant="default" type="button" className={clsx(cancelClassName)} onClick={() => onCancel?.()}>
            {cancelText}
          </Button>
          <Button variant="primary" type="button" className={clsx(confirmClassName)} onClick={() => onConfirm?.()}>
            {confirmText}
          </Button>
        </div>
      </Fragment>
    </Modal>
  )
}

export default ConfirmModal
