import type { FC } from 'react'
import { Fragment, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Card, Checkbox, Divider, Input, Loader, SvgIcon } from '@olufy-frontend/shared/UI'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { random, sample } from 'lodash-es'
import * as yup from 'yup'

import Button from '@/components/Button'
import type { IDomainDataRecommend } from '@/pages/@lang/app/hosting/packages/@id/index.page'

enum Domain {
  COM = 'COM',
  NET = 'NET',
  US = 'US',
  ORG = 'ORG',
}

interface ITransferDomainFormProps {
  className?: string
  onSelected: (e: string) => void
  isSelect: string
  onContinue: (e?: any) => void
}

interface IFormValues {
  name: string
  domain: Domain
}

interface IFormDomainKeyValues {
  domainKey: string
}

interface IDomainChecked {
  status: 'ready' | 'notReady'
  items: IDomainDataRecommend[]
}

const TransferDomainForm: FC<ITransferDomainFormProps> = ({ className, onSelected, isSelect, onContinue }) => {
  const { i18n } = useLingui()

  const initialValues: IFormValues = { name: '', domain: Domain.COM }
  const initialDomainKeyValues: IFormDomainKeyValues = { domainKey: '' }

  const validationSchema = yup.object().shape({
    name: yup.string().required(t`กรุณากรอกชื่อโดเมน`),
  })

  const validateDomainKey = yup.object().shape({
    domainKey: yup.string().required(t`กรุณากรอก Domian Key`),
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

  // _Form
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      searchDomains(values)
      setSearchQuery(`${values.name}.${values.domain}`)
    },
  })

  const formikDomainKey = useFormik({
    initialValues: initialDomainKeyValues,
    validationSchema: validateDomainKey,
    onSubmit: (values) => {
      onContinue()
    },
  })

  return (
    <Fragment>
      <Card className={clsx(`${className}`)}>
        <Checkbox
          className={clsx(`items-center`)}
          checked={isSelect === 'transfer'}
          onChange={() => onSelected('transfer')}
        >
          <span className={clsx(`text-header-4`)}>{i18n._(t`Transfer your domain from another registrar`)}</span>
        </Checkbox>

        {isSelect === 'transfer' && (
          <Fragment>
            <form
              className={clsx(
                `mt-4 flex items-start justify-between space-x-2`,
                'sm:flex-col sm:items-stretch sm:space-x-0 sm:space-y-2',
              )}
              onSubmit={formik.handleSubmit}
            >
              <div className={clsx(`flex flex-1 items-end space-x-2`)}>
                <div className={clsx(`flex-1`)}>
                  <label htmlFor="search">{i18n._(t`Transfer your domain from another registrar`)}</label>
                  <Input
                    id="search"
                    className={clsx(`mt-2 px-0`)}
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
                <Button variant="success" className={clsx(`min-h-[44px]`)} type="submit">
                  <span>{i18n._(t`CHECK`)}</span>
                </Button>
              </div>
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
                          ? i18n._(t`${searchQuery} สามารโอนย้ายได้ กรุณาใส่ Domian Key`)
                          : i18n._(t`${searchQuery} Not Eligible for Transfer he domain you entered does not appear to be registered.
If the domain was registered recently, you may need to try again later.
Alternatively, you can perform a search to register this domain.`)}
                      </span>
                    </div>
                  </div>

                  {domains?.status === 'ready' && (
                    <form onSubmit={formikDomainKey.handleSubmit}>
                      <h3 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`Domian Key`)}</h3>
                      <Divider className={clsx(`mt-4`)} />
                      <div className={clsx(`mt-4`)}>
                        <label htmlFor="domainKey">{i18n._(t`Domian Key`)}</label>
                        <Input
                          id="domainKey"
                          className={clsx(`mt-2`)}
                          name="domainKey"
                          placeholder={i18n._(t`Domian Key`)}
                          value={formikDomainKey.values.domainKey}
                          onChange={formikDomainKey.handleChange}
                          error={getErrorWithTouched(formikDomainKey, 'domainKey')}
                        />
                      </div>

                      <Button variant="success" size="medium" type="submit" className={clsx(`mt-4 w-full`)}>
                        {i18n._(t`Continue`)}
                      </Button>
                    </form>
                  )}
                </Fragment>
              )}
            </div>
          </Fragment>
        )}
      </Card>
    </Fragment>
  )
}

export default TransferDomainForm
