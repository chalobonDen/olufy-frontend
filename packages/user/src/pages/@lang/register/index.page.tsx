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
import { AuthService, UserService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'
import { useAuthStore } from '@/stores/auth'
import type { DocumentProps } from '@/renderer/types'
import Link from '@/components/Link'
import Button from '@/components/Button'
import useRouter from '@/hooks/useRouter'

import { Layout } from '@/enums'
import type { IAuthEventError, IAuthRegisterParams } from '@/types/auth'

interface IFormValues {
  email: string
  password: string
  confirmPassword: string
}

const initialValues: IFormValues = { email: '', password: '', confirmPassword: '' }

export const Page = () => {
  const { i18n } = useLingui()
  const { login } = useAuthStore()
  const { push } = useRouter()

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t`อีเมลไม่ถูกต้อง`)
      .required(t`กรุณากรอกอีเมล`),
    password: yup.string().required(t`กรุณากรอกรหัสผ่าน`),
    confirmPassword: yup
      .string()
      .required(t`กรุณากรอกยืนยันรหัสผ่าน`)
      .oneOf([yup.ref('password'), null], t`รหัสผ่านไม่ตรงกัน`),
  })

  // _Form
  const formik = useFormik<IFormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      registerMutate({
        email: values.email,
        password: values.password,
      })
    },
  })

  // _Mutation
  const { mutateAsync: getUserMutate, isLoading: isGetUserLoading } = useMutation(() => UserService.me(), {
    onError: (error) => {
      const msg = handleAxiosErrorMsg(error)
      toast.error(msg)
    },
    onSuccess: () => {
      push(`/setup-profile`)
    },
  })

  const { mutate: registerMutate, isLoading: isRegisterLoading } = useMutation(
    (params: IAuthRegisterParams) => AuthService.registerEmail(params),
    {
      onError: (error: IAuthEventError) => {
        if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
          formik.setFieldValue('password', '')
          formik.setFieldValue('confirmPassword', '')
          toast.error(i18n._(t`อีเมลนี้ถูกใช้ไปแล้ว`))
        } else {
          toast.error(error.code)
        }
      },
      onSuccess: async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        await getUserMutate()

        login({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      },
    },
  )

  const isLoading = isGetUserLoading || isRegisterLoading

  return (
    <UserCard className={clsx(`flex w-[547px] max-w-full flex-col p-8`, `sm:px-4`)}>
      <form onSubmit={formik.handleSubmit} className={clsx(`flex flex-col`)}>
        <UserTitle className={clsx(`text-center`)}>{i18n._(t`สมัครสมาชิก`)}</UserTitle>

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

        <div className={clsx(`mt-4`)}>
          <label htmlFor="confirmPassword">{i18n._(t`ยืนยันรหัสผ่าน`)}</label>
          <Input.Password
            id="confirmPassword"
            name="confirmPassword"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกรหัสผ่านอีกครั้ง`)}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            error={getErrorWithTouched(formik, 'confirmPassword')}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" variant="primary" className={clsx(`mt-6 w-full`)} loading={isLoading}>
          <span>{i18n._(t`สมัครสมาชิก`)}</span>
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

export const documentProps: DocumentProps = {
  title: t`สมัครสมาชิก`,
}
