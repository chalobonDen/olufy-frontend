import { Fragment, useCallback, useEffect, useState } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Card, Checkbox, Divider, Input } from '@olufy-frontend/shared/UI'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { formatPrice, getErrorWithTouched } from '@olufy-frontend/shared/utils'
import { navigate } from 'vite-plugin-ssr/client/router'

import BackButton from '@/components/Client/Buttons/BackButton'
import { generateString } from '@/utils/random'
import { usePageContext } from '@/hooks/usePageContext'
import type { DocumentProps } from '@/renderer/types'
import { useSetting } from '@/hooks/stores/useSetting'
import Button from '@/components/Button'
import useRouter from '@/hooks/useRouter'

interface IProductSetup {
  paymentCycle: number
  os: number
  osVersion: number
  serverName: string
  serverPassword: string
  firewall: number
  addon: number
}

const mockPaymentCycle = [
  {
    label: '1,000.00 บาท ต่อ 1 เดือน',
    value: 1000,
  },
  {
    label: '2,000.00 บาท ต่อ 1 เดือน',
    value: 2000,
  },
]

const mockOS = [
  {
    label: 'Windows',
    value: 1,
  },
  {
    label: 'Linux',
    value: 2,
  },
]

const mockFirewall = [
  {
    label: 'Block all UDP Application Firewall !!!',
    value: 1,
  },
  {
    label: 'Block all UDP Application Firewall',
    value: 2,
  },
]

const mockAddon = [
  {
    label: '3,500.00 บาท ต่อ 1 เดือน',
    value: 3500,
  },
  {
    label: '5,500.00 บาท ต่อ 1 เดือน',
    value: 5500,
  },
]

