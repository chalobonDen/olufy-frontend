import type { FC } from 'react'
import { useState, Fragment, useEffect, useMemo } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { snakelizeKeys, getErrorWithTouched } from '@olufy-frontend/shared/utils'
import { Button, Checkbox, Input } from '@olufy-frontend/shared/UI'

import type { IHostingForm } from '@/types/modules/hosting'

interface IManageHostingFormProps {
  data?: IHostingForm
  onSubmit?: (payload: IHostingForm) => void
  readonly?: boolean
}

const mockTaxWithold = [
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

const ManageHostingForm: FC<IManageHostingFormProps> = ({ data, onSubmit, readonly = false }) => {
  const { i18n } = useLingui()
  const isEdit = !!data

  const defaultSchema = {
    name: yup.string().required(t`กรุณากรอกชื่อ`),
    domain: yup.string().required(t`กรุณากรอกชื่อโดเมน`),
    storage: yup.string().required(t`กรุณากรอกพื้นที่จัดเก็บข้อมูล`),
    bandwidth: yup.string().required(t`กรุณากรอก Bandwidth`),
    database: yup.string().required(t`กรุณากรอก Database`),
    fipAccount: yup.string().required(t`กรุณากรอก FTP Account`),
    webControlPanel: yup.string().required(t`กรุณากรอก Web Control Panel`),
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
        domain: '',
        storage: '',
        bandwidth: '',
        database: '',
        fipAccount: '',
        webControlPanel: '',
        price: '',
        taxWithheld: '',
        taxRate: '',
        taxAmount: '',
      } as IHostingForm
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
        <div className={clsx(`flex space-x-4`, `sm:flex-col sm:space-x-0 sm:space-y-4`)}>
          <div className={clsx(`flex-1`)}>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`PACKAGE NAME`)}</h4>

            <div className={clsx(`mt-2`)}>
              <label htmlFor="name">{i18n._(t`Package`)}</label>
              <Input
                id="name"
                name="name"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรุณากรอก Package name`)}
                onChange={formik.handleChange}
                value={formik.values.name}
                error={getErrorWithTouched(formik, 'name')}
                disabled={readonly}
              />
            </div>
          </div>
          <div className={clsx(`flex-1`)}>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`DOMAIN`)}</h4>

            <div className={clsx(`mt-2`)}>
              <label htmlFor="domain">{i18n._(t`Domain`)}</label>
              <Input
                id="domain"
                name="domain"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`เช่น .com`)}
                onChange={formik.handleChange}
                value={formik.values.domain}
                error={getErrorWithTouched(formik, 'domain')}
                disabled={readonly}
              />
            </div>
          </div>
        </div>
        <div className={clsx(`mt-4 flex space-x-4`, `sm:flex-col sm:space-x-0 sm:space-y-4`)}>
          <div className={clsx(`flex-1`)}>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`พื้นที่`)}</h4>

            <div className={clsx(`mt-2`)}>
              <label htmlFor="storage">{i18n._(t`พื้นที่จัดเก็บข้อมูล`)}</label>
              <Input
                id="storage"
                name="storage"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรุณากรอกพื้นที่จัดเก็บข้อมูล`)}
                onChange={formik.handleChange}
                value={formik.values.storage}
                error={getErrorWithTouched(formik, 'storage')}
                disabled={readonly}
              />
            </div>
          </div>
          <div className={clsx(`flex-1`)}>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`BANDWIDTH`)}</h4>

            <div className={clsx(`mt-2`)}>
              <label htmlFor="bandwidth">{i18n._(t`Bandwidth`)}</label>
              <Input
                id="bandwidth"
                name="bandwidth"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรุณากรอก Bandwidth`)}
                onChange={formik.handleChange}
                value={formik.values.bandwidth}
                error={getErrorWithTouched(formik, 'bandwidth')}
                disabled={readonly}
              />
            </div>
          </div>
        </div>
        <div className={clsx(`mt-4 flex space-x-4`, `sm:flex-col sm:space-x-0 sm:space-y-4`)}>
          <div className={clsx(`flex-1`)}>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`DATABASE`)}</h4>

            <div className={clsx(`mt-2`)}>
              <label htmlFor="database">{i18n._(t`Database`)}</label>
              <Input
                id="database"
                name="database"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรุณากรอก Database`)}
                onChange={formik.handleChange}
                value={formik.values.database}
                error={getErrorWithTouched(formik, 'database')}
                disabled={readonly}
              />
            </div>
          </div>
          <div className={clsx(`flex-1`)}>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`FTP ACCOUNT`)}</h4>

            <div className={clsx(`mt-2`)}>
              <label htmlFor="fipAccount">{i18n._(t`FTP Account`)}</label>
              <Input
                id="fipAccount"
                name="fipAccount"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`เช่น .com`)}
                onChange={formik.handleChange}
                value={formik.values.fipAccount}
                error={getErrorWithTouched(formik, 'fipAccount')}
                disabled={readonly}
              />
            </div>
          </div>
        </div>

        <h4 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`WEB CONTROL PANEL`)}</h4>

        <div className={clsx(`mt-2`)}>
          <label htmlFor="webControlPanel">{i18n._(t`Web Control Panel`)}</label>
          <Input
            id="webControlPanel"
            name="webControlPanel"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`เช่น .com`)}
            onChange={formik.handleChange}
            value={formik.values.webControlPanel}
            error={getErrorWithTouched(formik, 'webControlPanel')}
            disabled={readonly}
          />
        </div>

        <h4 className={clsx(`mt-4 text-header-4`)}>{i18n._(t`PRICE`)}</h4>

        <div className={clsx(`mt-2`)}>
          <label htmlFor="price">{i18n._(t`PRICE / YEAR`)}</label>
          <Input.Numeric
            id="price"
            name="price"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`PRICE / YEAR`)}
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

        <Checkbox
          className={clsx(`mt-4 self-center`)}
          checked={isWithholdTax}
          onChange={() => {
            setIsWithholdTax((e) => !e)
            if (!isWithholdTax) {
              formik.setFieldValue('taxRate', mockTaxWithold[0].value)
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
                {Object.values(mockTaxWithold).map((item, idx) => (
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
            <Button as="a" href="/app/hosting" variant="danger" size="medium" type="button" className={clsx(`flex-1`)}>
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

export default ManageHostingForm
