import { Trans, t } from '@lingui/macro'
import clsx from 'clsx'
import { Input, SvgIcon } from '@olufy-frontend/shared/UI'
import { useFormik } from 'formik'
import { useLingui } from '@lingui/react'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'
import 'yup-phone'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import UserContainer from '@/components/UI/User/Container'
import UserTitle from '@/components/UI/User/Title'
import UserCard from '@/components/UI/User/Card'
import { UserService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'
import Button from '@/components/Button'

import type { IUserContact } from '@/types/modules/user'

const getContactInfo = () => [
  {
    iconName: 'contact-call',
    title: t`สายด่วน`,
    content: `02 041 9991`,
  },
  {
    iconName: 'contact-message',
    title: t`ส่งอีเมลถึงเรา`,
    content: `info@olufy.com`,
  },
  {
    iconName: 'contact-home',
    title: t`ที่อยู่`,
    content: t`138/37 ซอย ลาดพร้าว 41 แยก 6-9 ถนนลาดพร้าว แขวงจันทรเกษม เขตจตุจักร กรุงเทพมหานคร 10230`,
  },
]

const UserContactFormSection = () => {
  const { i18n } = useLingui()

  const initialValues: IUserContact = { name: '', email: '', message: '', tel: '', title: '' }

  const validationSchema = yup.object().shape({
    name: yup.string().required(t`กรุณากรอกชื่อ - นามสกุล`),
    email: yup
      .string()
      .email(t`อีเมลไม่ถูกต้อง`)
      .required(t`กรุณากรอกอีเมล`),
    message: yup.string().required(t`กรุณากรอกข้อความ`),
    title: yup.string().required(t`กรุณากรอกหัวเรื่อง`),
    tel: yup
      .string()
      .phone('TH', true, t`ต้องเป็นหมายเลขโทรศัพท์ที่ถูกต้องสำหรับภูมิภาค TH`)
      .required(t`กรุณากรอกเบอร์โทรศัพท์มือถือ`),
  })

  // _Mutation
  const { mutate, isLoading } = useMutation((payload: IUserContact) => UserService.sendContact(payload), {
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
    },
    onSuccess: () => {
      toast.success(i18n._(t`ส่งข้อความสำเร็จ`))
      formik.resetForm()
    },
  })

  // _Form
  const formik = useFormik<IUserContact>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      mutate(values)
    },
  })

  return (
    <section className={clsx(`py-12`)}>
      <UserContainer className={clsx(`grid grid-cols-3 gap-6`, `2xl:gap-4`, `sm:grid-cols-1`)}>
        {getContactInfo().map((item, itemIdx) => (
          <UserCard key={itemIdx} className={clsx(`sm:flex sm:items-center sm:space-x-4`)}>
            <SvgIcon name={item.iconName} className={clsx(`text-primary-500 square-20`, `lg:square-16`)} />
            <div className={clsx(`mt-3 flex-1`, `sm:mt-0`)}>
              <div className={clsx(`text-header-3`)}>{item.title}</div>
              <p className={clsx(`desc`)}>{item.content}</p>
            </div>
          </UserCard>
        ))}
      </UserContainer>

      <UserContainer className={clsx(`mt-12`)}>
        <UserTitle className={clsx(`text-center`)}>
          <Trans>
            เราพร้อมที่จะช่วยเหลือคุณ
            <br />
            ส่งข้อความถึงเรา
          </Trans>
        </UserTitle>

        <form onSubmit={formik.handleSubmit} className={clsx(`mx-auto mt-8 w-[922px] max-w-full`)}>
          <div className={clsx(`grid grid-cols-2 gap-6`, `2xl:gap-4`, `sm:grid-cols-1`)}>
            <div>
              <label htmlFor="name">{i18n._(t`ชื่อ - นามสกุล`)}</label>
              <Input
                id="name"
                name="name"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกชื่อ - นามสกุล`)}
                onChange={formik.handleChange}
                value={formik.values.name}
                disabled={isLoading}
                error={getErrorWithTouched(formik, 'name')}
              />
            </div>
            <div>
              <label htmlFor="email">{i18n._(t`อีเมล`)}</label>
              <Input
                id="email"
                name="email"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกอีเมล`)}
                onChange={formik.handleChange}
                value={formik.values.email}
                disabled={isLoading}
                error={getErrorWithTouched(formik, 'email')}
              />
            </div>
            <div>
              <label htmlFor="tel">{i18n._(t`เบอร์โทรศัพท์มือถือ`)}</label>
              <Input
                id="tel"
                name="tel"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกเบอร์โทรศัพท์มือถือ`)}
                onChange={formik.handleChange}
                value={formik.values.tel}
                disabled={isLoading}
                error={getErrorWithTouched(formik, 'tel')}
              />
            </div>
            <div>
              <label htmlFor="title">{i18n._(t`หัวเรื่อง`)}</label>
              <Input
                id="title"
                name="title"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกหัวเรื่อง`)}
                onChange={formik.handleChange}
                value={formik.values.title}
                disabled={isLoading}
                error={getErrorWithTouched(formik, 'title')}
              />
            </div>
          </div>

          <div className={clsx(`mt-6`, `2xl:mt-4`)}>
            <label htmlFor="message">{i18n._(t`ข้อความ`)}</label>
            <Input.TextArea
              id="message"
              name="message"
              className={clsx(`mt-2`)}
              textAreaClassName={clsx(`!min-h-[150px]`)}
              placeholder={i18n._(t`เขียนข้อความ`)}
              onChange={formik.handleChange}
              value={formik.values.message}
              disabled={isLoading}
              error={getErrorWithTouched(formik, 'message')}
            />
          </div>

          <div className={clsx(`text-center`)}>
            <Button variant="primary" type="submit" className={clsx(`mt-6 w-[234px] max-w-full`)} loading={isLoading}>
              {i18n._(t`ส่งข้อความ`)}
            </Button>
          </div>
        </form>
      </UserContainer>
    </section>
  )
}

export default UserContactFormSection
