import type { FC } from 'react'
import { useMemo } from 'react'

import * as yup from 'yup'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useFormik } from 'formik'
import { snakelizeKeys, getErrorWithTouched } from '@olufy-frontend/shared/utils'
import clsx from 'clsx'
import { Button, Input } from '@olufy-frontend/shared/UI'

import { TEMPLATE_TYPE } from '@/constants/template'

import type { ITemplate } from '@/types/modules/template'

interface IManageTemplateFormProps {
  data?: ITemplate
  onSubmit?: (payload: ITemplate) => void
  readonly?: boolean
}

const ManageTemplateForm: FC<IManageTemplateFormProps> = ({ data, onSubmit, readonly }) => {
  const { i18n } = useLingui()
  const isEdit = !!data

  const validationSchema = yup.object().shape({
    name: yup.string().required(t`กรุณากรอกชื่อเทมเพลต`),
    vmid: yup.string().required(t`กรุณากรอก Vmid`),
  })

  // _Memo
  const initialValues = useMemo(() => {
    if (!data) {
      return {
        name: '',
        vmid: '',
        type: TEMPLATE_TYPE[0].value,
      } as ITemplate
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
      <h4 className={clsx(`text-header-4`)}>{i18n._(t`ข้อมูลเทมเพลต`)}</h4>

      <div className={clsx(`mt-4`)}>
        <label htmlFor="name">{i18n._(t`ชื่อเทมเพลต`)}</label>
        <Input
          id="name"
          name="name"
          className={clsx(`mt-2`)}
          placeholder={i18n._(t`กรอกชื่อเทมเพลต`)}
          onChange={formik.handleChange}
          value={formik.values.name}
          error={getErrorWithTouched(formik, 'name')}
          disabled={readonly}
        />
      </div>
      <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
        <div>
          <label htmlFor="vmid">{i18n._(t`Vmid`)}</label>
          <Input
            id="vmid"
            name="vmid"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอก Vmid`)}
            onChange={formik.handleChange}
            value={formik.values.vmid}
            error={getErrorWithTouched(formik, 'vmid')}
            disabled={readonly}
          />
        </div>
        <div>
          <label htmlFor="type">{i18n._(t`ประเภทเทมเพลต`)}</label>
          <Input.Select
            id="type"
            name="type"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`เลือกประเภทเทมเพลต`)}
            onChange={(e) => {
              formik.setFieldValue('type', e.target.value)
            }}
            value={formik.values.type}
            disabled={readonly}
          >
            {TEMPLATE_TYPE.map((item, idx) => (
              <option key={idx} value={item.value}>
                {item.label}
              </option>
            ))}
          </Input.Select>
        </div>
      </div>

      {!readonly && (
        <Button variant="success" size="medium" type="submit" disabled={!formik.dirty} className={clsx(`mt-4 w-full`)}>
          <span>{isEdit ? i18n._(t`บันทึก`) : i18n._(t`เพิ่มเทมเพลต`)}</span>
        </Button>
      )}
    </form>
  )
}

export default ManageTemplateForm
