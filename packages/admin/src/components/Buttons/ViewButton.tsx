import type { FC } from 'react'

import { Button, SvgIcon } from '@olufy-frontend/shared/UI'
import type { ButtonProps } from '@olufy-frontend/shared/UI/Button/types'

const ViewButton: FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button variant="primary-solid" buttonType="icon" size="medium" rounder="full" isInvert {...props}>
      <SvgIcon name="search" />
    </Button>
  )
}

export default ViewButton
