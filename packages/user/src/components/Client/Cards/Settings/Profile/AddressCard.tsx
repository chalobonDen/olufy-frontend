import type { FC } from 'react'
import { Fragment } from 'react'

import { Card, Input, SvgIcon } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import ClientSettingProfileAddressModal from '@/components/Client/Modals/Settings/Profile/AddressModal'
import { useClientSettingProfileAddressModal } from '@/components/Client/Modals/Settings/Profile/AddressModal/hooks'
import { UserService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'
import Button from '@/components/Button'

import type { IUserSettingProfile, IUserSetupAddress } from '@/types/modules/user'

interface IClientSettingProfileAddressCardProps {
  data?: IUserSettingProfile
  refetch?: VoidFunction
}

const ClientSettingProfileAddressCard: FC<IClientSettingProfileAddressCardProps> = ({ data, refetch }) => {
  const { i18n } = useLingui()
  const { show: showEditAddressModal, close: closeEditAddressModal } = useClientSettingProfileAddressModal()
  const accountAddress = data?.accountAddress

  // _Mutation
  const { mutate, isLoading } = useMutation((payload: IUserSetupAddress) => UserService.updateProfileAddress(payload), {
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
    },
    onSuccess: () => {
      closeEditAddressModal()
      toast.success(i18n._(t`แก้ไขข้อมูลสำเร็จ`))
      refetch?.()
    },
  })

  return (
    <Fragment>
      <Card
        title={i18n._(t`ที่อยู่`)}
        headerRight={
          <Button variant="warning" size="small" buttonType="icon" onClick={showEditAddressModal}>
            <SvgIcon name="edit" />
          </Button>
        }
        className={clsx(`space-y-4`)}
      >
        <div>
          <label>{i18n._(t`ที่อยู่`)}</label>
          <Input className={clsx(`mt-2`)} value={accountAddress?.address} disabled />
        </div>

        <div className={clsx(`grid grid-cols-2 gap-4`, `md:grid-cols-1`)}>
          <div>
            <label>{i18n._(t`ตำบล/แขวง`)}</label>
            <Input className={clsx(`mt-2`)} value={accountAddress?.subDistrict} disabled />
          </div>
          <div>
            <label>{i18n._(t`เขต/อำเภอ`)}</label>
            <Input className={clsx(`mt-2`)} value={accountAddress?.district} disabled />
          </div>
          <div>
            <label>{i18n._(t`จังหวัด`)}</label>
            <Input className={clsx(`mt-2`)} value={accountAddress?.province} disabled />
          </div>
          <div>
            <label>{i18n._(t`รหัสไปรษณีย์`)}</label>
            <Input className={clsx(`mt-2`)} value={accountAddress?.zipCode} disabled />
          </div>
        </div>
      </Card>

      {data && (
        <ClientSettingProfileAddressModal
          data={accountAddress}
          isLoading={isLoading}
          onSubmit={(values) => {
            mutate(values)
          }}
        />
      )}
    </Fragment>
  )
}

export default ClientSettingProfileAddressCard
