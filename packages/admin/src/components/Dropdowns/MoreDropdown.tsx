import type { FC } from 'react'

import { Dropdown, SvgIcon } from '@olufy-frontend/shared/UI'

interface IMoreDropdownProps {
  items: JSX.Element | JSX.Element[]
}

const MoreDropdown: FC<IMoreDropdownProps> = ({ items }) => {
  return (
    <Dropdown
      button={<SvgIcon name="menu" />}
      buttonProps={{
        buttonType: 'icon',
        variant: 'primary-solid',
        isInvert: true,
        rounder: 'full',
        size: 'medium',
      }}
      showCaret={false}
      items={items}
    />
  )
}

export default MoreDropdown
