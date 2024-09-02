import { Fragment, useCallback, useEffect } from 'react'

import { useLingui } from '@lingui/react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Button, Card, Divider, Input } from '@olufy-frontend/shared/UI'
import { formatPrice, getErrorWithTouched } from '@olufy-frontend/shared/utils'

import { usePageContext } from '@/hooks/usePageContext'
import BackButton from '@/components/Client/Buttons/BackButton'
import { generateString } from '@/utils'
import type { DocumentProps } from '@/renderer/types'
import useRouter from '@/hooks/useRouter'

interface IProductSetup {
  paymentCycle: number
  dataSystem: number
  os: number
  serverName: string
  serverPassword: string
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

const mockDataSystem = [
  {
    label: 'DemoHostname1',
    value: 1,
  },
  {
    label: 'DemoHostname2',
    value: 2,
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

export const Page = () => {
  const { i18n } = useLingui()
  const { push } = useRouter()
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
      dataSystem: mockDataSystem[0].value,
      os: mockOS[0].value,
      serverName: search?.serverName || '',
      serverPassword: search?.serverPassword || '',
    },
    validationSchema,
    onSubmit: (values) => {
      const newValues = values
      const params = new URLSearchParams()
      Object.entries(newValues).forEach(([key, value]) => {
        if (value) params.set(key, value)
      })

      push(`/app/vps-auto/packages/${routeParams?.id}/order?${params}`)
    },
  })

  // _Callbacks
  const setDefualtValue = useCallback(() => {
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
      <BackButton as="a" href="/app/vps-auto/packages" />

      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`VPS Auto`)}</h3>
      <div
        className={clsx(
          `mt-6 grid grid-cols-[2fr_1fr] gap-4`,
          `2xl:grid-cols-[1fr_390px]`,
          `lg:grid-cols-[1fr_370px]`,
          `sm:grid-cols-1`,
        )}
      >
        <form>
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
              <h4 className={clsx(`text-header-4`)}>{i18n._(t`ระบบจัดเก็บข้อมูล`)}</h4>

              <div className={clsx(`mt-2`)}>
                <label htmlFor="os" className={clsx(`font-light`)}>
                  {i18n._(t`เลือกระบบจัดเก็บข้อมูล`)}
                </label>
                <div className={clsx(`mt-2`)}>
                  <Input.Select
                    id="dataSystem"
                    name="dataSystem"
                    onChange={formik.handleChange}
                    error={getErrorWithTouched(formik, 'dataSystem')}
                    value={formik.values.dataSystem}
                  >
                    {Object.values(mockDataSystem).map((dataSystem, idx) => (
                      <option key={idx} value={dataSystem.value}>
                        {dataSystem.label}
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
                <Divider />
              </div>
            </div>
            <div className={clsx(`mt-4`)}>
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
            </div>
          </Card>
        </form>

        <Card className={clsx(`h-fit`)}>
          <div>
            <h3 className={clsx(`text-center text-header-3`)}>{i18n._(t`สรุปการสั่งซื้อ`)}</h3>
            <Divider className={clsx(`my-4`)} />

            <div className={clsx(`flex items-center justify-between`)}>
              <span className={clsx(`text-body-16`)}>VPU Auto SSD #</span>
              <span className={clsx(`text-right text-header-5`)}>
                {formatPrice(200)} THB/{i18n._(t`Monthly`)}
              </span>
            </div>
            <div className={clsx(`mt-2 flex items-center`)}>
              <span className={clsx(`mr-2 text-body-16`)}>CPU</span>
              <span className={clsx(`text-body-16`)}>2 CPU vCore</span>
            </div>
            <div className={clsx(`mt-2 flex items-center`)}>
              <span className={clsx(`mr-2 text-body-16`)}>Memory</span>
              <span className={clsx(`text-body-16`)}>4 GB</span>
            </div>
            <div className={clsx(`mt-2 flex items-center`)}>
              <span className={clsx(`mr-2 text-body-16`)}>Storage</span>
              <span className={clsx(`text-body-16`)}>SSD 30 GB</span>
            </div>
            <Divider className={clsx(`my-4`)} />
            <div className={clsx(`text-header-4`)}>{i18n._(t`ค่าบริการรวม`)}</div>
            <div className={clsx(`text-right text-header-2 text-primary-500`)}>{formatPrice(200)} THB</div>

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
  title: t`VPS Auto`,
}
