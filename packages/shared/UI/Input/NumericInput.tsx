/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { ChangeEvent } from 'react'
import { forwardRef } from 'react'

import { isNumber } from 'lodash-es'

import type { InputProps, InputRef } from './Input'
import Input from './Input'

type NumericInputProps = Omit<InputProps, 'onChange' | 'value'> & {
  isNumberOnly?: boolean
  disabled?: boolean
  isZero?: boolean
  value?: string
  isNegative?: boolean
  onChange?: (e: string) => void
}

const NumericInput = forwardRef<InputRef, NumericInputProps>(
  ({ isNumberOnly = true, isZero = false, max, min, isNegative = false, ...props }, ref) => {
    const inputProps = props as unknown as InputProps
    const { value, onChange } = props

    // _Events
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = e.target
      const reg = /^-?\d*(\.\d*)?$/
      const regNumberOnly = /^[0-9]*$/

      if (isNumberOnly && regNumberOnly.test(inputValue)) {
        onChange?.(inputValue)
        return
      }

      if (!isNumberOnly && (reg.test(inputValue) || inputValue === '')) {
        if (inputValue === '-' && !isNegative) return
        onChange?.(inputValue)
      }
    }

    const handleBlur = () => {
      let valueTemp = value

      if (value?.charAt(value.length - 1) === '.' || value === '-') {
        valueTemp = value.slice(0, -1)
      }

      if (isNumber(max) && Number(valueTemp) > max) {
        valueTemp = String(max)
      }

      if (((isNumber(min) && Number(valueTemp) < min) || value === '') && !!min) {
        valueTemp = String(min)
      }

      if (!value && value !== '') {
        onChange?.('')
        return
      }

      if (isZero) {
        onChange?.(valueTemp!)
      } else {
        onChange?.(String(valueTemp).replace(/0*(\d+)/, '$1'))
      }
    }

    return <Input ref={ref} {...inputProps} value={value} onChange={handleChange} onBlur={handleBlur} />
  },
)

NumericInput.displayName = 'NumericInput'

export default NumericInput
