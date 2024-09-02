import type { FC } from 'react'
import { Fragment } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Button, Card, Checkbox, Input } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'

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

const DomainClientSearchForm: FC<IDomainSearchFormProps> = ({ onSubmit }) => {
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
    <Fragment>
      <Checkbox
        className={clsx(`items-center`)}
        checked={true}
        onChange={() => {
          //
        }}
        disabled={true}
      >
        <span className={clsx(`text-header-4`)}>{i18n._(t`Register a new domain`)}</span>
      </Checkbox>

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
              className={clsx(`px-0`)}
              name="name"
              placeholder={i18n._(t`ค้นหาชื่อโดเมน`)}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={getErrorWithTouched(formik, 'name')}
              prefix={<div className={clsx(`border-r px-3 py-2 font-light dark:border-dark-300`)}>WWW</div>}
              suffix={
                <div className={clsx(`w-[120px] max-w-full border-l dark:border-dark-300`, `sm:w-[80px]`)}>
                  <Input.Select name="domain" className={clsx(`border-none`)} onChange={formik.handleChange}>
                    {Object.values(Domain).map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </Input.Select>
                </div>
              }
            />
          </div>
        </div>

        <Button variant="success" className={clsx(`min-h-[44px]`)} type="submit">
          <span>{i18n._(t`CHECK`)}</span>
        </Button>
      </form>
    </Fragment>
  )
}

export default DomainClientSearchForm
