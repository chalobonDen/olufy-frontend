import type { FC } from 'react'
import { useMemo } from 'react'

import { useLingui } from '@lingui/react'
import { useFormik } from 'formik'
import clsx from 'clsx'
import { Button, Input } from '@olufy-frontend/shared/UI'
import { t, Trans } from '@lingui/macro'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'
import * as yup from 'yup'

import MemberShipCard from '@/components/Cards/MemberShipCard'

import type { IManageMembership } from '@/types/modules/membership'

interface IManageMembershipFormProps {
  data?: IManageMembership
  onSubmit?: (payload: IManageMembership) => void
}

const ManageMembershipForm: FC<IManageMembershipFormProps> = ({ data, onSubmit }) => {
  const { i18n } = useLingui()
  const isEdit = !!data

  // _Memo
  const initialValues: IManageMembership = useMemo(() => {
    if (!data)
      return {
        color: '#cccccc',
        minOrder: null,
        minPrice: null,
        name: '',
      }

    return data
  }, [data])

  // _Validation_Schema
  const validationSchema = yup.object().shape({
    name: yup.string().required(t`กรุณากรอกชื่อระดับสมาชิก`),
    minOrder: yup
      .string()
      .nullable()
      .required(t`กรุณากรอกชื่อระดับสมาชิก`),
    minPrice: yup
      .string()
      .nullable()
      .required(t`กรุณากรอกชื่อระดับสมาชิก`),
  })

  // _Form
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: !!data,
    onSubmit: (values) => onSubmit?.(values),
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <h4 className={clsx(`text-header-4`)}>{i18n._(t`ระดับสมาชิก`)}</h4>

      <div className={clsx(`mt-2`)}>
        <label htmlFor="name">{i18n._(t`ชื่อระดับสมาชิก`)}</label>
        <Input
          id="name"
          name="name"
          value={formik.values.name}
          className={clsx(`mt-2`)}
          onChange={formik.handleChange}
          placeholder={i18n._(t`กรอกชื่อระดับสมาชิก`)}
          error={getErrorWithTouched(formik, 'name')}
        />
      </div>

      <div className={clsx(`mt-4`)}>
        <label htmlFor="color">
          <Trans>
            สีระดับสมาชิก <span className={clsx(`text-red-500`)}>(กดแถบสีแดงเพื่อเลือกสี)</span>
          </Trans>
        </label>
        <Input.Color
          id="color"
          name="color"
          value={formik.values.color}
          className={clsx(`mt-2`)}
          onChange={formik.handleChange}
        />
      </div>

      <div className={clsx(`mt-4`)}>
        <label htmlFor="minPrice">{i18n._(t`ยอดซื้อขั้นต่ำ`)}</label>
        <Input.Numeric
          id="minPrice"
          name="minPrice"
          value={formik.values.minPrice ? String(formik.values.minPrice) : ''}
          className={clsx(`mt-2`)}
          onChange={(e) => formik.setFieldValue('minPrice', e)}
          placeholder={i18n._(t`กรอกยอดซื้อขั้นต่ำ`)}
          error={getErrorWithTouched(formik, 'minPrice')}
          suffix={<div className={clsx(`border-l border-dark-500 pl-2`)}>THB</div>}
          isNumberOnly={false}
        />
      </div>

      <div className={clsx(`mt-4`)}>
        <label htmlFor="minOrder">{i18n._(t`สั่งซื้อขั้นต่ำ (ครั้ง)`)}</label>
        <Input.Numeric
          id="minOrder"
          name="minOrder"
          value={formik.values.minOrder ? String(formik.values.minOrder) : ''}
          className={clsx(`mt-2`)}
          onChange={(e) => formik.setFieldValue('minOrder', e)}
          placeholder={i18n._(t`กรอกสั่งซื้อขั้นต่ำ`)}
          error={getErrorWithTouched(formik, 'minOrder')}
          isNumberOnly
        />
      </div>

      <div className={clsx(`mt-4`)}>
        <label>{i18n._(t`แสดงผลตัวอย่าง`)}</label>
        <MemberShipCard color={formik.values.color} title={formik.values.name || '-'} amount={5} maxAmount={10} />
      </div>

      <Button type="submit" variant="success" className={clsx(`mt-6 w-full`)} size="medium" disabled={!formik.dirty}>
        <span>{isEdit ? i18n._(t`แก้ไขระดับสมาชิก`) : i18n._(t`เพิ่มระดับสมาชิก`)}</span>
      </Button>
    </form>
  )
}

export default ManageMembershipForm
