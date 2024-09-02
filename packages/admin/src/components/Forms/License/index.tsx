import type { FC } from 'react'
import { useState, Fragment, useEffect, useMemo } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { snakelizeKeys, getErrorWithTouched } from '@olufy-frontend/shared/utils'
import { Button, Checkbox, Divider, Input } from '@olufy-frontend/shared/UI'

import type { ILicenseForm } from '@/types/modules/license'

interface IManageLicenseFormProps {
  data?: ILicenseForm
  onSubmit?: (payload: ILicenseForm) => void
  readonly?: boolean
}

const MOCK_TAX_WITH_HOLD = [
  {
    value: 1,
    label: '1%',
  },
  {
    value: 2,
    label: '2%',
  },
  {
    value: 3,
    label: '3%',
  },
]

const MOCK_TYPE = [
  {
    value: 1,
    label: 'ซื้อขาด permanent',
  },
  {
    value: 2,
    label: 'ปี year',
  },
  {
    value: 3,
    label: 'เดือน month',
  },
  {
    value: 4,
    label: 'วัน day',
  },
]

const ManageLicenseForm: FC<IManageLicenseFormProps> = ({ data, onSubmit, readonly = false }) => {
  const { i18n } = useLingui()
  const isEdit = !!data

  const defaultSchema = {
    key: yup.string().required(t`กรุณากรอก License Key`),
    price: yup.string().required(t`กรุณากรอกราคา`),
    paymentType: yup.string().required(t`กรุณากรอกรูปแบบการชำระเงิน`),
  }

  const validationSchema = yup.object().shape({
    ...defaultSchema,
  })

  const validationTaxSchema = yup.object().shape({
    ...defaultSchema,
    taxRate: yup.string().required(t`กรุณาเลือกอัตราภาษี`),
    taxAmount: yup.string().required(t`กรุณากรอกมูลค่าถูกหัก ณ ที่จ่าย`),
  })

  // _State
  const [isWithholdTax, setIsWithholdTax] = useState(false)

  // _Memo
  const initialValues = useMemo(() => {
    if (!data) {
      return {
        name: '',
        price: '',
        paymentType: MOCK_TYPE[0].value,
        taxRate: '',
        taxAmount: '',
      } as ILicenseForm
    }

    return {
      ...data,
    }
  }, [data])

  const isTax = useMemo(() => !!data?.taxRate && !!data?.taxAmount, [data?.taxAmount, data?.taxRate])

  // _Formik
  const formik = useFormik({
    initialValues,
    validationSchema: isTax || isWithholdTax ? validationTaxSchema : validationSchema,
    enableReinitialize: !!data,
    onSubmit: (values) => {
      const newValues = snakelizeKeys(values)

      onSubmit?.(newValues)
    },
  })

  // _Effect
  useEffect(() => {
    if (isTax) setIsWithholdTax(true)
  }, [isTax])

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <h4 className={clsx(`text-header-4`)}>{i18n._(t`LICENSE KEY`)}</h4>

        <div className={clsx(`mt-2`)}>
          <label htmlFor="name">{i18n._(t`Name`)}</label>
          <Input
            id="name"
            name="name"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`LICENSE KEY`)}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={getErrorWithTouched(formik, 'name')}
            disabled={readonly}
          />
        </div>
        <Divider className={clsx(`my-4`)} />
        <div className={clsx(`flex space-x-4`, `sm:flex-col sm:space-x-0 sm:space-y-4`)}>
          <div className={clsx(`flex-1`)}>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`PRICE`)}</h4>

            <div className={clsx(`mt-2`)}>
              <label htmlFor="price">{i18n._(t`PRICE`)}</label>
              <Input.Numeric
                id="price"
                name="price"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`PRICE`)}
                onChange={(e) => {
                  formik.setFieldValue('price', e)
                }}
                value={formik.values.price as string}
                suffix={<div className={clsx(`border-l border-dark-500 pl-2`)}>THB</div>}
                isNumberOnly={false}
                error={getErrorWithTouched(formik, 'price')}
                disabled={readonly}
              />
            </div>
          </div>
          <div className={clsx(`flex-1`)}>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`รูปแบบการชำระเงิน`)}</h4>

            <div className={clsx(`mt-2`)}>
              <label htmlFor="paymentType">{i18n._(t`TYPE OF`)}</label>
              <Input.Select
                id="paymentType"
                name="paymentType"
                className={clsx(`mt-2`)}
                onChange={formik.handleChange}
                value={formik.values.paymentType}
                error={getErrorWithTouched(formik, 'paymentType')}
                disabled={readonly}
              >
                {Object.values(MOCK_TYPE)?.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Input.Select>
            </div>
          </div>
        </div>

        <Checkbox
          className={clsx(`mt-4 self-center`)}
          checked={isWithholdTax}
          onChange={() => {
            setIsWithholdTax((e) => !e)
            if (!isWithholdTax) {
              formik.setFieldValue('taxRate', MOCK_TAX_WITH_HOLD[0].value)
            } else {
              formik.setFieldValue('taxRate', null)
              formik.setFieldValue('taxAmount', null)
            }
          }}
          disabled={readonly}
        >
          <span>{i18n._(t`หักภาษี ณ ที่จ่าย`)}</span>
        </Checkbox>

        {isWithholdTax && (
          <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
            <div>
              <label htmlFor="taxRate">{i18n._(t`อัตราภาษี`)}</label>
              <Input.Select
                id="taxRate"
                name="taxRate"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกอัตราภาษี`)}
                onChange={formik.handleChange}
                value={formik.values.taxRate || ''}
                error={getErrorWithTouched(formik, 'taxRate')}
                disabled={readonly}
              >
                {Object.values(MOCK_TAX_WITH_HOLD).map((item, idx) => (
                  <option key={idx} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Input.Select>
            </div>
            <div>
              <label htmlFor="taxAmount">{i18n._(t`มูลค่าถูกหัก ณ ที่จ่าย`)}</label>
              <Input.Numeric
                id="taxAmount"
                name="taxAmount"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกมูลค่าถูกหัก ณ ที่จ่าย`)}
                onChange={(e) => {
                  formik.setFieldValue('taxAmount', e)
                }}
                value={formik.values.taxAmount as string}
                isNumberOnly={false}
                error={getErrorWithTouched(formik, 'taxAmount')}
                disabled={readonly}
              />
            </div>
          </div>
        )}

        {!readonly && (
          <div className={clsx(`mt-6 flex justify-end space-x-4`)}>
            <Button as="a" href="/app/domain" variant="danger" size="medium" type="button" className={clsx(`flex-1`)}>
              <span>{i18n._(t`ยกเลิก`)}</span>
            </Button>
            <Button variant="success" size="medium" type="submit" disabled={!formik.dirty} className={clsx(`flex-1`)}>
              <span>{isEdit ? i18n._(t`บันทึก`) : i18n._(t`เพิ่มแพ็กเกจ`)}</span>
            </Button>
          </div>
        )}
      </form>
    </Fragment>
  )
}

export default ManageLicenseForm
