import type { FC } from 'react'
import { useEffect, useMemo } from 'react'

import type { IModalProps } from '@olufy-frontend/shared/UI/Modal/types'
import { Button, Input, Modal } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { DISK_TYPE } from '@/constants/disk'

import type { IDisk } from '@/types/modules/disk'
import type { IFormikResponse } from '@/types/formik'

interface IManageDiskProps extends IModalProps {
  data?: IDisk | null
  onSubmit?: (payload: IDisk) => void
  readonly?: boolean
  getForm: (form: IFormikResponse<IDisk>) => void
}

const ManageDiskModal: FC<IManageDiskProps> = ({ closeModal, data, onSubmit, readonly, getForm, ...props }) => {
  const { i18n } = useLingui()
  const isEdit = !!data

  // _Validation_Schema
  const validationSchema = yup.object().shape({
    type: yup.string().required(t`กรุณาเลือก Type`),
    capacity: yup.string().required(t`กรุณาเลือก Capacity`),
    speed: yup.string().required(t`กรุณากรอก Speed`),
    interface: yup.string().required(t`กรุณากรอก Interface`),
    serialNumber: yup.string().required(t`กรุณากรอก Serial Number`),
  })

  // _Memo
  const initialValues = useMemo(() => {
    if (!data) {
      return {
        type: '',
        capacity: '',
        speed: '',
        interface: '',
        serialNumber: '',
      } as IDisk
    }

    return data
  }, [data])

  // _Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: data === null || !!data,
    onSubmit: (values) => {
      onSubmit?.({
        ...values,
        capacity: Number(values.capacity),
        speed: Number(values.speed),
      })
    },
  })

  // _Events
  const handleCloseModal = () => {
    closeModal?.()
    formik.resetForm()
  }

  // _Effect
  useEffect(() => {
    getForm?.(formik as unknown as IFormikResponse<IDisk>)
  }, [formik, getForm])

  return (
    <Modal title={!isEdit ? i18n._(t`เพิ่ม Disk`) : i18n._(t`แก้ไข Disk`)} closeModal={handleCloseModal} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <div className={clsx(`grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <label htmlFor="type">{i18n._(t`Type`)}</label>
            <Input.Select
              id="type"
              name="type"
              className={clsx(`mt-2`)}
              onChange={formik.handleChange}
              value={formik.values.type}
              error={getErrorWithTouched(formik, 'type')}
              disabled={readonly}
            >
              <option value="" disabled>
                {i18n._(t`เลือก Type`)}
              </option>
              {DISK_TYPE?.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Input.Select>
          </div>
          <div>
            <label htmlFor="capacity">{i18n._(t`Capacity`)}</label>
            <Input.Numeric
              id="capacity"
              name="capacity"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอก Capacity`)}
              suffix={<div className={clsx(`border-l pl-2`)}>GB</div>}
              onChange={(e) => {
                formik.setFieldValue('capacity', e)
              }}
              value={formik.values.capacity as string}
              error={getErrorWithTouched(formik, 'capacity')}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="speed">{i18n._(t`Speed`)}</label>
            <Input.Numeric
              id="speed"
              name="speed"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอก Speed`)}
              suffix={<div className={clsx(`border-l pl-2`)}>RPM</div>}
              onChange={(e) => {
                formik.setFieldValue('speed', e)
              }}
              value={formik.values.speed as string}
              error={getErrorWithTouched(formik, 'speed')}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="interface">{i18n._(t`Interface`)}</label>
            <Input
              id="interface"
              name="interface"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอก Interface`)}
              onChange={formik.handleChange}
              value={formik.values.interface}
              error={getErrorWithTouched(formik, 'interface')}
              disabled={readonly}
            />
          </div>
        </div>
        <div className={clsx(`mt-4`)}>
          <label htmlFor="serialNumber">{i18n._(t`Serial Number`)}</label>
          <Input
            id="serialNumber"
            name="serialNumber"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอก Serial Number`)}
            onChange={formik.handleChange}
            value={formik.values.serialNumber}
            error={getErrorWithTouched(formik, 'serialNumber')}
            disabled={readonly}
          />
        </div>

        {!readonly && (
          <div className={clsx(`mt-4 flex space-x-4`)}>
            <Button variant="danger" size="medium" className={clsx(`flex-1`)} onClick={handleCloseModal}>
              <span>{i18n._(t`ยกเลิก`)}</span>
            </Button>
            <Button variant="success" size="medium" type="submit" disabled={!formik.dirty} className={clsx(`flex-1`)}>
              <span>{i18n._(t`บันทึก`)}</span>
            </Button>
          </div>
        )}
      </form>
    </Modal>
  )
}

export default ManageDiskModal
