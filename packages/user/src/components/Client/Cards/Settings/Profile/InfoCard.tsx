import type { FC } from 'react'
import { useMemo, Fragment } from 'react'

import { Card, Divider, Input, SvgIcon } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { AuthErrorCodes } from 'firebase/auth'

import { useClientSettingProfileInfoModal } from '@/components/Client/Modals/Settings/Profile/InfoModal/hooks'
import ClientSettingProfileInfoModal from '@/components/Client/Modals/Settings/Profile/InfoModal'
import { AuthService, UserService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'
import Button from '@/components/Button'
import ClientSettingProfileCreatePasswordModal from '@/components/Client/Modals/Settings/Profile/CreatePasswordModal'
import { useClientSettingProfileCreatePasswordModal } from '@/components/Client/Modals/Settings/Profile/CreatePasswordModal/hooks'
import { useUserStore } from '@/stores/user'

import type { IUserSettingProfile, IUserSetupInfo } from '@/types/modules/user'
import type { IAuthEventError } from '@/types/auth'

interface IClientSettingProfileInfoCardProps {
  data?: IUserSettingProfile
  refetch?: VoidFunction
}

const ClientSettingProfileInfoCard: FC<IClientSettingProfileInfoCardProps> = ({ data, refetch }) => {
  const { i18n } = useLingui()
  const { show: showEditInfoModal, close: closeEditInfoModal } = useClientSettingProfileInfoModal()
  const { show: showCreatePasswordModal, close: closeCreatePasswordModal } =
    useClientSettingProfileCreatePasswordModal()
  const {
    profile,
    firebase: { providerData },
  } = useUserStore()

  const accountInformation = data?.accountInformation
  const accountVerification = data?.accountVerification

  // _Mutation
  const { mutate, isLoading } = useMutation((payload: IUserSetupInfo) => UserService.updateProfileInfo(payload), {
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
    },
    onSuccess: () => {
      closeEditInfoModal()
      toast.success(i18n._(t`แก้ไขข้อมูลสำเร็จ`))
      refetch?.()
    },
  })

  const { mutate: resetPassword, isLoading: isResetPasswordLoading } = useMutation(
    () => AuthService.sendResetPassword(profile?.email),
    {
      onError: (error: IAuthEventError) => {
        if (error.code === AuthErrorCodes.USER_DELETED) {
          toast.error(i18n._(t`อีเมลไม่ถูกต้อง`))
        } else {
          toast.error(error.code)
        }
      },
      onSuccess: () => {
        toast.success(i18n._(t`โปรดตรวจสอบอีเมลของท่าน`))
      },
    },
  )

  // _Memo
  const isAlreadyPassword = useMemo(() => {
    return Boolean(providerData?.find((e) => e.providerId === 'password'))
  }, [providerData])

  return (
    <Fragment>
      <Card
        title={i18n._(t`ข้อมูลเกี่ยวกับบัญชี`)}
        headerRight={
          <Button variant="warning" size="small" buttonType="icon" onClick={showEditInfoModal}>
            <SvgIcon name="edit" />
          </Button>
        }
        className={clsx(`space-y-4`)}
      >
        <div>
          <label>{i18n._(t`ชื่อ - นามสกุล ภาษาไทย (TH)`)}</label>
          <Input className={clsx(`mt-2`)} value={accountInformation?.nameTh} disabled />
        </div>
        <div>
          <label>{i18n._(t`ชื่อ - นามสกุล ภาษาอังกฤษ (EN)`)}</label>
          <Input className={clsx(`mt-2`)} value={accountInformation?.nameEn} disabled />
        </div>
        <div>
          <label>{i18n._(t`เบอร์โทรศัพท์มือถือ`)}</label>
          <Input className={clsx(`mt-2`)} value={accountInformation?.tel} disabled />
        </div>
        <div>
          <label>{i18n._(t`อีเมล`)}</label>
          <Input className={clsx(`mt-2`)} value={accountInformation?.email} disabled />
        </div>

        <Divider />

        <div className={clsx(`!mt-6 flex items-center justify-between space-x-3`)}>
          <h3 className={clsx(`text-header-3`)}>{i18n._(t`จัดการรหัสผ่าน`)}</h3>

          {!isAlreadyPassword && (
            <Button variant="info" size="small" className={clsx(`!px-2`)} onClick={showCreatePasswordModal}>
              {i18n._(t`สร้างรหัสผ่าน`)}
            </Button>
          )}

          {isAlreadyPassword && (
            <Button
              variant="info"
              size="small"
              className={clsx(`!px-2`)}
              onClick={() => resetPassword()}
              loading={isResetPasswordLoading}
            >
              {i18n._(t`รีเซ็ตรหัสผ่าน`)}
            </Button>
          )}
        </div>

        <div>
          <label>{i18n._(t`รหัสผ่าน`)}</label>
          <Input className={clsx(`mt-2`)} value={isAlreadyPassword ? '*******************' : '-'} disabled />
        </div>
      </Card>

      {data && accountVerification && (
        <ClientSettingProfileInfoModal
          data={accountInformation}
          verification={accountVerification}
          isLoading={isLoading}
          onSubmit={(values) => {
            mutate(values)
          }}
        />
      )}

      {/* Modals */}
      {!isAlreadyPassword && (
        <ClientSettingProfileCreatePasswordModal
          onSuccess={() => {
            closeCreatePasswordModal()
          }}
        />
      )}
    </Fragment>
  )
}

export default ClientSettingProfileInfoCard
