import { Fragment, useCallback, useEffect, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useFormik } from 'formik'
import clsx from 'clsx'
import { Button, Card, Checkbox, Divider, Input } from '@olufy-frontend/shared/UI'
import { formatPrice, getErrorWithTouched } from '@olufy-frontend/shared/utils'

import type { DocumentProps } from '@/renderer/types'
import { usePageContext } from '@/hooks/usePageContext'
import BackButton from '@/components/Client/Buttons/BackButton'
import useRouter from '@/hooks/useRouter'

interface IDomainSetup {
  paymentCycle: number
  idnLanguage: string
  addon: number
  serverNameFirst: string
  serverNameSecond: string
  serverNameThird: string
}

const MOCK_PAYMENT_CYCLE = [
  {
    label: '1,000.00 บาท ต่อ 1 เดือน',
    value: 1000,
  },
  {
    label: '2,000.00 บาท ต่อ 1 เดือน',
    value: 2000,
  },
]

const MOCK_LANGUAGE = [
  {
    label: 'THA',
    value: 'THA',
  },
  {
    label: 'ENGLISH',
    value: 'ENGLISH',
  },
]

const MOCK_ADDON = [
  {
    label: '150.00 บาท 1 ปี',
    value: 150,
  },
  {
    label: '500.00 บาท 1 ปี',
    value: 500,
  },
]

