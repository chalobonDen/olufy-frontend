import type { FC } from 'react'
import { useMemo } from 'react'

import * as yup from 'yup'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useFormik } from 'formik'
import { snakelizeKeys, getErrorWithTouched } from '@olufy-frontend/shared/utils'
import clsx from 'clsx'
import { Button, Input } from '@olufy-frontend/shared/UI'

import DataCenterSelect from '../../Selects/DataCenterSelect'

import type { IRack } from '@/types/modules/rack'

interface IManageRackFormProps {
  data?: IRack
  onSubmit?: (payload: IRack) => void
  readonly?: boolean
}

const ManageRackForm: FC<IManageRackFormProps> = ({ data, onSubmit, readonly }) => {
  const { i18n } = useLingui()
  const isEdit = !!data

  const validationSchema = yup.object().shape({
    name: yup.string().required(t`กรุณากรอกชื่อ Rack`),
    maxSlot: yup.string().required(t`กรุณากรอก Max Slot`),
    detail: yup.string().required(t`กรุณากรอกรายละเอียด`),
    dataCenterId: yup.string().required(t`กรุณาเลือก Data Center`),
  })

  // _Memo
  const initialValues = useMemo(() => {
    if (!data) {
      return {
        name: '',
        maxSlot: '',
        detail: '',
        dataCenterId: '',
      } as IRack
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
      const newValues = snakelizeKeys({
        ...values,
        maxSlot: Number(values.maxSlot),
        dataCenterId: Number(values.dataCenterId),
      })

      onSubmit?.(newValues)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <h4 className={clsx(`text-header-4`)}>{i18n._(t`ข้อมูล Rack`)}</h4>

      <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
        <div className={clsx(`flex-1`)}>
          <label htmlFor="name">{i18n._(t`ชื่อ Rack`)}</label>
          <Input
            id="name"
            name="name"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกชื่อ Rack`)}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={getErrorWithTouched(formik, 'name')}
            disabled={readonly}
          />
        </div>
        <div className={clsx(`flex-1`)}>
          <label htmlFor="maxSlot">{i18n._(t`Max Slot`)}</label>
          <Input.Numeric
            id="maxSlot"
            name="maxSlot"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอก Max Slot`)}
            onChange={(e) => {
              formik.setFieldValue('maxSlot', e)
            }}
            value={formik.values.maxSlot as string}
            error={getErrorWithTouched(formik, 'maxSlot')}
            disabled={readonly}
          />
        </div>

        <div className={clsx(`flex-1`)}>
          <label htmlFor="detail">{i18n._(t`รายละเอียด`)}</label>
          <Input
            id="detail"
            name="detail"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกรายละเอียด`)}
            onChange={formik.handleChange}
            value={formik.values.detail}
            error={getErrorWithTouched(formik, 'detail')}
            disabled={readonly}
          />
        </div>
        <div className={clsx(`flex-1`)}>
          <label htmlFor="dataCenterId">{i18n._(t`Data Center`)}</label>
          <DataCenterSelect
            id="dataCenterId"
            name="dataCenterId"
            className={clsx(`mt-2`)}
            value={formik.values.dataCenterId}
            onChange={formik.handleChange}
            error={getErrorWithTouched(formik, 'dataCenterId')}
          />
        </div>
      </div>

      {!readonly && (
        <Button variant="success" size="medium" type="submit" disabled={!formik.dirty} className={clsx(`mt-4 w-full`)}>
          <span>{isEdit ? i18n._(t`บันทึก`) : i18n._(t`เพิ่ม Rack`)}</span>
        </Button>
      )}
    </form>
  )
}

export default ManageRackForm
