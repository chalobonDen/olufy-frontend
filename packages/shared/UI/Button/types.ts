import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent } from 'react'

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'primary-solid'
  | 'danger'
  | 'purple'
export type ButtonType = 'default' | 'icon-text' | 'icon' | 'pic-text' | 'dropdown-button' | 'dropdown-icon'
export type ButtonRounder = 'default' | 'full' | 'none' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl'
export type ButtonSize = 'default' | 'medium' | 'small'

export type Button = (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>) & {
  buttonType?: ButtonType
  rounder?: ButtonRounder
  size?: ButtonSize
  isOutline?: boolean
  isInvert?: boolean
}

export type ButtonProps = Button & {
  variant?: ButtonVariant
  as?: 'button' | 'a'
  disabled?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement, MouseEvent> | MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  loading?: boolean
  active?: boolean
}