export const Page = () => {
  const { i18n } = useLingui()
  const { push } = useRouter()

  // _State
  const [isFirewall, setIsFirewall] = useState(false)
  const [isAddon, setIsAddon] = useState(false)
  const {
    routeParams,
    urlParsed: { search },
  } = usePageContext()

  const validationSchema = yup.object().shape({
    serverName: yup.string().required(t`กรุณากรอกชื่อเซิร์ฟเวอร์`),
    serverPassword: yup.string().required(t`กรุณากรอกรหัสผ่าน`),
  })

  // _Form
  const formik = useFormik<IProductSetup>({
    initialValues: {
      paymentCycle: parseInt(search?.paymentCycle) || mockPaymentCycle[0].value,
      os: mockOS[0].value,
      osVersion: mockOS[0].value,
      serverName: search?.serverName || '',
      serverPassword: search?.serverPassword || '',
      firewall: null,
      addon: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const newValues = values
      const params = new URLSearchParams()
      Object.entries(newValues).forEach(([key, value]) => {
        if (value) params.set(key, value)
      })

      push(`/app/dedicated-server/packages/${routeParams?.id}/order?${params}`)
    },
  })

  // _Callbacks
  const setDefualtValue = useCallback(() => {
    if (search.addon) setIsAddon((state) => !state)
    if (search.firewall) setIsFirewall((state) => !state)
    Object.entries(search).forEach(([key, value]) => {
      if (key !== 'serverName' && key !== 'serverPassword') {
        return formik.setFieldValue(key, parseInt(value))
      }
      return formik.setFieldValue(key, value)
    })
  }, [formik, search])

  // _Effects
  useEffect(() => {
    if (search) setDefualtValue()
  }, [])

  return (
    <Fragment>
      <BackButton as="a" href="/app/dedicated-server/packages" />

      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`Dedicated Server`)}</h3>
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
                    {Object.values(mockPaymentCycle).map((cycle, idx) => (
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
              <h4 className={clsx(`text-header-4`)}>{i18n._(t`ระบบปฏิบัติการ`)}</h4>

              <div className={clsx(`mt-2`)}>
                <label htmlFor="os" className={clsx(`font-light`)}>
                  {i18n._(t`เลือกระบบปฏิบัติการ`)}
                </label>
                <div className={clsx(`mt-2`)}>
                  <Input.Select
                    id="os"
                    name="os"
                    onChange={formik.handleChange}
                    error={getErrorWithTouched(formik, 'os')}
                    value={formik.values.os}
                  >
                    {Object.values(mockOS).map((os, idx) => (
                      <option key={idx} value={os.value}>
                        {os.label}
                      </option>
                    ))}
                  </Input.Select>
                </div>
              </div>
              <div className={clsx(`mt-4`)}>
                <label htmlFor="osVersion" className={clsx(`font-light`)}>
                  {i18n._(t`เวอร์ชันระบบปฏิบัติการ`)}
                </label>
                <div className={clsx(`mt-2`)}>
                  <Input.Select
                    id="osVersion"
                    name="osVersion"
                    onChange={formik.handleChange}
                    error={getErrorWithTouched(formik, 'osVersion')}
                    value={formik.values.osVersion}
                  >
                    {Object.values(mockOS).map((os, idx) => (
                      <option key={idx} value={os.value}>
                        {os.label}
                      </option>
                    ))}
                  </Input.Select>
                </div>
                <Divider />
              </div>
            </div>
            <div>
              <h4 className={clsx(`text-header-4`)}>{i18n._(t`ตั้งค่าเซิร์ฟเวอร์`)}</h4>

              <div className={clsx(`mt-2`)}>
                <label htmlFor="serverName" className={clsx(`font-light`)}>
                  {i18n._(t`ชื่อเซิร์ฟเวอร์`)}
                </label>
                <div className={clsx(`mt-2`)}>
                  <Input
                    id="serverName"
                    name="serverName"
                    className={clsx(`mt-2`)}
                    placeholder={i18n._(t`กรอกชื่อเซิร์ฟเวอร์`)}
                    onChange={formik.handleChange}
                    value={formik.values.serverName}
                    error={getErrorWithTouched(formik, 'serverName')}
                  />
                </div>
              </div>
              <div className={clsx(`mt-4`)}>
                <label htmlFor="serverPassword" className={clsx(`font-light`)}>
                  {i18n._(t`รหัสผ่าน`)}
                </label>
                <div className={clsx(`mt-2 flex items-start space-x-4`)}>
                  <div className={clsx(`flex-1`)}>
                    <Input
                      id="serverPassword"
                      name="serverPassword"
                      placeholder={i18n._(t`กรอกรหัสผ่าน`)}
                      onChange={formik.handleChange}
                      value={formik.values.serverPassword}
                      error={getErrorWithTouched(formik, 'serverPassword')}
                    />
                  </div>
                  <Button
                    variant="success"
                    type="button"
                    size="medium"
                    onClick={() => formik.setFieldValue('serverPassword', generateString())}
                  >
                    <span>{i18n._(t`Random`)}</span>
                  </Button>
                </div>
              </div>
              <Divider />
            </div>
            <div>
              <h4 className={clsx(`text-header-4`)}>{i18n._(t`ระบบป้องกันยิง`)}</h4>

              <div className={clsx(`mt-2`)}>
                <Checkbox
                  className={clsx(`mt-4 self-center`)}
                  checked={isFirewall}
                  onChange={() => {
                    setIsFirewall((e) => !e)
                    if (!isFirewall) {
                      formik.setFieldValue('firewall', mockFirewall[0].value)
                    } else {
                      formik.setFieldValue('firewall', null)
                    }
                  }}
                >
                  <span className={clsx(`text-body-16 font-light`)}>
                    {i18n._(t`Firewall [FREE] Protect layer 3 - 4 and layer 7`)}
                  </span>
                </Checkbox>
                <div className={clsx(`mt-2`)}>
                  <Input.Select
                    id="firewall"
                    name="firewall"
                    disabled={!isFirewall}
                    onChange={formik.handleChange}
                    error={getErrorWithTouched(formik, 'firewall')}
                    value={formik.values.firewall || ''}
                  >
                    {Object.values(mockFirewall).map((firewall, idx) => (
                      <option key={idx} value={firewall.value}>
                        {firewall.label}
                      </option>
                    ))}
                  </Input.Select>
                </div>
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
                      formik.setFieldValue('addon', mockAddon[0].value)
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
                    {Object.values(mockAddon).map((addon, idx) => (
                      <option key={idx} value={addon.value}>
                        {addon.label}
                      </option>
                    ))}
                  </Input.Select>
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
              <span className={clsx(`text-body-16`)}>Dedicated Game Server</span>
              <span className={clsx(`text-right text-header-5`)}>
                {formatPrice(3500)} THB/{i18n._(t`Monthly`)}
              </span>
            </div>
            <div className={clsx(`mt-2`)}>
              <div className={clsx(`text-body-16`)}>AMD Ryzen 5 3600X @ 3.80 GHz</div>
              <div className={clsx(`text-body-14 font-light`)}>Turbo 4.4 GHz 6 Core / 12 Thread</div>
              <div className={clsx(`text-body-14 font-light`)}>CPU Score: 18310</div>
            </div>
            <div className={clsx(`mt-2`)}>
              <div className={clsx(`text-body-16`)}>DDR4 32 GB</div>
              <div className={clsx(`text-body-14 font-light`)}>(Speed 2666 MHz)</div>
            </div>
            <div className={clsx(`mt-2`)}>
              <div className={clsx(`text-body-16`)}>M.2 NVMe 250 GB</div>
              <div className={clsx(`text-body-14 font-light`)}>Read 2,400 MB/s</div>
              <div className={clsx(`text-body-14 font-light`)}>Write 1,000 MB/s</div>
            </div>
            <Divider className={clsx(`my-4`)} />
            <div className={clsx(`text-header-4`)}>{i18n._(t`ค่าบริการรวม`)}</div>
            <div className={clsx(`text-right text-header-2 text-primary-500`)}>3,500.00 THB</div>

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
  title: t`Dedicated Server`,
}
