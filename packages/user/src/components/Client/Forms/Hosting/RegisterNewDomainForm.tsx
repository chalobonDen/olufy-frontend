import type { FC } from 'react'
import { Fragment, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Card, Checkbox, Divider, Input, Loader, SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { formatPrice, getErrorWithTouched } from '@olufy-frontend/shared/utils'
import { useMutation } from '@tanstack/react-query'
import { random, sample } from 'lodash-es'

import Button from '@/components/Button'
import type { IDomainDataRecommend } from '@/pages/@lang/app/hosting/packages/@id/index.page'

enum Domain {
  COM = 'COM',
  NET = 'NET',
  US = 'US',
  ORG = 'ORG',
}

interface IRegisterNewDomainFormProps {
  className?: string
  onSelected: (e: string) => void
  isSelect: string
  onContinue: (e?: any) => void
}

interface IFormValues {
  name: string
  domain: Domain
}

interface IDomainChecked {
  status: 'ready' | 'notReady'
  items: IDomainDataRecommend[]
}

const RegisterNewDomainForm: FC<IRegisterNewDomainFormProps> = ({ className, onSelected, isSelect, onContinue }) => {
  const { i18n } = useLingui()

  const initialValues: IFormValues = { name: '', domain: Domain.COM }

  const validationSchema = yup.object().shape({
    name: yup.string().required(t`กรุณากรอกชื่อโดเมน`),
  })

  // _Form
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      searchDomains(values)
      setSearchQuery(`${values.name}.${values.domain}`)
    },
  })

  // _State
  const [searchQuery, setSearchQuery] = useState<string>(null)

  // _Mutation
  const {
    data: domains,
    mutate: searchDomains,
    isLoading: isDomainsLoading,
  } = useMutation((payload: { name: string; domain: string }) => {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            status: sample(['ready', 'notReady']),
            items: ['COM', 'NET', 'IN', 'US', 'ORG', 'INFO', 'CLOUD'].map(
              (e, idx) =>
                ({
                  id: idx + 1,
                  domain: `.${e}`,
                  name: `${payload.name}.${e}`,
                  price: random(100, 1000),
                } as IDomainDataRecommend),
            ),
          } as IDomainChecked),
        1000,
      )
    }) as Promise<IDomainChecked>
  })

  return (
    <Fragment>
      <Card className={clsx(`${className}`)}>
        <Checkbox
          className={clsx(`items-center`)}
          checked={isSelect === 'new'}
          onChange={() => {
            onSelected('new')
            formik.resetForm()
          }}
        >
          <span className={clsx(`text-header-4`)}>{i18n._(t`Register a new domain`)}</span>
        </Checkbox>

        {isSelect === 'new' && (
          <Fragment>
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

            <div>
              {isDomainsLoading && (
                <div className={clsx(`mt-6 flex items-center justify-center space-x-2`)}>
                  <Loader size={40} />
                  <span className={clsx(`text-body-24 text-primary-500`)}>{i18n._(t`กำลังค้นหา...`)}</span>
                </div>
              )}

              {!isDomainsLoading && domains && (
                <div
                  className={clsx(
                    `mt-4 flex items-center justify-between rounded-lg border border-success px-4 py-2`,
                    `sm:flex-col sm:space-y-2`,
                    {
                      'border-success bg-success/10 text-success': domains?.status === 'ready',
                      '!border-error bg-error/10 text-error': domains?.status === 'notReady',
                    },
                  )}
                >
                  <div className={clsx(`flex items-center space-x-2`, `sm:items-start`)}>
                    <SvgIcon name="check" className={clsx(`min-h-[24px] min-w-[24px] square-6`)} />
                    <span className={clsx(`text-body-16 font-light`, `lg:text-body-16`)}>
                      {domains?.status === 'ready'
                        ? i18n._(t`${searchQuery} สามารถจดทะเบียนได้ Continue to register this domain for 350.00 บาท`)
                        : i18n._(t`เสียใจด้วย! ${searchQuery} ไม่สามารถจดทะเบียนได้`)}
                    </span>
                  </div>
                  {domains.status === 'ready' && (
                    <Button
                      variant="success"
                      size="medium"
                      className={clsx(`w-[166px] !px-4`)}
                      onClick={() => onContinue()}
                    >
                      {i18n._(t`จดทะเบียน`)}
                    </Button>
                  )}
                </div>
              )}

              {(isDomainsLoading || domains) && (
                <div>
                  <h3 className={clsx(`mt-4 pb-2 text-body-20`)}>{i18n._(t`SUGGESTED DOMAINS`)}</h3>
                  <Divider />
                </div>
              )}
              {isDomainsLoading && (
                <div className={clsx(`flex flex-col items-center justify-center py-8`)}>
                  <div className={clsx(`flex items-center justify-center space-x-2`)}>
                    <Loader size={40} />
                    <span className={clsx(`text-body-24 text-primary-500`)}>{i18n._(t`กำลังสร้างข้อเสนอของคุณ`)}</span>
                  </div>
                  <div className={clsx(`mt-4 text-center text-body-16 font-light`)}>
                    {i18n._(
                      t`Domain name suggestions may not always be available. Availability is checked in real-time at the point of adding to the cart.`,
                    )}
                  </div>
                </div>
              )}
              {!isDomainsLoading && (
                <div className={clsx(`overflow-y-hidden`)}>
                  {domains?.items?.map((domain, domainIdx) => (
                    <div
                      key={`domain-${domainIdx}`}
                      className={clsx(
                        `relative inline-flex min-w-full items-center space-x-3 rounded-lg even:bg-primary-100 dark:even:bg-dark-300`,
                      )}
                    >
                      <div className={clsx(`min-w-[170px] flex-1 px-3 py-4`)}>{domain.name}</div>
                      <div className={clsx(`min-w-[170px] px-3 py-4`, `sm:min-w-[90px]`)}>
                        {formatPrice(domain.price)}฿
                      </div>
                      <div className={clsx(`w-[147px] min-w-[190px] px-3 py-4`)}>
                        <Button
                          variant="success"
                          className={clsx(`min-h-[40px] w-full !px-0`)}
                          onClick={() => onContinue()}
                        >
                          {i18n._(t`จดทะเบียน ${domain.domain}`)}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Fragment>
        )}
      </Card>
    </Fragment>
  )
}

export default RegisterNewDomainForm
