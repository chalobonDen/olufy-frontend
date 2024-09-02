import type { FC } from 'react'
import { useMemo } from 'react'

import { Button as SharedButton } from '@olufy-frontend/shared/UI'
import type { ButtonProps } from '@olufy-frontend/shared/UI/Button/types'

import { useSetting } from '@/hooks/stores/useSetting'

type IButtonProps = ButtonProps & {
  href?: string
  isExternal?: boolean
}

const Button: FC<IButtonProps> = ({ href, children, isExternal = false, onClick, ...props }) => {
  const { lang } = useSetting()

  // _Memo
  const newHref = useMemo(() => (isExternal ? href : `/${lang}${href}`), [href, isExternal, lang])

  // _Events
  const handleClick = (e) => {
    if (href && document) {
      document.querySelector('main').scrollTo(0, 0)
    }

    onClick?.(e)
  }

  return (
    <SharedButton {...(href ? { href: newHref } : {})} onClick={(e) => handleClick(e)} {...props}>
      {children}
    </SharedButton>
  )
}

export default Button
