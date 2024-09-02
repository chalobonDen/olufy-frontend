import type { FC } from 'react'
import { useState } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { Button, Input } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'
import { formatPrice, getErrorWithTouched } from '@olufy-frontend/shared/utils'
import { useFormik } from 'formik'
import * as yup from 'yup'

interface IUserSummaryOrderProps {
  vat?: number
  total: number
  onCheckCode?: (payload: IFormValues) => void
}

interface IFormValues {
  code: string
}

const UserSummaryOrder: FC<IUserSummaryOrderProps> = ({ total = 0, vat = 0, onCheckCode }) => {
  const { i18n } = useLingui()

  const validationSchema = yup.object().shape({
    code: yup.string().required(t`กรุณากรอก Promotion code`),
  })

  // _Formik
  const formik = useFormik<IFormValues>({
    initialValues: {
      code: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onCheckCode(values)
    },
  })

  return (
    <div
      className={clsx(`flex items-center bg-primary-100 px-4 py-6 dark:bg-dark-300`, `xl:flex-col xl:items-stretch`)}
    >
      {/* <form onSubmit={formik.handleSubmit}>
        <div className={clsx(`flex items-end space-x-4`)}>
          <div>
            <label htmlFor="code" className={clsx(`text-body-16`)}>
              {i18n._(t`Promotion Code`)}
            </label>
            <Input
              id="code"
              name="code"
              className={clsx(`mt-2`, `sm:flex-1`)}
              value={formik.values.code}
              onChange={formik.handleChange}
            />
          </div>
          <Button variant="success" size="medium" type="submit">
            <span>{i18n._(t`CHECK`)}</span>
          </Button>
        </div>
        <div className={clsx(`input-invalid-message`)}>{getErrorWithTouched(formik, 'code')}</div>
      </form> */}
      <div className={clsx(`ml-auto mt-0`, `xl:mt-4`, `sm:ml-0`)}>
        <div className={clsx(`flex flex-wrap items-center justify-end`, `sm:justify-between sm:space-x-0`)}>
          {/* <div className={clsx(`text-body-20`, `sm:text-body-16`)}>{i18n._(t`ภาษีมูลค่าเพิ่ม :`)}</div> */}
          <div className={clsx(`text-body-20`, `sm:text-body-16`)}>{i18n._(t`ภาษีหัก ณ ที่จ่าย :`)}</div>
          <div className={clsx(`min-w-[285px] text-right text-body-20`, `sm:min-w-fit sm:flex-1 sm:text-body-16`)}>
            {formatPrice(vat)} THB
          </div>
        </div>
        <div className={clsx(`mt-2 flex items-center justify-end space-x-6`, `sm:justify-between sm:space-x-0`)}>
          <div className={clsx(`text-body-20 text-primary-500`, `sm:text-body-16`)}>
            {i18n._(t`รวมยอดที่ต้องชำระ :`)}
          </div>
          <div
            className={clsx(
              `min-w-[260px] text-right text-header-3 font-medium text-primary-500`,
              `sm:min-w-[auto] sm:text-header-4`,
            )}
          >
            {formatPrice(total)} THB
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSummaryOrder
