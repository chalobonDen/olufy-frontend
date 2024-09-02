import type { FC } from 'react'
import { Fragment, useEffect, useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import * as yup from 'yup'
import { t } from '@lingui/macro'
import { useFormik } from 'formik'
import { snakelizeKeys, getErrorWithTouched } from '@olufy-frontend/shared/utils'
import clsx from 'clsx'
import { Button, Checkbox, Input } from '@olufy-frontend/shared/UI'

import type { IDedicatedForm } from '@/types/modules/dedicated'

interface IManageDedicatedFormProps {
  data?: IDedicatedForm
  onSubmit?: (payload: IDedicatedForm) => void
  readonly?: boolean
}

const MOCK_TAX_WITH_HOLD = [
  {
    value: 1,
    label: '1%',
  },
  {
    value: 2,
    label: '2%',
  },
  {
    value: 3,
    label: '3%',
  },
]

const ManageDedicatedForm: FC<IManageDedicatedFormProps> = ({ data, onSubmit, readonly = false }) => {
  const { i18n } = useLingui()
  const isEdit = !!data

  const defaultSchema = {
    name: yup.string().required(t`กรุณากรอกชื่อแพ็กเกจ`),
    storageType: yup.string().required(t`กรุณากรอกประเภทพื้นที่จัดเก็บข้อมูล`),
    storageCapacity: yup.string().required(t`กรุณากรอกความจุ`),
    cpu: yup.string().required(t`กรุณากรอก CPU core`),
    ram: yup.string().required(t`กรุณากรอก Memory`),
    os: yup.string().required(t`กรุณากรอก OS Name`),
    networkShare: yup.string().required(t`กรุณากรอก Network Share`),
    bandwidth: yup.string().required(t`กรุณากรอก Bandwidth`),
    price: yup.string().required(t`กรุณากรอกราคา`),
  }

  const validationSchema = yup.object().shape({
    ...defaultSchema,
  })

  const validationTaxSchema = yup.object().shape({
    ...defaultSchema,
    taxRate: yup.string().required(t`กรุณาเลือกอัตราภาษี`),
    taxAmount: yup.string().required(t`กรุณากรอกมูลค่าถูกหัก ณ ที่จ่าย`),
  })

  // _State
  const [isWithholdTax, setIsWithholdTax] = useState(false)

  // _Memo
  const initialValues = useMemo(() => {
    if (!data) {
      return {
        name: '',
        storageType: '',
        storageCapacity: '',
        cpu: '',
        ram: '',
        os: '',
        networkShare: '',
        bandwidth: '',
        price: '',
        taxRate: '',
        taxAmount: '',
      } as IDedicatedForm
    }

    return {
      ...data,
    }
  }, [data])

  const isTax = useMemo(() => !!data?.taxRate && !!data?.taxAmount, [data?.taxAmount, data?.taxRate])

  // _Formik
  const formik = useFormik({
    initialValues,
    validationSchema: isTax || isWithholdTax ? validationTaxSchema : validationSchema,
    enableReinitialize: !!data,
    onSubmit: (values) => {
      const newValues = snakelizeKeys(values)

      onSubmit?.(newValues)
    },
  })

  // _Effect
  useEffect(() => {
    if (isTax) setIsWithholdTax(true)
  }, [isTax])

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <h4 className={clsx(`text-header-4`)}>{i18n._(t`ชื่อแพ็กเกจ`)}</h4>

        <div className={clsx(`mt-2`)}>
          <label htmlFor="name">{i18n._(t`DEDICATED NAME`)}</label>
          <Input
            id="name"
            name="name"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`DEDICATED NAME`)}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={getErrorWithTouched(formik, 'name')}
            disabled={readonly}
          />
        </div>

        <h4 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`พื้นที่`)}</h4>
        <div className={clsx(`mt-2 flex space-x-4`, `sm:flex-col sm:space-x-0 sm:space-y-4`)}>
          <div className={clsx(`flex-1`)}>
            <label htmlFor="storageType">{i18n._(t`ประเภทพื้นที่จัดเก็บข้อมูล`)}</label>
            <Input
              id="storageType"
              name="storageType"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`เช่น HHD / SSD`)}
              onChange={formik.handleChange}
              value={formik.values.storageType}
              error={getErrorWithTouched(formik, 'storageType')}
              disabled={readonly}
            />
          </div>
          <div className={clsx(`flex-1`)}>
            <label htmlFor="storageCapacity">{i18n._(t`ความจุ`)}</label>
            <Input.Numeric
              id="storageCapacity"
              name="storageCapacity"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`เช่น 128 GB, 256 GB, 1TB`)}
              onChange={(e) => {
                formik.setFieldValue('price', e)
              }}
              value={formik.values.storageCapacity as string}
              suffix={<div className={clsx(`border-l border-dark-500 pl-2`)}>{i18n._(t`ต่อแพ็กเกจ`)}</div>}
              isNumberOnly={false}
              error={getErrorWithTouched(formik, 'storageCapacity')}
              disabled={readonly}
            />
          </div>
        </div>

        <div className={clsx(`mt-2 flex space-x-4`, `sm:flex-col sm:space-x-0 sm:space-y-4`)}>
          <div className={clsx(`flex-1`)}>
            <h4 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`CPU`)}</h4>
            <div className={clsx(`mt-2`)}>
              <label htmlFor="cpu">{i18n._(t`CPU core`)}</label>
              <Input
                id="cpu"
                name="cpu"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`เช่น Intel Core i9`)}
                onChange={formik.handleChange}
                value={formik.values.cpu}
                error={getErrorWithTouched(formik, 'cpu')}
                disabled={readonly}
              />
            </div>
          </div>
          <div className={clsx(`flex-1`)}>
            <h4 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`RAM`)}</h4>
            <div className={clsx(`mt-2`)}>
              <label htmlFor="ram">{i18n._(t`Memory`)}</label>
              <Input.Numeric
                id="ram"
                name="ram"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`เช่น RAM 3200 BUSS 32 GB`)}
                onChange={(e) => {
                  formik.setFieldValue('price', e)
                }}
                value={formik.values.ram as string}
                suffix={<div className={clsx(`border-l border-dark-500 pl-2`)}>MB</div>}
                isNumberOnly={false}
                error={getErrorWithTouched(formik, 'ram')}
                disabled={readonly}
              />
            </div>
          </div>
        </div>

        <h4 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`PRICE`)}</h4>
        <div className={clsx(`mt-2`)}>
          <label htmlFor="price">{i18n._(t`ราคา`)}</label>
          <Input.Numeric
            id="price"
            name="price"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`ราคา`)}
            onChange={(e) => {
              formik.setFieldValue('price', e)
            }}
            value={formik.values.price as string}
            suffix={<div className={clsx(`border-l border-dark-500 pl-2`)}>THB</div>}
            isNumberOnly={false}
            error={getErrorWithTouched(formik, 'price')}
            disabled={readonly}
          />
        </div>

        <h4 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`OS`)}</h4>
        <div className={clsx(`mt-2`)}>
          <label htmlFor="os">{i18n._(t`OS Name`)}</label>
          <Input
            id="os"
            name="os"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`เช่น Support Linux / Window`)}
            onChange={formik.handleChange}
            value={formik.values.os}
            error={getErrorWithTouched(formik, 'os')}
            disabled={readonly}
          />
        </div>

        <div className={clsx(`mt-2 flex space-x-4`, `sm:flex-col sm:space-x-0 sm:space-y-4`)}>
          <div className={clsx(`flex-1`)}>
            <h4 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`Network Share`)}</h4>
            <div className={clsx(`mt-2`)}>
              <label htmlFor="networkShare">{i18n._(t`Network Share`)}</label>
              <Input
                id="networkShare"
                name="networkShare"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`Network Share`)}
                onChange={formik.handleChange}
                value={formik.values.networkShare}
                error={getErrorWithTouched(formik, 'networkShare')}
                disabled={readonly}
              />
            </div>
          </div>
          <div className={clsx(`flex-1`)}>
            <h4 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`Bandwidth`)}</h4>
            <div className={clsx(`mt-2`)}>
              <label htmlFor="bandwidth">{i18n._(t`Bandwidth`)}</label>
              <Input.Numeric
                id="bandwidth"
                name="bandwidth"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`เช่น 1000 mbps`)}
                onChange={(e) => {
                  formik.setFieldValue('price', e)
                }}
                value={formik.values.bandwidth as string}
                suffix={<div className={clsx(`border-l border-dark-500 pl-2`)}>MB</div>}
                isNumberOnly={false}
                error={getErrorWithTouched(formik, 'bandwidth')}
                disabled={readonly}
              />
            </div>
          </div>
        </div>

        <Checkbox
          className={clsx(`mt-4 self-center`)}
          checked={isWithholdTax}
          onChange={() => {
            setIsWithholdTax((e) => !e)
            if (!isWithholdTax) {
              formik.setFieldValue('taxRate', MOCK_TAX_WITH_HOLD[0].value)
            } else {
              formik.setFieldValue('taxRate', null)
              formik.setFieldValue('taxAmount', null)
            }
          }}
          disabled={readonly}
        >
          <span>{i18n._(t`หักภาษี ณ ที่จ่าย`)}</span>
        </Checkbox>

        {isWithholdTax && (
          <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
            <div>
              <label htmlFor="taxRate">{i18n._(t`อัตราภาษี`)}</label>
              <Input.Select
                id="taxRate"
                name="taxRate"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกอัตราภาษี`)}
                onChange={formik.handleChange}
                value={formik.values.taxRate || ''}
                error={getErrorWithTouched(formik, 'taxRate')}
                disabled={readonly}
              >
                {Object.values(MOCK_TAX_WITH_HOLD).map((item, idx) => (
                  <option key={idx} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Input.Select>
            </div>
            <div>
              <label htmlFor="taxAmount">{i18n._(t`มูลค่าถูกหัก ณ ที่จ่าย`)}</label>
              <Input.Numeric
                id="taxAmount"
                name="taxAmount"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกมูลค่าถูกหัก ณ ที่จ่าย`)}
                onChange={(e) => {
                  formik.setFieldValue('taxAmount', e)
                }}
                value={formik.values.taxAmount as string}
                isNumberOnly={false}
                error={getErrorWithTouched(formik, 'taxAmount')}
                disabled={readonly}
              />
            </div>
          </div>
        )}

        {!readonly && (
          <div className={clsx(`mt-6 flex justify-end space-x-4`)}>
            <Button
              as="a"
              href="/app/dedicated"
              variant="danger"
              size="medium"
              type="button"
              className={clsx(`flex-1`)}
            >
              <span>{i18n._(t`ยกเลิก`)}</span>
            </Button>
            <Button variant="success" size="medium" type="submit" disabled={!formik.dirty} className={clsx(`flex-1`)}>
              <span>{isEdit ? i18n._(t`บันทึก`) : i18n._(t`เพิ่มแพ็กเกจ`)}</span>
            </Button>
          </div>
        )}
      </form>
    </Fragment>
  )
}

export default ManageDedicatedForm
