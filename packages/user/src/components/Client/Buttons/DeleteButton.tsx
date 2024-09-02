import type { FC } from 'react'

import { SvgIcon } from '@olufy-frontend/shared/UI'
import type { ButtonProps } from '@olufy-frontend/shared/UI/Button/types'

import Button from '@/components/Button'

const DeleteButton: FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button variant="danger" buttonType="icon" size="medium" rounder="full" isInvert {...props}>
      <SvgIcon name="delete" />
    </Button>
  )
}

export default DeleteButton
