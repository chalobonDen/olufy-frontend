import type { FC } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import * as yup from 'yup'
import 'yup-phone'
import { useFormik } from 'formik'
import { Input } from '@olufy-frontend/shared/UI'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'

import UserTitle from '@/components/UI/User/Title'
import { useUserStore } from '@/stores/user'
import Button from '@/components/Button'

import type { IUserSetupInfo } from '@/types/modules/user'

interface IUserSetupProfileInfoFormProps {
  data?: IUserSetupInfo
  onSubmit: (values: IUserSetupInfo) => void
}

const initialValues: IUserSetupInfo = { email: '', tel: '', nameEn: '', nameTh: '' }

const UserSetupProfileInfoForm: FC<IUserSetupProfileInfoFormProps> = ({ data = initialValues, onSubmit }) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()

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
    initialValues: {
      ...data,
      email: profile?.email ?? '',
    },
    validationSchema,
    enableReinitialize: !!profile,
    onSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit} className={clsx(`flex flex-col`)}>
      <UserTitle className={clsx(`text-center`)}>{i18n._(t`ข้อมูลเกี่ยวกับบัญชี`)}</UserTitle>

      <div className={clsx(`mt-6`)}>
        <label htmlFor="nameTh">{i18n._(t`ชื่อ - นามสกุล ภาษาไทย (TH)`)}</label>
        <Input
          id="nameTh"
          name="nameTh"
          className={clsx(`mt-2`)}
          placeholder={i18n._(t`กรอกชื่อ - นามสกุล ภาษาไทย`)}
          onChange={formik.handleChange}
          value={formik.values.nameTh}
          error={getErrorWithTouched(formik, 'nameTh')}
        />
      </div>

      <div className={clsx(`mt-4`)}>
        <label htmlFor="nameEn">{i18n._(t`ชื่อ - นามสกุล ภาษาอังกฤษ (EN)`)}</label>
        <Input
          id="nameEn"
          name="nameEn"
          className={clsx(`mt-2`)}
          placeholder={i18n._(t`กรอกชื่อ - นามสกุล ภาษาอังกฤษ`)}
          onChange={formik.handleChange}
          value={formik.values.nameEn}
          error={getErrorWithTouched(formik, 'nameEn')}
        />
      </div>

      <div className={clsx(`mt-4`)}>
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
        />
      </div>

      <div className={clsx(`mt-4`)}>
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
          disabled={!!profile?.email}
        />
      </div>

      <Button variant="primary" type="submit" className={clsx(`mt-6 w-full`)}>
        <span>{i18n._(t`ดำเนินการต่อ`)}</span>
      </Button>
    </form>
  )
}

export default UserSetupProfileInfoForm
