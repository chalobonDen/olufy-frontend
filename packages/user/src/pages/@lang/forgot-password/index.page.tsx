import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Divider, Input } from '@olufy-frontend/shared/UI'
import { useMutation } from '@tanstack/react-query'
import { AuthErrorCodes } from 'firebase/auth'
import { toast } from 'react-hot-toast'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'

import UserCard from '@/components/UI/User/Card'
import UserTitle from '@/components/UI/User/Title'
import UserSocialLogin from '@/components/User/SocialLogin'
import { AuthService } from '@/services'
import Link from '@/components/Link'
import Button from '@/components/Button'

import { Layout } from '@/enums'
import type { IAuthEventError } from '@/types/auth'

interface IFormValues {
  email: string
}

const initialValues: IFormValues = { email: '' }

export const Page = () => {
  const { i18n } = useLingui()

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t`อีเมลไม่ถูกต้อง`)
      .required(t`กรุณากรอกอีเมล`),
  })

  // _Form
  const formik = useFormik<IFormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      mutate(values.email)
      formik.resetForm()
    },
  })

  // _Mutation
  const { mutate, isLoading } = useMutation((email: string) => AuthService.sendResetPassword(email), {
    onError: (error: IAuthEventError) => {
      if (error.code === AuthErrorCodes.USER_DELETED) {
        toast.error(i18n._(t`อีเมลไม่ถูกต้อง`))
      } else {
        toast.error(error.code)
      }
    },
    onSuccess: () => {
      toast.success(i18n._(t`โปรดตรวจสอบอีเมลของท่าน`))
    },
  })

  return (
    <UserCard className={clsx(`flex w-[547px] max-w-full flex-col p-8`, `sm:px-4`)}>
      <form onSubmit={formik.handleSubmit} className={clsx(`flex flex-col`)}>
        <UserTitle className={clsx(`text-center`)}>{i18n._(t`ลืมรหัสผ่าน`)}</UserTitle>

        <div className={clsx(`mt-6`)}>
          <label htmlFor="email">{i18n._(t`อีเมล`)}</label>
          <Input
            id="email"
            name="email"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกอีเมล`)}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={getErrorWithTouched(formik, 'email')}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" variant="primary" className={clsx(`mt-6 w-full`)} loading={isLoading}>
          <span>{i18n._(t`ดำเนินการ`)}</span>
        </Button>
      </form>

      <Divider className={clsx(`mt-6`)}>{i18n._(t`หรือ`)}</Divider>

      <UserSocialLogin />

      <div className={clsx(`mt-4 space-x-2 self-center`)}>
        <span className={clsx(`text-white-400`)}>{i18n._(t`มีบัญชีอยู่แล้ว?`)}</span>
        <Link href="/login" className={clsx(`font-medium text-primary-500`)}>
          {i18n._(t`เข้าสู่ระบบ`)}
        </Link>
      </div>
    </UserCard>
  )
}

export const layout = Layout.LOGIN
export const guestOnly = true
