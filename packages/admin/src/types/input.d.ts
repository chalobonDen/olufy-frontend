import type { FieldError, LiteralUnion, RegisterOptions } from 'react-hook-form'

export interface ICustomFieldError extends Omit<FieldError, 'type'> {
  type?: LiteralUnion<keyof RegisterOptions, string>
  label?: string
  value?: string | number
  isNumber?: boolean
  maxLength?: number
}

export type InputFieldError = string | ICustomFieldError
