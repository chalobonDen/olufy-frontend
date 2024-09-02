import type { FC } from 'react'

import { SvgIcon } from '@olufy-frontend/shared/UI'
import type { ButtonProps } from '@olufy-frontend/shared/UI/Button/types'

import Button from '@/components/Button'

const BackButton: FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button buttonType="icon" variant="primary-solid" rounder="full" size="medium" {...props}>
      <SvgIcon name="arrow-left" />
    </Button>
  )
}

export default BackButton
