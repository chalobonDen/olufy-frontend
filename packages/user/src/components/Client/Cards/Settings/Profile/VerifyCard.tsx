import type { FC } from 'react'
import { Fragment } from 'react'

import { Card, SvgIcon } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import ClientSettingProfileVerifyEmailModal from '@/components/Client/Modals/Settings/Profile/VerifyEmailModal'
import { useClientSettingProfileVerifyEmailModal } from '@/components/Client/Modals/Settings/Profile/VerifyEmailModal/hooks'
import { useClientSettingProfileVerifyIdentificationModal } from '@/components/Client/Modals/Settings/Profile/VerifyIdentificationModal/hooks'
import ClientSettingProfileVerifyIdentificationModal from '@/components/Client/Modals/Settings/Profile/VerifyIdentificationModal'
import ClientSettingProfileVerifyOtpModal from '@/components/Client/Modals/Settings/Profile/VerifyOtpModal'
import { useClientSettingProfileVerifyOtpModal } from '@/components/Client/Modals/Settings/Profile/VerifyOtpModal/hooks'
import { UserService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'
import Button from '@/components/Button'

import type { IUserSettingProfile } from '@/types/modules/user'
import { AccountVerityStatus } from '@/enums/verify'

interface IClientSettingProfileVerifyCardProps {
  data?: IUserSettingProfile
  urlOrigin?: string
  refetch?: VoidFunction
}

const VerifySuccess = ({ text }: { text: string }) => {
  return (
    <Button
      variant="success"
      isInvert
      className={clsx(`no-hover pointer-events-none w-full justify-between space-x-2 !px-4 py-2`, `xl:!px-3`)}
    >
      <span className={clsx(`text-left text-body-18`, `xl:text-body-16`)}>{text}</span>
      <SvgIcon name="verified" className={clsx(`square-7`, `xl:square-6`)} />
    </Button>
  )
}

const ConfirmButton = ({ text, onClick }: { text: string; onClick: VoidFunction }) => {
  return (
    <Button variant="danger" className={clsx(`w-full space-x-2 !px-4 py-2`, `xl:!px-3`)} onClick={onClick}>
      <span className={clsx(`text-left text-body-18 !font-light`, `xl:text-body-16`)}>{text}</span>
      <SvgIcon name="info-circle" className={clsx(`square-7`, `xl:square-6`)} />
    </Button>
  )
}

const PendingButton = ({ text }: { text: string }) => {
  return (
    <Button
      variant="warning"
      className={clsx(`no-hover pointer-events-none w-full justify-between space-x-2 !px-4 py-2`, `xl:!px-3`)}
    >
      <span className={clsx(`text-left text-body-18 !font-light`, `xl:text-body-16`)}>{text}</span>
      <SvgIcon name="info-circle" className={clsx(`square-7`, `xl:square-6`)} />
    </Button>
  )
}

const ClientSettingProfileVerifyCard: FC<IClientSettingProfileVerifyCardProps> = ({ data, urlOrigin, refetch }) => {
  const { i18n } = useLingui()
  const { show: showVerifyEmailModal } = useClientSettingProfileVerifyEmailModal()
  const { show: showVerifyOtpModal } = useClientSettingProfileVerifyOtpModal()
  const { show: showVerifyIdentificationModal, close: closeVerifyIdentificationModal } =
    useClientSettingProfileVerifyIdentificationModal()

  // _Mutation
  const { mutate: uploadIdentity, isLoading: isUploadIdentityLoading } = useMutation(
    (payload: FormData) => UserService.uploadIdentity(payload),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        closeVerifyIdentificationModal()
        toast.success(i18n._(t`อัพโหลดข้อมูลสำเร็จ รอการยืนยันอีกครั้ง`))
        refetch?.()
      },
    },
  )

  return (
    <Fragment>
      <Card title={i18n._(t`ยืนยันตัวตน`)} className={clsx(`space-y-4`)}>
        <div className={clsx(`space-y-2`)}>
          <div>{i18n._(t`ยืนยันอีเมล`)}</div>
          {data?.accountVerification?.email ? (
            <VerifySuccess text={i18n._(t`ยืนยันอีเมลแล้ว`)} />
          ) : (
            <ConfirmButton text={i18n._(t`ยืนยันอีเมล`)} onClick={showVerifyEmailModal} />
          )}
        </div>

        <div className={clsx(`space-y-2`)}>
          <div>{i18n._(t`ยืนยันเบอร์โทรศัพท์มือถือ`)}</div>
          {data?.accountVerification?.mobile ? (
            <VerifySuccess text={i18n._(t`ยืนยันเบอร์โทรศัพท์มือถือแล้ว`)} />
          ) : (
            <ConfirmButton text={i18n._(t`ยืนยันเบอร์โทรศัพท์มือถือ`)} onClick={showVerifyOtpModal} />
          )}
        </div>

        <div className={clsx(`space-y-2`)}>
          <div>{i18n._(t`ยืนยัน`)}</div>
          {!data?.accountVerification?.identityCardFlag ? (
            <Fragment>
              {data?.accountVerification?.identityCard ? (
                <VerifySuccess text={i18n._(t`ยืนยันบัตรประชาชนแล้ว`)} />
              ) : (
                <ConfirmButton text={i18n._(t`ยืนยันบัตรประชาชน`)} onClick={showVerifyIdentificationModal} />
              )}
            </Fragment>
          ) : (
            <Fragment>
              {data?.accountVerification?.identityCardFlag === AccountVerityStatus.DONE && (
                <VerifySuccess text={i18n._(t`ยืนยันบัตรประชาชนแล้ว`)} />
              )}
              {data?.accountVerification?.identityCardFlag === AccountVerityStatus.PENDING && (
                <PendingButton text={i18n._(t`รอการตรวจสอบ`)} />
              )}
              {data?.accountVerification?.identityCardFlag === AccountVerityStatus.REJECT && (
                <ConfirmButton text={i18n._(t`โปรดยืนยันอีกครั้ง`)} onClick={showVerifyIdentificationModal} />
              )}
            </Fragment>
          )}
        </div>

        <div className={clsx(`rounded-lg bg-red-500/10 p-2 text-red-500`)}>
          <div className={clsx(`text-body-14`)}>{i18n._(t`หมายเหตุ!`)}</div>
          <p className={clsx(`text-body-12 font-light`)}>
            {i18n._(
              t`เพื่อการยืนยันตัวบุคคลที่ไม่ปลอมแปลง อีเมล และเบอร์โทรศัพท์มือถือ อีกทั้งเพื่อสิทธิพิเศษสำหรับการใช้งานบริการจาก Olufy.com รวมไปถึงระบบความปลอดภัยของบัญชีผู้ใช้งาน`,
            )}
          </p>
        </div>
      </Card>

      <ClientSettingProfileVerifyEmailModal data={data?.accountInformation} urlOrigin={urlOrigin} />
      <ClientSettingProfileVerifyOtpModal data={data?.accountInformation} onFinish={refetch} />
      <ClientSettingProfileVerifyIdentificationModal
        onSubmit={(values) => {
          uploadIdentity(values)
        }}
        isLoading={isUploadIdentityLoading}
      />
    </Fragment>
  )
}

export default ClientSettingProfileVerifyCard
