import { useState } from 'react'

import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { t } from '@lingui/macro'

import UserCard from '@/components/UI/User/Card'
import UserSetupProfileInfoForm from '@/components/User/Forms/SetupProfile/InfoForm'
import UserSetupProfileAddressForm from '@/components/User/Forms/SetupProfile/AddressForm'
import { UserService } from '@/services'
import { useUserStore } from '@/stores/user'
import type { DocumentProps } from '@/renderer/types'
import useRouter from '@/hooks/useRouter'

import type { IUserSetup, IUserSetupAddress, IUserSetupInfo } from '@/types/modules/user'
import { Layout } from '@/enums'

enum SetupProfile {
  INFO,
  ADDRESS,
}

export const Page = () => {
  const { setSetupNewUser } = useUserStore()
  const { push } = useRouter()

  // _State
  const [step, setStep] = useState<SetupProfile>(SetupProfile.INFO)
  const [infoValues, setInfoValues] = useState<IUserSetupInfo>({
    email: '',
    nameEn: '',
    nameTh: '',
    tel: '',
  })
  const [addressValues, setAddressValues] = useState<IUserSetupAddress>({
    address: '',
    district: '',
    province: '',
    subDistrict: '',
    zipCode: '',
  })

  // _Mutations
  const { mutate: setupProfile, isLoading } = useMutation((payload: IUserSetup) => UserService.setup(payload), {
    onSuccess: () => {
      setSetupNewUser({
        nameEn: infoValues.nameEn,
        nameTh: infoValues.nameTh,
        isNewUser: false,
      })
      push(`/app/`)
    },
  })

  // _Events
  const onSubmit = (values: IUserSetupAddress) => {
    setupProfile({
      ...infoValues,
      address: {
        ...values,
        zipCode: String(values.zipCode),
      },
    })
  }

  return (
    <UserCard className={clsx(`flex w-[547px] max-w-full flex-col p-8`, `sm:px-4`)}>
      {step === SetupProfile.INFO && (
        <UserSetupProfileInfoForm
          data={infoValues}
          onSubmit={(values) => {
            setInfoValues(values)
            setStep(SetupProfile.ADDRESS)
          }}
        />
      )}
      {step === SetupProfile.ADDRESS && (
        <UserSetupProfileAddressForm
          data={addressValues}
          onSubmit={onSubmit}
          onBack={(values) => {
            setAddressValues(values)
            setStep(SetupProfile.INFO)
          }}
          isLoading={isLoading}
        />
      )}
    </UserCard>
  )
}

export const layout = Layout.LOGIN
export const requireAuth = true

export const documentProps: DocumentProps = {
  title: t`ตั้่งค่าโปรไฟล์`,
}
