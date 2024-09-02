import type { FC } from 'react'
import { useState } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Checkbox, Input } from '@olufy-frontend/shared/UI'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'
import { IoArrowBack } from 'react-icons/io5'

import UserTitle from '@/components/UI/User/Title'
import { useAddressForm } from '@/hooks/useAutocompleteThaiAddress'
import Link from '@/components/Link'
import Button from '@/components/Button'

import type { IUserSetupAddress } from '@/types/modules/user'

interface IUserSetupProfileAddressFormProps {
  onBack?: (values: IUserSetupAddress) => void
  data?: IUserSetupAddress
  onSubmit: (values: IUserSetupAddress) => void
  isLoading?: boolean
}

const initialValues: IUserSetupAddress = { address: '', subDistrict: '', district: '', province: '', zipCode: '' }

const UserSetupProfileAddressForm: FC<IUserSetupProfileAddressFormProps> = ({
  data = initialValues,
  onSubmit,
  onBack,
  isLoading = false,
}) => {
  const { i18n } = useLingui()

  const validationSchema = yup.object().shape({
    address: yup.string().required(t`กรุณากรอกที่อยู่`),
    subDistrict: yup.string().required(t`กรุณากรอกตำบล/แขวง`),
    district: yup.string().required(t`กรุณากรอกเขต/อำเภอ`),
    province: yup.string().required(t`กรุณากรอกจังหวัด`),
    zipCode: yup.string().required(t`กรุณากรอกรหัสไปรษณีย์`),
  })

  // _State
  const [isAccept, setIsAccept] = useState<boolean>(true)

  // _Form
  const formik = useFormik<IUserSetupAddress>({
    initialValues: data,
    validationSchema,
    onSubmit: (values) => {
      if (isAccept) onSubmit(values)
    },
  })

  // _Address
  const { addressList, onBlurAddress, onChangeAddress, onSelectedAddress } = useAddressForm(formik)

  return (
    <form onSubmit={formik.handleSubmit} className={clsx(`flex flex-col`)}>
      <IoArrowBack
        className={clsx(`cursor-pointer square-8`, `transition-opacity hover:opacity-50`)}
        onClick={() => onBack(formik.values)}
      />

      <UserTitle className={clsx(`text-center`)}>{i18n._(t`ที่อยู่`)}</UserTitle>

      <div className={clsx(`mt-6`)}>
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

      <div className={clsx(`mt-4`)}>
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

      <div className={clsx(`mt-4`)}>
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

      <div className={clsx(`mt-4`)}>
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

      <div className={clsx(`mt-4`)}>
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

      <Checkbox className={clsx(`mt-4 self-center`)} checked={isAccept} onChange={() => setIsAccept((e) => !e)}>
        <span>
          <Trans>
            ฉันยอมรับ
            <Link href="/terms-of-service" target="_blank" className="text-primary-500 hover:opacity-50">
              เงื่อนไขข้อตกลงการบริการ
            </Link>{' '}
            และ
            <Link href="/privacy-policy" target="_blank" className="text-primary-500 hover:opacity-50">
              และนโยบายความเป็นส่วนตัว
            </Link>
          </Trans>
        </span>
      </Checkbox>

      <Button variant="primary" type="submit" className={clsx(`mt-6 w-full`)} disabled={!isAccept} loading={isLoading}>
        <span>{i18n._(t`ยืนยัน`)}</span>
      </Button>
    </form>
  )
}

export default UserSetupProfileAddressForm
