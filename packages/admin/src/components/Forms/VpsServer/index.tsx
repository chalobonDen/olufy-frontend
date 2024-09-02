import type { FC } from 'react'
import { useEffect, useState, useMemo, Fragment } from 'react'

import { useLingui } from '@lingui/react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Button, Checkbox, Input, Radio } from '@olufy-frontend/shared/UI'
import { formatNoRound, getErrorWithTouched } from '@olufy-frontend/shared/utils'

import ServerSelect from '@/components/Selects/ServerSelect'
import PlanSelect from '@/components/Selects/PlanSelect'

import type { IManageVpsServer } from '@/types/modules/vps-server'

interface IManageVpsServerFormProps {
  data?: IManageVpsServer
  onSubmit?: (payload: IManageVpsServer) => void
  readonly?: boolean
}

type BandwidthType = 'unlimited' | 'manual'

const ManageVpsServerForm: FC<IManageVpsServerFormProps> = ({ data, onSubmit, readonly = false }) => {
  const { i18n } = useLingui()
  const isEdit = !!data

  // _State
  const [isShowTax, setIsShowTax] = useState(false)
  const [bandwidthSelected, setBanwidthSelected] = useState<BandwidthType>('unlimited')

  // _Memo
  const initialValues: IManageVpsServer = useMemo(() => {
    if (!data) {
      return {
        name: '',
        bandwidth: 'unlimited',
        cpu: null,
        price: null,
        diskCapacity: null,
        diskType: '',
        networkType: 'shared',
        ram: null,
        taxWithheld: null,
        serverId: null,
        planId: null,
      } as IManageVpsServer
    }

    return {
      ...data,
    }
  }, [data])

  // _Validation_Schema
  const defaultSchema = {
    name: yup.string().required(t`กรุณากรอกชื่อแพ็กเกจ`),
    price: yup
      .string()
      .nullable()
      .required(t`กรุณากรอกราคา`),
    diskType: yup.string().required(t`กรุณาเลือกประเภทพื้นที่จัดเก็บข้อมูล`),
    serverId: yup
      .string()
      .nullable()
      .required(t`กรุณาเลือก Server`),
    planId: yup
      .string()
      .nullable()
      .required(t`กรุณาเลือก Plan`),
    diskCapacity: yup
      .string()
      .nullable()
      .required(t`กรุณากรอกความจุ`),
    cpu: yup
      .string()
      .nullable()
      .required(t`กรุณากรอกขนาด CPU`),
    ram: yup
      .string()
      .nullable()
      .required(t`กรุณากรอกขนาด RAM`),
    bandwidth: yup.string().required(t`กรุณากรอก Bandwidth`),
  }

  const validationSchema = yup.object().shape({
    ...defaultSchema,
  })

  const validationTaxSchema = yup.object().shape({
    ...defaultSchema,
    taxWithheld: yup
      .string()
      .nullable()
      .required(t`กรุณากรอกอัตราภาษี`),
  })

  // _Formik
  const formik = useFormik({
    initialValues,
    validationSchema: isShowTax ? validationTaxSchema : validationSchema,
    enableReinitialize: !!data,
    onSubmit: (values) => {
      const newValue: IManageVpsServer = {
        ...values,
        serverId: Number(values.serverId),
        planId: Number(values.planId),
      }

      if (isShowTax && newValue.taxWithheld > 0) {
        onSubmit?.(newValue)
        return
      }

      onSubmit?.({
        ...newValue,
        taxWithheld: 0,
      })
    },
  })

  // _Memo
  const taxPrice = useMemo(() => {
    const percentage = formik.values.taxWithheld ? Number(formik.values.taxWithheld) : 0
    const price = formik.values.price ? Number(formik.values.price) : 0
    return formatNoRound((percentage / 100) * price, 2)
  }, [formik.values.price, formik.values.taxWithheld])

  // _Effect
  useEffect(() => {
    if (data?.taxWithheld > 0) setIsShowTax(true)
  }, [data?.taxWithheld])

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <h4 className={clsx(`text-header-4`)}>{i18n._(t`ชื่อแพ็กเกจ`)}</h4>
        <div className={clsx(`mt-2`)}>
          <label htmlFor="name">{i18n._(t`VPS NAME`)}</label>
          <Input
            id="name"
            name="name"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`เช่น SIZE L / PACKAGE L`)}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={getErrorWithTouched(formik, 'name')}
          />
        </div>

        <h4 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`พื้นที่`)}</h4>
        <div className={clsx(`grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div className={clsx(`mt-2`)}>
            <label htmlFor="diskType">{i18n._(t`ประเภทพื้นที่จัดเก็บข้อมูล`)}</label>
            <Input.Select
              id="diskType"
              name="diskType"
              className={clsx(`mt-2`)}
              onChange={formik.handleChange}
              value={formik.values.diskType}
              error={getErrorWithTouched(formik, 'diskType')}
            >
              <option value="">{i18n._(t`เลือกประเภทพื้นที่จัดเก็บข้อมูล`)}</option>
              <option value="SSD">SSD</option>
              <option value="HDD">HDD</option>
            </Input.Select>
          </div>
          <div className={clsx(`mt-2`)}>
            <label htmlFor="diskCapacity">{i18n._(t`ความจุ`)}</label>
            <Input.Numeric
              id="diskCapacity"
              name="diskCapacity"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอกความจุ`)}
              onChange={(e) => formik.setFieldValue('diskCapacity', e ? Number(e) : e)}
              value={formik.values.diskCapacity ? String(formik.values.diskCapacity) : ''}
              suffix={<div className={clsx(`border-l border-dark-500 pl-2`)}>{i18n._(t`GB ต่อแพ็กเกจ`)}</div>}
              error={getErrorWithTouched(formik, 'diskCapacity')}
            />
          </div>
        </div>

        <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`CPU`)}</h4>
            <div className={clsx(`mt-2`)}>
              <label htmlFor="cpu">{i18n._(t`CPU core`)}</label>
              <Input.Numeric
                id="cpu"
                name="cpu"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกขนาด CPU`)}
                onChange={(e) => formik.setFieldValue('cpu', e ? Number(e) : e)}
                value={formik.values.cpu ? String(formik.values.cpu) : ''}
                suffix={<div className={clsx(`border-l border-dark-500 pl-2`)}>Core</div>}
                error={getErrorWithTouched(formik, 'cpu')}
              />
            </div>
          </div>
          <div>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`RAM`)}</h4>
            <div className={clsx(`mt-2`)}>
              <label htmlFor="ram">{i18n._(t`Memory`)}</label>
              <Input.Numeric
                id="ram"
                name="ram"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`เช่น RAM 3200 BUSS 32 GB`)}
                onChange={(e) => formik.setFieldValue('ram', e ? Number(e) : e)}
                value={formik.values.ram ? String(formik.values.ram) : ''}
                suffix={<div className={clsx(`border-l border-dark-500 pl-2`)}>MB</div>}
                error={getErrorWithTouched(formik, 'ram')}
              />
            </div>
          </div>
        </div>

        <div className={clsx(`grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <h4 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`Network Share`)}</h4>
            <div className={clsx(`mt-2`)}>
              <label htmlFor="networkShare">{i18n._(t`Network Share`)}</label>
              <div className={clsx(`mt-2 flex space-x-4`)}>
                <Radio
                  name="networkType"
                  value="shared"
                  checked={formik.values.networkType === 'shared'}
                  onChange={formik.handleChange}
                >
                  <span className={clsx(`ml-1`)}>Shared</span>
                </Radio>
                <Radio
                  name="networkType"
                  value="dedicated"
                  checked={formik.values.networkType === 'dedicated'}
                  onChange={formik.handleChange}
                >
                  <span className={clsx(`ml-1`)}>Dedicated</span>
                </Radio>
              </div>
            </div>
          </div>
          <div>
            <h4 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`Bandwidth`)}</h4>
            <div className={clsx(`mt-2`)}>
              <label>{i18n._(t`Bandwidth`)}</label>
              <div>
                <div className={clsx(`mt-2 flex space-x-4`)}>
                  <Radio
                    name="brandwidth-radio"
                    value="unlimited"
                    checked={bandwidthSelected === 'unlimited'}
                    onChange={(e) => {
                      setBanwidthSelected(e.target.value as BandwidthType)
                      formik.setFieldValue('bandwidth', 'unlimited')
                    }}
                  >
                    <span className={clsx(`ml-1`)}>Unlimited</span>
                  </Radio>
                  <Radio
                    name="brandwidth-radio"
                    value="manual"
                    checked={bandwidthSelected === 'manual'}
                    onChange={(e) => {
                      setBanwidthSelected(e.target.value as BandwidthType)
                      formik.setFieldValue('bandwidth', '')
                    }}
                  >
                    <span className={clsx(`ml-1`)}>Manual</span>
                  </Radio>
                </div>

                {bandwidthSelected === 'manual' && (
                  <Input
                    name="bandwidth"
                    className={clsx(`mt-2`)}
                    placeholder={i18n._(t`เช่น 1000 mbps`)}
                    onChange={formik.handleChange}
                    value={formik.values.bandwidth}
                    error={getErrorWithTouched(formik, 'bandwidth')}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`Server`)}</h4>
            <div className={clsx(`mt-2`)}>
              <label htmlFor="server">{i18n._(t`เลือก Server`)}</label>
              <ServerSelect
                id="serverId"
                name="serverId"
                className={clsx(`mt-2`)}
                onChange={formik.handleChange}
                value={formik.values.serverId || ''}
                error={getErrorWithTouched(formik, 'serverId')}
              />
            </div>
          </div>
          <div>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`Plan`)}</h4>
            <div className={clsx(`mt-2`)}>
              <label htmlFor="plan">{i18n._(t`เลือก Plan`)}</label>
              <PlanSelect
                id="planId"
                name="planId"
                className={clsx(`mt-2`)}
                onChange={formik.handleChange}
                value={formik.values.planId || ''}
                error={getErrorWithTouched(formik, 'planId')}
              />
            </div>
          </div>
        </div>

        <h4 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`PRICE`)}</h4>
        <div className={clsx(`mt-2`)}>
          <label htmlFor="price">{i18n._(t`ราคา / เดือน`)}</label>
          <Input.Numeric
            id="price"
            name="price"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`ราคา / เดือน`)}
            onChange={(e) => {
              formik.setFieldValue('price', e ? Number(e) : e)
            }}
            value={formik.values.price ? String(formik.values.price) : ''}
            suffix={<div className={clsx(`border-l border-dark-500 pl-2`)}>THB</div>}
            isNumberOnly={false}
            error={getErrorWithTouched(formik, 'price')}
          />
        </div>

        <Checkbox className={clsx(`mt-4 self-center`)} checked={isShowTax} onChange={() => setIsShowTax((e) => !e)}>
          <span>{i18n._(t`หักภาษี ณ ที่จ่าย`)}</span>
        </Checkbox>

        {isShowTax && (
          <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
            <div>
              <label htmlFor="taxWithheld">{i18n._(t`อัตราภาษี`)}</label>
              <Input.Numeric
                id="taxWithheld"
                name="taxWithheld"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกอัตราภาษี`)}
                onChange={(e) => formik.setFieldValue('taxWithheld', e ? Number(e) : e)}
                value={formik.values.taxWithheld ? String(formik.values.taxWithheld) : ''}
                suffix={<div className={clsx(`border-l border-dark-500 pl-2`)}>%</div>}
                error={getErrorWithTouched(formik, 'taxWithheld')}
              />
            </div>
            <div>
              <label>{i18n._(t`มูลค่าถูกหัก ณ ที่จ่าย`)}</label>
              <Input className={clsx(`mt-2`)} value={taxPrice} disabled />
            </div>
          </div>
        )}

        <div className={clsx(`mt-6 flex justify-end space-x-4`)}>
          <Button as="a" href="/app/vps-server" variant="danger" size="medium" type="button" className={clsx(`flex-1`)}>
            <span>{i18n._(t`ยกเลิก`)}</span>
          </Button>
          <Button variant="success" size="medium" type="submit" disabled={!formik.dirty} className={clsx(`flex-1`)}>
            <span>{isEdit ? i18n._(t`บันทึก`) : i18n._(t`เพิ่มแพ็กเกจ`)}</span>
          </Button>
        </div>
      </form>
    </Fragment>
  )
}

export default ManageVpsServerForm
