import type { FC } from 'react'
import { Fragment, useState } from 'react'

import { useLingui } from '@lingui/react'
import * as yup from 'yup'
import { t } from '@lingui/macro'
import { useMutation } from '@tanstack/react-query'
import { random, sample } from 'lodash-es'
import { useFormik } from 'formik'
import clsx from 'clsx'
import { Button, Card, Checkbox, Input, Loader, SvgIcon } from '@olufy-frontend/shared/UI'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'

import type { IDomainDataRecommend } from '@/pages/@lang/app/hosting/packages/@id/index.page'

enum Domain {
  COM = 'COM',
  NET = 'NET',
  US = 'US',
  ORG = 'ORG',
}

interface IExistingDomainFormProps {
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

export const ExistingDomainForm: FC<IExistingDomainFormProps> = ({ className, onSelected, isSelect, onContinue }) => {
  const { i18n } = useLingui()

  const validationSchema = yup.object().shape({
    name: yup.string().required(t`กรุณากรอกชื่อโดเมน`),
  })

  const initialValues: IFormValues = { name: '', domain: Domain.COM }

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

  // _Form
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      searchDomains(values)
      setSearchQuery(`${values.name}.${values.domain}`)
    },
  })

  return (
    <Fragment>
      <Card className={clsx(`${className}`)}>
        <Checkbox
          className={clsx(`items-center`)}
          checked={isSelect === 'existing'}
          onChange={() => onSelected('existing')}
        >
          <span className={clsx(`text-header-4`)}>
            {i18n._(t`I will use my existing domain and update my nameservers`)}
          </span>
        </Checkbox>

        {isSelect === 'existing' && (
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
                <Fragment>
                  <div
                    className={clsx(
                      `mt-4 flex items-center justify-between rounded-lg border border-success px-4 py-2`,
                      `sm:flex-col sm:space-y-2`,
                      {
                        '!border-success bg-success/10 text-success': domains?.status === 'ready',
                        '!border-error bg-error/10 text-error': domains?.status === 'notReady',
                      },
                    )}
                  >
                    <div className={clsx(`flex items-start space-x-2`, `sm:items-start`)}>
                      <SvgIcon name="check" className={clsx(`min-h-[24px] min-w-[24px] square-6`)} />
                      <span className={clsx(`text-body-16 font-light`, `lg:text-body-14`)}>
                        {domains?.status === 'ready'
                          ? i18n._(t`${searchQuery} สามารถใช้งานได้`)
                          : i18n._(t`${searchQuery} Not Eligible for Transfer he domain you entered does not appear to be registered.
If the domain was registered recently, you may need to try again later.
Alternatively, you can perform a search to register this domain.`)}
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
                </Fragment>
              )}
            </div>
          </Fragment>
        )}
      </Card>
    </Fragment>
  )
}
