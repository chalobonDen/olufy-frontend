import type { FC } from 'react'
import { useMemo } from 'react'

import * as yup from 'yup'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useFormik } from 'formik'
import { snakelizeKeys, getErrorWithTouched } from '@olufy-frontend/shared/utils'
import clsx from 'clsx'
import { Button, Input } from '@olufy-frontend/shared/UI'

import type { IDataCenter } from '@/types/modules/data-center'

interface IManageDataCenterFormProps {
  data?: IDataCenter
  onSubmit?: (payload: IDataCenter) => void
  readonly?: boolean
}

const ManageDataCenterForm: FC<IManageDataCenterFormProps> = ({ data, onSubmit, readonly }) => {
  const { i18n } = useLingui()
  const isEdit = !!data

  const validationSchema = yup.object().shape({
    name: yup.string().required(t`กรุณากรอกชื่อ Data Center`),
    tel: yup.string().required(t`กรุณากรอกเบอร์โทรศัพท์มือถือ`),
    email: yup.string().required(t`กรุณากรอกอีเมล`),
    address: yup.string().required(t`กรุณากรอกที่อยู่`),
  })

  // _Memo
  const initialValues = useMemo(() => {
    if (!data) {
      return {
        name: '',
        tel: '',
        email: '',
        address: '',
        detail: '',
      } as IDataCenter
    }

    return {
      ...data,
    }
  }, [data])

  // _Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: !!data,
    onSubmit: (values) => {
      const newValues = snakelizeKeys(values)

      onSubmit?.(newValues)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <h4 className={clsx(`text-header-4`)}>{i18n._(t`ข้อมูล Data Center`)}</h4>

      <div
        className={clsx(`mt-4 flex items-center space-x-4`, `sm:flex-col sm:items-stretch sm:space-x-0 sm:space-y-4`)}
      >
        <div className={clsx(`flex-1`)}>
          <label htmlFor="name">{i18n._(t`ชื่อ Data Center`)}</label>
          <Input
            id="name"
            name="name"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกชื่อ Data Center`)}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={getErrorWithTouched(formik, 'name')}
            disabled={readonly}
          />
        </div>
        <div className={clsx(`flex-1`)}>
          <label htmlFor="tel">{i18n._(t`เบอร์โทรศัพท์มือถือ`)}</label>
          <Input.Numeric
            id="tel"
            name="tel"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกเบอร์โทรศัพท์มือถือ`)}
            onChange={(e) => {
              formik.setFieldValue('tel', e)
            }}
            value={formik.values.tel}
            error={getErrorWithTouched(formik, 'tel')}
            isZero
            disabled={readonly}
          />
        </div>
      </div>
      <div className={clsx(`mt-4`)}>
        <label htmlFor="email">{i18n._(t`อีเมล`)}</label>
        <Input
          id="email"
          name="email"
          className={clsx(`mt-2`)}
          placeholder={i18n._(t`กรอกอีเมล`)}
          onChange={formik.handleChange}
          value={formik.values.email}
          error={getErrorWithTouched(formik, 'email')}
          disabled={readonly}
        />
      </div>
      <div className={clsx(`mt-4`)}>
        <label htmlFor="address">{i18n._(t`ที่อยู่`)}</label>
        <Input.TextArea
          id="address"
          name="address"
          className={clsx(`mt-2`)}
          placeholder={i18n._(t`กรอกที่อยู่`)}
          onChange={formik.handleChange}
          value={formik.values.address}
          error={getErrorWithTouched(formik, 'address')}
          disabled={readonly}
        />
      </div>
      <div className={clsx(`mt-4`)}>
        <label htmlFor="detail">{i18n._(t`รายละเอียด`)}</label>
        <Input
          id="detail"
          name="detail"
          className={clsx(`mt-2`)}
          placeholder={i18n._(t`กรอกรายละเอียด`)}
          onChange={formik.handleChange}
          value={formik.values.detail}
          disabled={readonly}
        />
      </div>

      {!readonly && (
        <Button variant="success" size="medium" type="submit" disabled={!formik.dirty} className={clsx(`mt-4 w-full`)}>
          <span>{isEdit ? i18n._(t`บันทึก`) : i18n._(t`เพิ่ม Data Center`)}</span>
        </Button>
      )}
    </form>
  )
}

export default ManageDataCenterForm
