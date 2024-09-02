import type { FC } from 'react'
import { useEffect, useState, useMemo } from 'react'

import { Input, Modal } from '@olufy-frontend/shared/UI'
import type { IModalProps } from '@olufy-frontend/shared/UI/Modal/types'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useFormik } from 'formik'
import clsx from 'clsx'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'
import * as yup from 'yup'
import 'yup-phone'

import { useAddressForm } from '@/hooks/useAutocompleteThaiAddress'
import Button from '@/components/Button'

import { useClientSettingProfileTaxInvoiceModal } from './hooks'

import type { IUserTaxInvoice } from '@/types/modules/user'

interface IClientSettingProfileTaxInvoiceModalProps extends IModalProps {
  onSubmit?: (payload: IUserTaxInvoice) => void
}

const ClientSettingProfileTaxInvoiceModal: FC<IClientSettingProfileTaxInvoiceModalProps> = ({
  onSubmit,
  isLoading,
  ...props
}) => {
  const { i18n } = useLingui()
  const { visible, close, data } = useClientSettingProfileTaxInvoiceModal()

  const isEdit = !!data

  const baseSchema = {
    taxId: yup
      .number()
      .typeError(t`ต้องเป็นตัวเลขเท่านั้น`)
      .required(t`กรุณากรอกเลขประจำตัวผู้เสียภาษี`),
    tel: yup
      .string()
      .nullable()
      .phone('TH', true, t`ต้องเป็นหมายเลขโทรศัพท์ที่ถูกต้องสำหรับภูมิภาค TH`)
      .required(t`กรุณากรอกเบอร์โทรศัพท์มือถือ`),
    address: yup.string().required(t`กรุณากรอกที่อยู่`),
    subDistrict: yup.string().required(t`กรุณากรอกตำบล/แขวง`),
    district: yup.string().required(t`กรุณากรอกเขต/อำเภอ`),
    province: yup.string().required(t`กรุณากรอกจังหวัด`),
    zipCode: yup.string().required(t`กรุณากรอกรหัสไปรษณีย์`),
  }

  const personValidationSchema = yup.object().shape({
    name: yup
      .string()
      .nullable()
      .required(t`กรุณากรอกชื่อ - นามสกุล`),
    ...baseSchema,
  })

  const companyValidationSchema = yup.object().shape({
    name: yup
      .string()
      .nullable()
      .required(t`กรุณากรอกชื่อนิติบุคคล`),
    branch: yup.string().required(t`กรุณากรอกสำนักงานใหญ่/สาขา`),
    ...baseSchema,
  })

  // _Memo
  const initialValues = useMemo((): IUserTaxInvoice => {
    if (data) {
      return {
        ...data,
        type: !data.branch ? 'person' : 'company',
      }
    }

    return {
      name: '',
      address: '',
      branch: '',
      district: '',
      type: 'person',
      province: '',
      subDistrict: '',
      taxId: '',
      tel: '',
      zipCode: '',
    }
  }, [data])

  // _State
  const [isPerson, setIsPerson] = useState(true)

  // _Form
  const formik = useFormik<IUserTaxInvoice>({
    initialValues,
    validationSchema: isPerson ? personValidationSchema : companyValidationSchema,
    onSubmit: (values) => onSubmit?.(values),
    enableReinitialize: !!initialValues,
  })

  // _Address
  const { addressList, onBlurAddress, onChangeAddress, onSelectedAddress, setTempAddress } = useAddressForm(formik)

  // _Events
  const onCloseModal = () => {
    close()
    formik.resetForm()
  }

  // _Effect
  useEffect(() => {
    setIsPerson(formik.values?.type === 'person')
  }, [formik.values?.type])

  useEffect(() => {
    if (!visible) {
      formik.resetForm()
      setTempAddress(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  useEffect(() => {
    if (visible && data) {
      const district = data?.district
      const province = data?.province
      const subDistrict = data?.subDistrict
      const zipCode = data?.zipCode

      if (district && province && subDistrict && zipCode) {
        setTempAddress({
          amphoe: district,
          district: subDistrict,
          province,
          zipcode: zipCode,
        })
      }
    }
  }, [visible, data, setTempAddress])

  return (
    <Modal
      visible={visible}
      closeModal={onCloseModal}
      title={isEdit ? i18n._(t`แก้ไขที่อยู่ใบกำกับภาษี`) : i18n._(t`เพิ่มที่อยู่ใบกำกับภาษี`)}
      isMobileFullScreen
      {...props}
    >
      <form className={clsx(`space-y-4`, `sm:pb-24`)} onSubmit={formik.handleSubmit}>
        {/* Select Type */}
        <div className={clsx(`space-x-5`)}>
          <label className={clsx(`inline-flex items-center space-x-2`)}>
            <input
              type="radio"
              name="type"
              value="person"
              onChange={() => {
                formik.setErrors({})
                formik.setFieldValue('type', 'person', false)
                if (isEdit) formik.setFieldValue('branch', '')
              }}
              checked={formik.values?.type === 'person'}
            />
            <span>{i18n._(t`บุคคลธรรมดา`)}</span>
          </label>
          <label className={clsx(`inline-flex items-center space-x-2`)}>
            <input
              type="radio"
              name="type"
              value="company"
              onChange={() => {
                formik.setErrors({})
                formik.setFieldValue('type', 'company', false)
                if (isEdit && initialValues?.branch) formik.setFieldValue('branch', initialValues.branch)
              }}
              checked={formik.values?.type === 'company'}
            />
            <span>{i18n._(t`นิติบุคคล`)}</span>
          </label>
        </div>

        {/* Name & Branch */}
        <div className={clsx([`grid gap-4`, { 'grid-cols-2 sm:grid-cols-1': !isPerson }])}>
          <div>
            <label htmlFor="name">{isPerson ? i18n._(t`ชื่อ - นามสกุล`) : i18n._(t`ชื่อนิติบุคคล`)}</label>
            <Input
              id="name"
              name="name"
              className={clsx(`mt-2`)}
              placeholder={isPerson ? i18n._(t`กรอกชื่อ - นามสกุล`) : i18n._(t`กรอกชื่อนิติบุคคล`)}
              onChange={formik.handleChange}
              value={formik.values.name}
              error={getErrorWithTouched(formik, 'name')}
              disabled={isLoading}
            />
          </div>

          {!isPerson && (
            <div>
              <label htmlFor="branch">{i18n._(t`สำนักงานใหญ่/สาขา`)}</label>
              <Input
                id="branch"
                name="branch"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกสำนักงานใหญ่/สาขา`)}
                onChange={formik.handleChange}
                value={formik.values.branch}
                error={getErrorWithTouched(formik, 'branch')}
                disabled={isLoading}
              />
            </div>
          )}
        </div>

        {/* TaxId & Tel */}
        <div className={clsx(`grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <label htmlFor="taxId">{i18n._(t`เลขประจำตัวผู้เสียภาษี`)}</label>
            <Input
              id="taxId"
              name="taxId"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอกเลขประจำตัวผู้เสียภาษี`)}
              onChange={formik.handleChange}
              value={formik.values.taxId}
              error={getErrorWithTouched(formik, 'taxId')}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="tel">
              {i18n._(t`เบอร์โทรศัพท์มือถือ`)}
              <span className={clsx(`text-error`)}>*</span>
            </label>
            <Input
              id="tel"
              name="tel"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอกเบอร์โทรศัพท์มือถือ`)}
              onChange={formik.handleChange}
              value={formik.values.tel}
              error={getErrorWithTouched(formik, 'tel')}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address">{i18n._(t`ที่อยู่`)}</label>
          <Input
            id="address"
            name="address"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกที่อยู่`)}
            onChange={formik.handleChange}
            value={formik.values.address}
            error={getErrorWithTouched(formik, 'address')}
            disabled={isLoading}
          />
        </div>

        <div className={clsx(`grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <label htmlFor="subDistrict">{i18n._(t`ตำบล/แขวง`)}</label>
            <Input.AutoComplete
              items={addressList}
              id="subDistrict"
              name="subDistrict"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอกตำบล/แขวง`)}
              onChange={onChangeAddress}
              onSelected={onSelectedAddress}
              onBlur={onBlurAddress}
              value={formik.values.subDistrict}
              error={getErrorWithTouched(formik, 'subDistrict')}
              emptyMsg={i18n._(t`ไม่พบข้อมูล`)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="district">{i18n._(t`เขต/อำเภอ`)}</label>
            <Input.AutoComplete
              items={addressList}
              id="district"
              name="district"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอกเขต/อำเภอ`)}
              onChange={onChangeAddress}
              onSelected={onSelectedAddress}
              onBlur={onBlurAddress}
              value={formik.values.district}
              error={getErrorWithTouched(formik, 'district')}
              emptyMsg={i18n._(t`ไม่พบข้อมูล`)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="province">{i18n._(t`จังหวัด`)}</label>
            <Input.AutoComplete
              items={addressList}
              id="province"
              name="province"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอกจังหวัด`)}
              onChange={onChangeAddress}
              onSelected={onSelectedAddress}
              onBlur={onBlurAddress}
              value={formik.values.province}
              error={getErrorWithTouched(formik, 'province')}
              emptyMsg={i18n._(t`ไม่พบข้อมูล`)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="zipCode">{i18n._(t`รหัสไปรษณีย์`)}</label>
            <Input.AutoComplete
              items={addressList}
              id="zipCode"
              name="zipCode"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอกรหัสไปรษณีย์`)}
              onChange={onChangeAddress}
              onSelected={onSelectedAddress}
              onBlur={onBlurAddress}
              value={formik.values.zipCode}
              error={getErrorWithTouched(formik, 'zipCode')}
              emptyMsg={i18n._(t`ไม่พบข้อมูล`)}
              disabled={isLoading}
            />
          </div>
        </div>

        <Modal.Footer className={clsx(`mt-6`)}>
          <Button
            variant="primary"
            type="submit"
            className={clsx(`w-full`)}
            disabled={!formik.dirty && isEdit}
            loading={isLoading}
          >
            <span>{i18n._(t`บันทึก`)}</span>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default ClientSettingProfileTaxInvoiceModal
