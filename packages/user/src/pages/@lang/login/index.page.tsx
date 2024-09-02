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
import type { DocumentProps } from '@/renderer/types'
import Link from '@/components/Link'
import Button from '@/components/Button'

import { Layout } from '@/enums'
import type { IAuthEventError, IAuthLoginParams } from '@/types/auth'

interface IFormValues {
  email: string
  password: string
}

export const Page = () => {
  const { i18n } = useLingui()

  const initialValues: IFormValues = { email: '', password: '' }

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t`อีเมลไม่ถูกต้อง`)
      .required(t`กรุณากรอกอีเมล`),
    password: yup.string().required(t`กรุณากรอกรหัสผ่าน`),
  })

  // _Form
  const formik = useFormik<IFormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      mutate(values)
    },
  })

  // _Mutation
  const { mutate, isLoading } = useMutation((params: IAuthLoginParams) => AuthService.login(params), {
    onError: (error: IAuthEventError) => {
      if (error.code === AuthErrorCodes.INVALID_PASSWORD || error.code === AuthErrorCodes.USER_DELETED) {
        toast.error(i18n._(t`อีเมลหรือรหัสผ่านไม่ถูกต้อง`))
      } else {
        toast.error(error.code)
      }
    },
  })

  return (
    <UserCard className={clsx(`flex w-[547px] max-w-full flex-col p-8`, `sm:px-4`)}>
      <form onSubmit={formik.handleSubmit} className={clsx(`flex flex-col`)}>
        <UserTitle className={clsx(`text-center`)}>{i18n._(t`เข้าสู่ระบบ`)}</UserTitle>

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

        <div className={clsx(`mt-4`)}>
          <label htmlFor="password">{i18n._(t`รหัสผ่าน`)}</label>
          <Input.Password
            id="password"
            name="password"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกรหัสผ่าน`)}
            onChange={formik.handleChange}
            value={formik.values.password}
            error={getErrorWithTouched(formik, 'password')}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" variant="primary" className={clsx(`mt-6 w-full`)} loading={isLoading}>
          <span>{i18n._(t`เข้าสู่ระบบ`)}</span>
        </Button>
      </form>

      <Link href="/forgot-password" className={clsx(`mt-2 self-end text-body-14 text-primary-500`)}>
        {i18n._(t`ลืมรหัสผ่าน`)}
      </Link>

      <Divider className={clsx(`mt-6`)}>{i18n._(t`หรือ`)}</Divider>

      <UserSocialLogin />

      <div className={clsx(`mt-4 space-x-2 self-center`)}>
        <span className={clsx(`text-white-400`)}>{i18n._(t`ไม่มีบัญชี?`)}</span>
        <Link href="/register" className={clsx(`font-medium text-primary-500`)}>
          {i18n._(t`สมัครสมาชิกที่นี่?`)}
        </Link>
      </div>
    </UserCard>
  )
}

export const layout = Layout.LOGIN
export const guestOnly = true

export const documentProps: DocumentProps = {
  title: t`เข้าสู่ระบบ`,
}
