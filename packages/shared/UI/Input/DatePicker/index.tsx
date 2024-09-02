import type { FC, ReactNode } from 'react'
import { Fragment } from 'react'

import clsx from 'clsx'
import type { ReactDatePickerProps } from 'react-datepicker'
import { default as RDatePicker } from 'react-datepicker'

import DatePickerSvg from '../../../assets/icons/datepicker.svg'

import './styles.scss'

interface IDatePickerProps extends ReactDatePickerProps {
  error?: ReactNode
}

const DatePicker: FC<IDatePickerProps> = ({ className, dateFormat = 'dd-MM-yyyy', error, ...props }) => {
  return (
    <Fragment>
      <div
        className={clsx(
          `input`,
          {
            'is-invalid': typeof error === 'string' || !!error,
          },
          className,
        )}
      >
        <RDatePicker dateFormat={dateFormat} {...props} />
        <img src={DatePickerSvg} className={clsx(`datepicker-icon`)} />
      </div>
      {!!error && <span className={clsx(`input-invalid-message`)}>{error}</span>}
    </Fragment>
  )
}

export default DatePicker
