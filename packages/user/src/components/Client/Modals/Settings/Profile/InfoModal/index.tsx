import type { FC } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useFormik } from 'formik'
import clsx from 'clsx'
import { Input, Modal } from '@olufy-frontend/shared/UI'
import type { IModalProps } from '@olufy-frontend/shared/UI/Modal/types'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'
import * as yup from 'yup'
import 'yup-phone'

import Button from '@/components/Button'

import { useClientSettingProfileInfoModal } from './hooks'

import type { IUserSetupInfo, IUserVerification } from '@/types/modules/user'

interface IClientSettingProfileInfoModalProps extends IModalProps {
  data: IUserSetupInfo
  verification: IUserVerification
  onSubmit?: (payload: IUserSetupInfo) => void
}

const ClientSettingProfileInfoModal: FC<IClientSettingProfileInfoModalProps> = ({
  data,
  verification,
  onSubmit,
  isLoading,
  ...props
}) => {
  const { visible, close } = useClientSettingProfileInfoModal()
  const { i18n } = useLingui()

  const validationSchema = yup.object().shape({
    nameTh: yup.string().required(t`กรุณากรอกชื่อ - นามสกุล ภาษาไทย (TH)`),
    nameEn: yup.string().required(t`กรุณากรอกชื่อ - นามสกุล ภาษาอังกฤษ (EN)`),
    tel: yup
      .string()
      .phone('TH', true, t`ต้องเป็นหมายเลขโทรศัพท์ที่ถูกต้องสำหรับภูมิภาค TH`)
      .required(t`กรุณากรอกเบอร์โทรศัพท์มือถือ`),
    email: yup
      .string()
      .email(t`อีเมลไม่ถูกต้อง`)
      .required(t`กรุณากรอกอีเมล`),
  })

  // _Form
  const formik = useFormik<IUserSetupInfo>({
    initialValues: data,
    validationSchema,
    onSubmit: (values) => onSubmit?.(values),
    enableReinitialize: !!data,
  })

  // _Events
  const onCloseModal = () => {
    if (isLoading) return
    close()
    formik.resetForm()
  }

  return (
    <Modal
      visible={visible}
      closeModal={onCloseModal}
      title={i18n._(t`แก้ไขข้อมูลเกี่ยวกับบัญชี`)}
      isMobileFullScreen
      {...props}
    >
      <form className={clsx(`mt-4 space-y-4`, `sm:pb-24`)} onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="nameTh">{i18n._(t`ชื่อ - นามสกุล ภาษาไทย (TH)`)}</label>
          <Input
            id="nameTh"
            name="nameTh"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกชื่อ - นามสกุล ภาษาไทย`)}
            onChange={formik.handleChange}
            value={formik.values.nameTh}
            error={getErrorWithTouched(formik, 'nameTh')}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="nameEn">{i18n._(t`ชื่อ - นามสกุล ภาษาอังกฤษ (EN)`)}</label>
          <Input
            id="nameEn"
            name="nameEn"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกชื่อ - นามสกุล ภาษาอังกฤษ`)}
            onChange={formik.handleChange}
            value={formik.values.nameEn}
            error={getErrorWithTouched(formik, 'nameEn')}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="tel">
            {i18n._(t`เบอร์โทรศัพท์มือถือ`)}
            <span className={clsx(`text-error`)}>*</span>
          </label>
          <Input
            id="tel"
            name="tel"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกเบอร์โทรศัพท์มือถือ`)}
            onChange={formik.handleChange}
            value={formik.values.tel}
            error={getErrorWithTouched(formik, 'tel')}
            disabled={verification.mobile || isLoading}
          />
        </div>
        <div>
          <label htmlFor="email">
            {i18n._(t`อีเมล`)}
            <span className={clsx(`text-error`)}>*</span>
          </label>
          <Input
            id="email"
            name="email"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกอีเมล`)}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={getErrorWithTouched(formik, 'email')}
            disabled
          />
        </div>

        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            disabled={!formik?.dirty}
            className={clsx(`w-full`)}
            loading={isLoading}
          >
            <span>{i18n._(t`ดำเนินการต่อ`)}</span>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default ClientSettingProfileInfoModal
