import type { FC } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useFormik } from 'formik'
import clsx from 'clsx'
import { Input, Modal } from '@olufy-frontend/shared/UI'
import type { IModalProps } from '@olufy-frontend/shared/UI/Modal/types'
import * as yup from 'yup'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'

import { useAddressForm } from '@/hooks/useAutocompleteThaiAddress'
import Button from '@/components/Button'

import { useClientSettingProfileAddressModal } from './hooks'

import type { IUserSetupAddress } from '@/types/modules/user'

interface IClientSettingProfileAddressModalProps extends IModalProps {
  data: IUserSetupAddress
  onSubmit?: (payload: IUserSetupAddress) => void
}

const ClientSettingProfileAddressModal: FC<IClientSettingProfileAddressModalProps> = ({
  data,
  onSubmit,
  isLoading,
  ...props
}) => {
  const { visible, close } = useClientSettingProfileAddressModal()
  const { i18n } = useLingui()

  const validationSchema = yup.object().shape({
    address: yup.string().required(t`กรุณากรอกที่อยู่`),
    subDistrict: yup.string().required(t`กรุณากรอกตำบล/แขวง`),
    district: yup.string().required(t`กรุณากรอกเขต/อำเภอ`),
    province: yup.string().required(t`กรุณากรอกจังหวัด`),
    zipCode: yup.string().required(t`กรุณากรอกรหัสไปรษณีย์`),
  })

  // _Form
  const formik = useFormik<IUserSetupAddress>({
    initialValues: data,
    validationSchema,
    onSubmit: (values) => onSubmit?.(values),
    enableReinitialize: !!data,
  })

  // _Address
  const { addressList, onBlurAddress, onChangeAddress, onSelectedAddress } = useAddressForm(formik)

  // _Events
  const onCloseModal = () => {
    if (isLoading) return
    close()
    formik.resetForm()
  }

  return (
    <Modal
      visible={visible}
      closeModal={onCloseModal}
      title={i18n._(t`แก้ไขข้อมูลที่อยู่`)}
      isMobileFullScreen
      {...props}
    >
      <form className={clsx(`mt-4 space-y-4`, `sm:pb-24`)} onSubmit={formik.handleSubmit}>
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

        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            disabled={!formik.dirty}
            className={clsx(`w-full`)}
            loading={isLoading}
          >
            <span>{i18n._(t`ดำเนินการต่อ`)}</span>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default ClientSettingProfileAddressModal
