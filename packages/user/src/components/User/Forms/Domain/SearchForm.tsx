import type { FC } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { Input } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'

import UserCard from '@/components/UI/User/Card'
import Button from '@/components/Button'

enum Domain {
  COM = 'COM',
  NET = 'NET',
  US = 'US',
  ORG = 'ORG',
}

interface IFormValues {
  name: string
  domain: Domain
}

interface IDomainSearchFormProps {
  onSubmit?: (value: IFormValues) => void
}

const DomainSearchForm: FC<IDomainSearchFormProps> = ({ onSubmit }) => {
  const { i18n } = useLingui()

  const initialValues: IFormValues = { name: '', domain: Domain.COM }

  const validationSchema = yup.object().shape({
    name: yup.string().required(t`กรุณากรอกชื่อโดเมน`),
  })

  // _Form
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => onSubmit?.(values),
  })

  return (
    <UserCard>
      <h4 className={clsx(`text-body-24 text-primary-500`)}>{i18n._(t`จดทะเบียนโดเมนใหม่`)}</h4>
      <form
        className={clsx(
          `mt-4 flex items-start justify-between space-x-2`,
          'sm:flex-col sm:items-stretch sm:space-x-0 sm:space-y-2',
        )}
        onSubmit={formik.handleSubmit}
      >
        <div className={clsx(`flex flex-1 space-x-2`)}>
          <div className={clsx(`flex-1`)}>
            <Input
              name="name"
              placeholder={i18n._(t`ค้นหาชื่อโดเมน`)}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={getErrorWithTouched(formik, 'name')}
            />
          </div>
          <div className={clsx(`w-[125px] max-w-full`, `sm:w-[86px]`)}>
            <Input.Select name="domain" onChange={formik.handleChange}>
              {Object.values(Domain).map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </Input.Select>
          </div>
        </div>

        <Button variant="primary" type="submit">
          <span>{i18n._(t`ตรวจสอบ`)}</span>
        </Button>
      </form>
    </UserCard>
  )
}

export default DomainSearchForm
