import type { FC } from 'react'
import { useState, Fragment, useEffect, useMemo } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { snakelizeKeys, getErrorWithTouched } from '@olufy-frontend/shared/utils'
import { Button, Checkbox, Input } from '@olufy-frontend/shared/UI'

import type { ICoLocationForm } from '@/types/modules/co-location'

interface IManageCoLocationFormProps {
  data?: ICoLocationForm
  onSubmit?: (payload: ICoLocationForm) => void
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

const ManageCoLocationForm: FC<IManageCoLocationFormProps> = ({ data, onSubmit, readonly = false }) => {
  const { i18n } = useLingui()
  const isEdit = !!data

  const defaultSchema = {
    name: yup.string().required(t`กรุณากรอกชื่อแพ็กเกจ`),
    sizeRack: yup.string().required(t`กรุณากรอก Size Rack`),
    dataCenter: yup.string().required(t`กรุณากรอก Data Center`),
    os: yup.string().required(t`กรุณากรอก OS`),
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
        sizeRack: '',
        dataCenter: '',
        os: '',
        networkShare: '',
        bandwidth: '',
        price: '',
        taxWithheld: '',
        taxRate: '',
        taxAmount: '',
      } as ICoLocationForm
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
        <div>
          <h4 className={clsx(`text-header-4`)}>{i18n._(t`ชื่อแพ็กเกจ`)}</h4>

          <div className={clsx(`mt-2`)}>
            <label htmlFor="name">{i18n._(t`CO-LOCATION NAME`)}</label>
            <Input
              id="name"
              name="name"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`เช่น SIZE L / PACKAGE L`)}
              onChange={formik.handleChange}
              value={formik.values.name}
              error={getErrorWithTouched(formik, 'name')}
              disabled={readonly}
            />
          </div>
        </div>

        <div className={clsx(`mt-4`)}>
          <h4 className={clsx(`text-header-4`)}>{i18n._(t`Size Rack`)}</h4>

          <div className={clsx(`mt-2`)}>
            <label htmlFor="name">{i18n._(t`Size Rack`)}</label>
            <Input
              id="sizeRack"
              name="sizeRack"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`เช่น 1U Rack / 1/2 Rack`)}
              onChange={formik.handleChange}
              value={formik.values.sizeRack}
              error={getErrorWithTouched(formik, 'sizeRack')}
              disabled={readonly}
            />
          </div>
        </div>

        <div className={clsx(`mt-4`)}>
          <h4 className={clsx(`text-header-4`)}>{i18n._(t`Data Center`)}</h4>

          <div className={clsx(`mt-2`)}>
            <label htmlFor="name">{i18n._(t`Data Center`)}</label>
            <Input
              id="dataCenter"
              name="dataCenter"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`สถานที่ตั้ง`)}
              onChange={formik.handleChange}
              value={formik.values.dataCenter}
              error={getErrorWithTouched(formik, 'dataCenter')}
              disabled={readonly}
            />
          </div>
        </div>

        <div className={clsx(`mt-4`)}>
          <h4 className={clsx(`text-header-4`)}>{i18n._(t`OS`)}</h4>

          <div className={clsx(`mt-2`)}>
            <label htmlFor="name">{i18n._(t`OS Name`)}</label>
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
        </div>

        <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`Network Share`)}</h4>

            <div className={clsx(`mt-2`)}>
              <label htmlFor="name">{i18n._(t`Network Share`)}</label>
              <Input.Numeric
                id="networkShare"
                name="networkShare"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`จำนวน IP ที่แชร์`)}
                onChange={(e) => {
                  formik.setFieldValue('networkShare', e)
                }}
                value={String(formik.values.networkShare)}
                error={getErrorWithTouched(formik, 'networkShare')}
                disabled={readonly}
              />
            </div>
          </div>

          <div>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`Bandwidth`)}</h4>

            <div className={clsx(`mt-2`)}>
              <label htmlFor="name">{i18n._(t`Bandwidth`)}</label>
              <Input
                id="bandwidth"
                name="bandwidth"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`เช่น 1000 mbps`)}
                onChange={formik.handleChange}
                value={formik.values.bandwidth}
                error={getErrorWithTouched(formik, 'bandwidth')}
                disabled={readonly}
              />
            </div>
          </div>
        </div>

        <div className={clsx(`mt-4`)}>
          <label htmlFor="price">{i18n._(t`PRICE / YEAR`)}</label>
          <Input.Numeric
            id="price"
            name="price"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`PRICE / YEAR`)}
            onChange={(e) => {
              formik.setFieldValue('price', e)
            }}
            value={String(formik.values.price)}
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
                value={String(formik.values.taxAmount)}
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
              href="/app/co-location"
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

export default ManageCoLocationForm
