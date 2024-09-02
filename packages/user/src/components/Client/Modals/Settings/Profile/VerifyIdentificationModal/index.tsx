import type { FC } from 'react'

import type { IModalProps } from '@olufy-frontend/shared/UI/Modal/types'
import { Input, Modal } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useFormik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'
import { getErrorWithTouched, snakelizeKeys } from '@olufy-frontend/shared/utils'
import type { DropFile } from '@olufy-frontend/shared/UI/Input/DropFile/types'

import { validateFieldImage } from '@/utils'
import Button from '@/components/Button'

import { useClientSettingProfileVerifyIdentificationModal } from './hooks'

interface IFormValues {
  idCardNo: string
  idCardImage: string
}

interface IClientSettingVerifyIdentificationModalProps extends IModalProps {
  onSubmit?: (payload: FormData) => void
}

const ClientSettingProfileVerifyIdentificationModal: FC<IClientSettingVerifyIdentificationModalProps> = ({
  onSubmit,
  ...props
}) => {
  const { i18n } = useLingui()
  const { visible, close } = useClientSettingProfileVerifyIdentificationModal()

  const initialValues: IFormValues = { idCardNo: '', idCardImage: null }

  const validationSchema = yup.object().shape({
    idCardNo: yup
      .string()
      .min(13, t`กรุณากรอกเลขบัตรประชาชน 13 หลัก`)
      .required(t`กรุณากรอกเลขบัตรประชาชน 13 หลัก`),
    idCardImage: validateFieldImage,
  })

  // _Form
  const formik = useFormik<IFormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const newValues = snakelizeKeys(values)
      const formData = new FormData()

      for (const key in newValues) {
        if (newValues[key])
          if (newValues[key]?.name) formData.append(key, newValues[key], newValues[key].name)
          else formData.append(key, newValues[key])
      }

      onSubmit?.(formData)
    },
  })

  // _Events
  const onCloseModal = () => {
    close()
    formik.resetForm()
  }

  return (
    <Modal visible={visible} closeModal={onCloseModal} title={i18n._(t`บัตรประชาชน`)} isMobileFullScreen {...props}>
      <form className={clsx(`mt-4 space-y-4`, `sm:pb-24`)} onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="idCardNo">{i18n._(t`เลขบัตรประชาชน 13 หลัก`)}</label>
          <Input.Numeric
            id="idCardNo"
            name="idCardNo"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกเลขบัตรประชาชน 13 หลัก`)}
            onChange={(e) => {
              formik.setFieldValue('idCardNo', e)
            }}
            maxLength={13}
            value={formik.values.idCardNo}
            error={getErrorWithTouched(formik, 'idCardNo')}
          />
        </div>

        <div className={clsx(`rounded-lg bg-error/10 p-2`)}>
          <div>{i18n._(t`กรุณาอัพโหลดรูปภาพบัตรประชาชนดังนี้`)}</div>
          <ul className={clsx(`list-decimal pl-4 text-body-14 font-light`)}>
            <li>{i18n._(t`นำสำเนาบัตรประชาชนหรือวางบัตรประชาชนวางไว้บนกระดาษ`)}</li>
            <li>{i18n._(t`เซ็นกำกับวาง "ใช้สำหรับยืนยัน Olufy.com เท่านั้น"`)}</li>
            <li>{i18n._(t`ถ่ายรูปจากโทรศัพท์มือถือ หรือสแกนเข้าคอมพิวเตอร์มาอัพโหลดลงที่นี้`)}</li>
          </ul>
          <div className={clsx(`mt-3 text-body-14 text-error`)}>{i18n._(t`หมายเหตุ!`)}</div>
          <ul className={clsx(`list-disc pl-4 text-body-14 font-light text-error`)}>
            <li>
              {i18n._(t`กรุณายืนยันข้อมูลตามจริงหากข้อมูลไม่ตรงกับข้อมูลที่ลงทะเบียนไว้ทางเราขออนุญาตยกเลิกบัญชี`)}
            </li>
          </ul>
        </div>

        <div>
          <label>{i18n._(t`อัพโหลดภาพ`)}</label>
          <Input.ImageDropFileForm
            key="idCardImage"
            name="idCardImage"
            className={clsx(`mt-2 h-[200px]`)}
            objectFit="contain"
            value={undefined}
            onDrop={(e: DropFile[]) => {
              formik.setFieldValue('idCardImage', e[0])
            }}
            onDelete={() => {
              formik.setFieldValue('idCardImage', null)
            }}
            error={getErrorWithTouched(formik, 'idCardImage')}
          />
        </div>

        <Modal.Footer>
          <Button variant="primary" type="submit" className={clsx(`w-full`)}>
            <span>{i18n._(t`อัพโหลด`)}</span>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default ClientSettingProfileVerifyIdentificationModal