export const Page = () => {
  const { i18n } = useLingui()
  const { push } = useRouter()

  // _State
  const [isAddon, setIsAddon] = useState(false)
  const {
    routeParams,
    urlParsed: { search },
  } = usePageContext()

  // _Form
  const formik = useFormik<IDomainSetup>({
    initialValues: {
      paymentCycle: parseInt(search?.paymentCycle) || MOCK_PAYMENT_CYCLE[0].value,
      idnLanguage: search?.idnLanguage || MOCK_LANGUAGE[0].value,
      addon: null,
      serverNameFirst: search?.serverNameFirst || '',
      serverNameSecond: search?.serverNameSecond || '',
      serverNameThird: search?.serverNameThird || '',
    },
    // validationSchema,
    onSubmit: (values) => {
      const newValues = values
      const params = new URLSearchParams()
      Object.entries(newValues).forEach(([key, value]) => {
        if (value) params.set(key, value)
      })

      push(`/app/domain/packages/${routeParams?.id}/order?${params}`)
    },
  })

  // _Callbacks
  const setDefualtValue = useCallback(() => {
    if (search.addon) setIsAddon((state) => !state)
    Object.entries(search).forEach(([key, value]) => {
      return formik.setFieldValue(key, value)
    })
  }, [formik, search])

  // _Effects
  useEffect(() => {
    if (search) setDefualtValue()
  }, [])

  return (
    <Fragment>
      <BackButton as="a" href="/app/domain/packages" />

      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`Domain`)}</h3>
      <div
        className={clsx(
          `mt-6 grid grid-cols-[2fr_1fr] gap-4`,
          `2xl:grid-cols-[1fr_390px]`,
          `lg:grid-cols-[1fr_370px]`,
          `sm:grid-cols-1`,
        )}
      >
        <form className={clsx(`space-y-4`)}>
          <Card title={i18n._(t`ตั้งค่าสินค้าและบริการ`)} hasDivider>
            <div>
              <h4 className={clsx(`text-header-4`)}>{i18n._(t`รอบชำระค่าบริการ`)}</h4>

              <div className={clsx(`mt-2`)}>
                <label htmlFor="paymentCycle" className={clsx(`font-light`)}>
                  {i18n._(t`เลือกรอบชำระค่าบริการ`)}
                </label>
                <div className={clsx(`mt-2`)}>
                  <Input.Select
                    id="paymentCycle"
                    name="paymentCycle"
                    onChange={formik.handleChange}
                    error={getErrorWithTouched(formik, 'paymentCycle')}
                    value={formik.values.paymentCycle}
                  >
                    {Object.values(MOCK_PAYMENT_CYCLE).map((cycle, idx) => (
                      <option key={idx} value={cycle.value}>
                        {cycle.label}
                      </option>
                    ))}
                  </Input.Select>
                </div>
                <Divider />
              </div>
            </div>
            <div>
              <h4 className={clsx(`text-header-4`)}>{i18n._(t`IDN Language`)}</h4>

              <div className={clsx(`mt-2`)}>
                <label htmlFor="idnLanguage" className={clsx(`font-light`)}>
                  {i18n._(t`IDN Language`)}
                </label>
                <div className={clsx(`mt-2`)}>
                  <Input.Select
                    id="idnLanguage"
                    name="idnLanguage"
                    onChange={formik.handleChange}
                    error={getErrorWithTouched(formik, 'idnLanguage')}
                    value={formik.values.idnLanguage}
                  >
                    {Object.values(MOCK_LANGUAGE).map((lang, idx) => (
                      <option key={idx} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </Input.Select>
                </div>
                <Divider />
              </div>
            </div>
          </Card>
          <Card>
            <div>
              <h4 className={clsx(`text-header-4`)}>{i18n._(t`Addons`)}</h4>

              <div className={clsx(`mt-2`)}>
                <Checkbox
                  className={clsx(`mt-4 self-center`)}
                  checked={isAddon}
                  onChange={() => {
                    setIsAddon((e) => !e)
                    if (!isAddon) {
                      formik.setFieldValue('addon', MOCK_ADDON[0].value)
                    } else {
                      formik.setFieldValue('addon', null)
                    }
                  }}
                >
                  <span className={clsx(`text-body-16 font-light`)}>
                    {i18n._(t`3,500 THB/monthly (Guarantee 1,000 Mbps)`)}
                  </span>
                </Checkbox>
                <div className={clsx(`mt-2`)}>
                  <Input.Select
                    id="addon"
                    name="addon"
                    disabled={!isAddon}
                    onChange={formik.handleChange}
                    error={getErrorWithTouched(formik, 'addon')}
                    value={formik.values.addon || ''}
                  >
                    {Object.values(MOCK_ADDON).map((addon, idx) => (
                      <option key={idx} value={addon.value}>
                        {addon.label}
                      </option>
                    ))}
                  </Input.Select>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div>
              <h4 className={clsx(`text-header-4`)}>{i18n._(t`ตั้งค่าเซิร์ฟเวอร์`)}</h4>

              <div className={clsx(`mt-2`)}>
                <label htmlFor="serverNameFirst" className={clsx(`font-light`)}>
                  {i18n._(t`ชื่อเซิร์ฟเวอร์ 1`)}
                </label>
                <div className={clsx(`mt-2`)}>
                  <Input
                    id="serverNameFirst"
                    name="serverNameFirst"
                    className={clsx(`mt-2`)}
                    placeholder={i18n._(t`กรอกชื่อเซิร์ฟเวอร์`)}
                    onChange={formik.handleChange}
                    value={formik.values.serverNameFirst}
                    error={getErrorWithTouched(formik, 'serverNameFirst')}
                  />
                </div>
              </div>
              <div className={clsx(`mt-4`)}>
                <label htmlFor="serverNameSecond" className={clsx(`font-light`)}>
                  {i18n._(t`ชื่อเซิร์ฟเวอร์ 2`)}
                </label>
                <div className={clsx(`mt-2`)}>
                  <Input
                    id="serverNameSecond"
                    name="serverNameSecond"
                    className={clsx(`mt-2`)}
                    placeholder={i18n._(t`กรอกชื่อเซิร์ฟเวอร์`)}
                    onChange={formik.handleChange}
                    value={formik.values.serverNameSecond}
                    error={getErrorWithTouched(formik, 'serverNameSecond')}
                  />
                </div>
              </div>
              <div className={clsx(`mt-4`)}>
                <label htmlFor="serverNameThird" className={clsx(`font-light`)}>
                  {i18n._(t`ชื่อเซิร์ฟเวอร์ 3`)}
                </label>
                <div className={clsx(`mt-2`)}>
                  <Input
                    id="serverNameThird"
                    name="serverNameThird"
                    className={clsx(`mt-2`)}
                    placeholder={i18n._(t`กรอกชื่อเซิร์ฟเวอร์`)}
                    onChange={formik.handleChange}
                    value={formik.values.serverNameThird}
                    error={getErrorWithTouched(formik, 'serverNameThird')}
                  />
                </div>
              </div>
            </div>
          </Card>
        </form>
        <Card className={clsx(`h-fit`)}>
          <div>
            <h3 className={clsx(`text-center text-header-3`)}>{i18n._(t`สรุปการสั่งซื้อ`)}</h3>
            <Divider className={clsx(`my-4`)} />

            <div className={clsx(`flex items-center justify-between`)}>
              <span className={clsx(`text-body-16`)}>Register a new domain</span>
              <span className={clsx(`text-right text-header-5`)}>
                {formatPrice(350)} THB/{i18n._(t`Yearly`)}
              </span>
            </div>
            <div className={clsx(`mt-2`)}>
              <div className={clsx(`text-body-16`)}>www.Toon333.com</div>
            </div>

            <Divider className={clsx(`my-4`)} />
            <div className={clsx(`text-header-4`)}>{i18n._(t`ค่าบริการรวม`)}</div>
            <div className={clsx(`text-right text-header-2 text-primary-500`)}>{formatPrice(350)} THB</div>

            <Button variant="success" type="submit" className={clsx(`mt-4 w-full`)} onClick={() => formik.submitForm()}>
              <span>{i18n._(t`Continue`)}</span>
            </Button>
          </div>
        </Card>
      </div>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Domain`,
}
