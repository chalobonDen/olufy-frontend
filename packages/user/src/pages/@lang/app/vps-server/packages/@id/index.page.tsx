import { Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import * as yup from 'yup'
import { useLingui } from '@lingui/react'
import { useFormik } from 'formik'
import clsx from 'clsx'
import { Button, Card, Divider, Input } from '@olufy-frontend/shared/UI'
import {
  decryptAESDeserialize,
  encryptAESSerailize,
  formatPrice,
  getErrorWithTouched,
} from '@olufy-frontend/shared/utils'

import type { DocumentProps } from '@/renderer/types'
import { usePageContext } from '@/hooks/usePageContext'
import BackButton from '@/components/Client/Buttons/BackButton'
import { generatePassword } from '@/utils'
import useRouter from '@/hooks/useRouter'

import type { ICreateOrderVpsServer, IVpsServer } from '@/types/modules/vps-server'
import { Period } from '@/enums'

interface IPageProps {
  data: IVpsServer
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()
  const { push } = useRouter()
  const {
    routeParams,
    urlParsed: { search },
  } = usePageContext()

  // _Validation_Schema
  const validationSchema = yup.object().shape({
    orderItems: yup.array().of(
      yup.object().shape({
        config: yup.object().shape({
          hostname: yup.string().required(t`กรุณากรอกชื่อเซิร์ฟเวอร์`),
          password: yup.string().required(t`กรุณากรอกรหัสผ่าน`),
        }),
      }),
    ),
  })

  // _Memo_InitValues
  const initialValues: ICreateOrderVpsServer = useMemo(() => {
    const defaultQuery: ICreateOrderVpsServer | null = decryptAESDeserialize({ value: search?.u, secureKey: 'key' })

    if (
      !!defaultQuery?.period &&
      !!defaultQuery?.orderItems[0]?.config?.hostname &&
      !!defaultQuery?.orderItems[0]?.config?.password
    )
      return defaultQuery

    return {
      orderItems: [
        {
          packageId: data.id,
          config: {
            hostname: '',
            password: '',
            vmTemplateId: data.vmTemplate[0]?.id ?? 0,
          },
        },
      ],
      period: Period.MONTHLY,
    }
  }, [data.id, data.vmTemplate, search])

  // _Form
  const formik = useFormik<ICreateOrderVpsServer>({
    initialValues,
    enableReinitialize: !!initialValues,
    validationSchema,
    onSubmit: (values) => {
      const params = new URLSearchParams()
      params.set('u', encryptAESSerailize(values))
      push(`/app/vps-server/packages/${routeParams?.id}/order?${params}`)
    },
  })

  // _Memo
  const periodSelected = useMemo(() => {
    return data.price.find((e) => e.type === formik.values.period)
  }, [data.price, formik.values.period])

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`VPS Server`)}</h3>
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
                <label htmlFor="period" className={clsx(`font-light`)}>
                  {i18n._(t`เลือกรอบชำระค่าบริการ`)}
                </label>
                <div className={clsx(`mt-2`)}>
                  <Input.Select
                    id="period"
                    name="period"
                    onChange={formik.handleChange}
                    error={getErrorWithTouched(formik, 'period')}
                    value={formik.values.period}
                  >
                    {data.price.map((item, itemIdx) => (
                      <option key={`option-period-${itemIdx}`} value={item.type}>
                        {formatPrice(item.price)}{' '}
                        {item.type === Period.MONTHLY ? i18n._(t`บาท ต่อ 1 เดือน`) : i18n._(t`บาท ต่อ 1 ปี`)}
                      </option>
                    ))}
                  </Input.Select>
                </div>
              </div>
            </div>

            <Divider />

            <div>
              <h4 className={clsx(`text-header-4`)}>{i18n._(t`ระบบปฏิบัติการ`)}</h4>

              <div className={clsx(`mt-2`)}>
                <label htmlFor="orderItems[0].config.vmTemplateId" className={clsx(`font-light`)}>
                  {i18n._(t`เลือกระบบปฏิบัติการ`)}
                </label>
                <div className={clsx(`mt-2`)}>
                  <Input.Select
                    id="orderItems[0].config.vmTemplateId"
                    name="orderItems[0].config.vmTemplateId"
                    onChange={formik.handleChange}
                    error={getErrorWithTouched(formik, 'orderItems[0].config.vmTemplateId')}
                    value={formik.values.orderItems[0]?.config?.vmTemplateId}
                  >
                    {data.vmTemplate.map((item, itemIdx) => (
                      <option key={`option-tempalte-${itemIdx}`} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Input.Select>
                </div>
              </div>
            </div>

            <Divider />

            <div className={clsx(`mt-4`)}>
              <h4 className={clsx(`text-header-4`)}>{i18n._(t`ตั้งค่าเซิร์ฟเวอร์`)}</h4>

              <div className={clsx(`mt-2`)}>
                <label htmlFor="orderItems[0].config.hostname" className={clsx(`font-light`)}>
                  {i18n._(t`ชื่อเซิร์ฟเวอร์`)}
                </label>
                <div className={clsx(`mt-2`)}>
                  <Input
                    id="orderItems[0].config.hostname"
                    name="orderItems[0].config.hostname"
                    className={clsx(`mt-2`)}
                    placeholder={i18n._(t`กรอกชื่อเซิร์ฟเวอร์`)}
                    onChange={formik.handleChange}
                    value={formik.values.orderItems[0]?.config?.hostname}
                    error={getErrorWithTouched(formik, 'orderItems[0].config.hostname')}
                  />
                </div>
              </div>
              <div className={clsx(`mt-4`)}>
                <label htmlFor="orderItems[0].config.password" className={clsx(`font-light`)}>
                  {i18n._(t`รหัสผ่าน`)}
                </label>
                <div className={clsx(`mt-2 flex items-start space-x-4`)}>
                  <div className={clsx(`flex-1`)}>
                    <Input
                      id="orderItems[0].config.password"
                      name="orderItems[0].config.password"
                      placeholder={i18n._(t`กรอกรหัสผ่าน`)}
                      onChange={formik.handleChange}
                      value={formik.values.orderItems[0]?.config?.password}
                      error={getErrorWithTouched(formik, 'orderItems[0].config.password')}
                    />
                  </div>
                  <Button
                    variant="success"
                    type="button"
                    size="medium"
                    onClick={() => formik.setFieldValue('orderItems[0].config.password', generatePassword(24))}
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
              <span className={clsx(`text-body-16`)}>{data.name}</span>
              <span className={clsx(`text-right text-header-5`)}>
                {formatPrice(periodSelected.price)} THB/
                <small className={clsx(`text-[14px] capitalize`)}>{periodSelected.type}</small>
              </span>
            </div>
            <div className={clsx(`mt-2 flex items-center`)}>
              <span className={clsx(`mr-2 text-body-16`)}>CPU</span>
              <span className={clsx(`text-body-16`)}>{data.cpu} Core</span>
            </div>
            <div className={clsx(`mt-2 flex items-center`)}>
              <span className={clsx(`mr-2 text-body-16`)}>Memory</span>
              <span className={clsx(`text-body-16`)}>
                {data.ram.amount} {data.ram.unit}
              </span>
            </div>
            <div className={clsx(`mt-2 flex items-center`)}>
              <span className={clsx(`mr-2 text-body-16`)}>Storage</span>
              <span className={clsx(`text-body-16`)}>
                {data.diskType} {data.diskCapacity.amount} {data.diskCapacity.unit}
              </span>
            </div>
            <div className={clsx(`mt-2 flex items-center`)}>
              <span className={clsx(`mr-2 text-body-16`)}>Network</span>
              <span className={clsx(`text-body-16`)}>{data.networkType.replace('Network', '').trim()}</span>
            </div>
            <div className={clsx(`mt-2 flex items-center`)}>
              <span className={clsx(`mr-2 text-body-16`)}>Bandwidth</span>
              <span className={clsx(`text-body-16`)}>{data.bandwidth}</span>
            </div>
            {/* <div className={clsx(`mt-2 flex items-center`)}>
              <span className={clsx(`mr-2 text-body-16`)}>Support OS</span>
              <span className={clsx(`text-body-16`)}>{['Windows', 'Linux'].join(', ')}</span>
            </div> */}
            <Divider className={clsx(`my-4`)} />
            <div className={clsx(`text-header-4`)}>{i18n._(t`ค่าบริการรวม`)}</div>
            <div className={clsx(`text-right text-header-3 text-primary-500`)}>
              {formatPrice(periodSelected.price)} THB
            </div>

            <Button
              variant="success"
              type="submit"
              className={clsx(`mt-4 w-full uppercase`)}
              onClick={() => formik.submitForm()}
            >
              <span className={clsx(`text-body-20`)}>Continue</span>
            </Button>
          </div>
        </Card>
      </div>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`VPS Server`,
}
