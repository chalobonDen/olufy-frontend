import type { FC } from 'react'

import { SvgIcon } from '@olufy-frontend/shared/UI'
import type { ButtonProps } from '@olufy-frontend/shared/UI/Button/types'

import Button from '@/components/Button'

const EditButton: FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button variant="warning" buttonType="icon" size="medium" rounder="full" isInvert {...props}>
      <SvgIcon name="edit" />
    </Button>
  )
}

export default EditButton
