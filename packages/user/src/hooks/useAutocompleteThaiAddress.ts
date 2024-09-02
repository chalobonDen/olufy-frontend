import type { ChangeEvent } from 'react'
import { useEffect, useCallback, useState } from 'react'

import type { IAutoCompleteItem } from '@olufy-frontend/shared/UI/Input/AutoComplete'
import { useThaiAddress } from 'react-thai-address-hook'

import type { IAutoCompleteAddressResponse } from '@/types/address'

export const useAutocompleteThaiAddress = () => {
  const { searchAddressByAmphoe, searchAddressByDistrict, searchAddressByProvince, searchAddressByZipcode } =
    useThaiAddress()

  // _State
  const [addressList, addAddressList] = useState<IAutoCompleteItem<IAutoCompleteAddressResponse>[]>([])

  // _Events
  const transformAddressForAutoComplete = (
    data: IAutoCompleteAddressResponse,
  ): IAutoCompleteItem<IAutoCompleteAddressResponse> => {
    return {
      data,
      label: `${data.district} / ${data.amphoe} / ${data.province} / ${String(data.zipcode)}`,
      value: String(data.zipcode),
    }
  }

  const onSearchAddressByAmphoe = (e: ChangeEvent<HTMLInputElement>) => {
    const result = searchAddressByAmphoe(e.target.value) as IAutoCompleteAddressResponse[]
    return result.map((data) => transformAddressForAutoComplete(data))
  }

  const onSearchAddressByDistrict = (e: ChangeEvent<HTMLInputElement>) => {
    const result = searchAddressByDistrict(e.target.value) as IAutoCompleteAddressResponse[]
    return result.map((data) => transformAddressForAutoComplete(data))
  }

  const onSearchAddressByProvince = (e: ChangeEvent<HTMLInputElement>) => {
    const result = searchAddressByProvince(e.target.value) as IAutoCompleteAddressResponse[]
    return result.map((data) => transformAddressForAutoComplete(data))
  }

  const onSearchAddressByZipcode = (e: ChangeEvent<HTMLInputElement>) => {
    const result = searchAddressByZipcode(e.target.value) as IAutoCompleteAddressResponse[]
    return result.map((data) => transformAddressForAutoComplete(data))
  }

  const onSearchAddress = (e: ChangeEvent<HTMLInputElement>) => {
    let result = []

    switch (e.target.name) {
      case 'district':
        result = onSearchAddressByAmphoe(e)
        break

      case 'subDistrict':
        result = onSearchAddressByDistrict(e)
        break

      case 'province':
        result = onSearchAddressByProvince(e)
        break

      case 'zipCode':
        result = onSearchAddressByZipcode(e)
        break
    }

    addAddressList(result)
    return result
  }

  return {
    onSearchAddressByAmphoe,
    onSearchAddressByDistrict,
    onSearchAddressByProvince,
    onSearchAddressByZipcode,
    //
    addressList,
    onSearchAddress,
  }
}

export const useAddressForm = (formik: any) => {
  const { addressList, onSearchAddress } = useAutocompleteThaiAddress()

  // _State
  const [tempAddress, setTempAddress] = useState<IAutoCompleteAddressResponse | null>(null)

  // _Callback
  const clearAutoAddress = useCallback(() => {
    formik.setValues({
      ...formik.values,
      district: '',
      subDistrict: '',
      province: '',
      zipCode: '',
    })
  }, [formik])

  const onSelectedAddress = useCallback(
    (e: IAutoCompleteItem<IAutoCompleteAddressResponse>) => {
      setTempAddress(e.data)
      formik.setValues({
        ...formik.values,
        district: e.data.amphoe,
        subDistrict: e.data.district,
        province: e.data.province,
        zipCode: String(e.data.zipcode),
      })
    },
    [formik],
  )

  const onChangeAddress = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSearchAddress(e)
      formik.handleChange(e)

      if (!e.target.value) {
        clearAutoAddress()
        setTempAddress(null)
      }
    },
    [clearAutoAddress, formik, onSearchAddress],
  )

  const onBlurAddress = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (tempAddress) {
        formik.setValues({
          ...formik.values,
          district: tempAddress.amphoe,
          subDistrict: tempAddress.district,
          province: tempAddress.province,
          zipCode: String(tempAddress.zipcode),
        })
        return
      }

      clearAutoAddress()
    },
    [clearAutoAddress, formik, tempAddress],
  )

  // _Effect
  useEffect(() => {
    const district = formik.values?.district
    const province = formik.values?.province
    const subDistrict = formik.values?.subDistrict
    const zipCode = formik.values?.zipCode

    if (district && province && subDistrict && zipCode) {
      setTempAddress({
        amphoe: district,
        district: subDistrict,
        province,
        zipcode: zipCode,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    addressList,
    onSelectedAddress,
    onChangeAddress,
    onBlurAddress,
    setTempAddress,
  }
}
