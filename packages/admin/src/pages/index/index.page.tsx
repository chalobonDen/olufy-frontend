import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { AuthErrorCodes } from 'firebase/auth'
import { toast } from 'react-hot-toast'
import { Button, Card, Input } from '@olufy-frontend/shared/UI'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'

import { AuthService } from '@/services'

import type { IAuthEventError, IAuthLoginParams } from '@/types/auth'

interface IFormValues {
  email: string
  password: string
}

export const Page = () => {
  const { i18n } = useLingui()

  const initialValues: IFormValues = { email: '', password: '' }

  const validationSchema = yup.object().shape({
    email: yup.string().required(t`กรุณากรอกชื่อบัญชีเข้าใช้งาน`),
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
        toast.error(i18n._(t`ชื่อบัญชีหรือรหัสผ่านไม่ถูกต้อง`))
      } else {
        toast.error(error.code)
      }
    },
  })

  return (
    <div
      style={{
        backgroundImage: `url(/images/login-bg.jpg)`,
      }}
      className={clsx(`flex w-full items-center justify-center bg-cover bg-bottom px-4 text-dark-500 h-screen`)}
    >
      <Card
        className={clsx(`flex w-[547px] max-w-full flex-col items-center justify-center !bg-white-900 p-8`, `sm:px-6`)}
      >
        <form className={clsx(`w-full`)} onSubmit={formik.handleSubmit}>
          <h1 className={clsx(`text-center text-header-2`)}>{i18n._(t`เข้าสู่ระบบ`)}</h1>

          <div className={clsx(`mt-6`)}>
            <label htmlFor="email">{i18n._(t`ชื่อบัญชีเข้าใช้งาน`)}</label>
            <Input
              id="email"
              name="email"
              className={clsx(`no-dark mt-2`)}
              placeholder={i18n._(t`กรอกชื่อบัญชีเข้าใช้งาน`)}
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
              className={clsx(`no-dark mt-2`)}
              placeholder={i18n._(t`กรอกรหัสผ่าน`)}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={getErrorWithTouched(formik, 'password')}
              disabled={isLoading}
            />
          </div>

          <Button variant="primary" type="submit" className={clsx(`mt-6 w-full`)} loading={isLoading}>
            {i18n._(t`เข้าสู่ระบบ`)}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export const guestOnly = true
