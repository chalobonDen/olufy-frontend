import type { FC } from 'react'
import { useCallback, useState, useEffect } from 'react'

import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import clsx from 'clsx'
import { Countdown, Modal, SvgIcon } from '@olufy-frontend/shared/UI'
import type { IModalProps } from '@olufy-frontend/shared/UI/Modal/types'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { differenceInSeconds } from 'date-fns'

import { UserService } from '@/services'
import { CALLBACK_URL_VERIFY_EMAIL } from '@/constants'
import { handleAxiosErrorMsg } from '@/libs/axios'
import Button from '@/components/Button'
import { useSetting } from '@/hooks/stores/useSetting'

import { useClientSettingProfileVerifyEmailModal } from './hooks'

import type { IUserSetupInfo } from '@/types/modules/user'

interface IClientSettingProfileVerifyEmailModalProps extends IModalProps {
  data: IUserSetupInfo
  urlOrigin: string
}

const LAST_VERIFY_EMAIL = 'last_verify_email'
const RESEND_SEC = 60

const ClientSettingProfileVerifyEmailModal: FC<IClientSettingProfileVerifyEmailModalProps> = ({
  data,
  urlOrigin,
  ...props
}) => {
  const { visible, close } = useClientSettingProfileVerifyEmailModal()
  const { i18n } = useLingui()
  const { lang } = useSetting()

  // _State
  const [countStart, setCountStart] = useState<number>(0)

  // _Mutation
  const { mutate, isLoading } = useMutation(
    (payload: { email: string; confirmUrl: string }) => UserService.verifyEmail(payload),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        onCloseModal()
        toast.success(i18n._(t`โปรดตรวจสอบอีเมลของท่าน`))
        checkCountdown()
      },
    },
  )

  // _Events
  const onCloseModal = () => {
    if (isLoading) return
    close()
    setCountStart(0)
  }

  const onSubmit = () => {
    localStorage.setItem(LAST_VERIFY_EMAIL, String(new Date().getTime()))

    mutate({
      email: data?.email,
      confirmUrl: `${urlOrigin}/${lang}${CALLBACK_URL_VERIFY_EMAIL}`,
    })
  }

  const checkCountdown = useCallback(() => {
    const lastVerifyEmail = localStorage.getItem(LAST_VERIFY_EMAIL)
    if (lastVerifyEmail) {
      const sec = differenceInSeconds(new Date(), new Date(Number(lastVerifyEmail)))
      if (sec < RESEND_SEC) {
        setCountStart(RESEND_SEC - sec)
      } else {
        setCountStart(0)
        localStorage.removeItem(LAST_VERIFY_EMAIL)
      }
    }
  }, [])

  // _Effect
  useEffect(() => {
    if (visible) checkCountdown()
  }, [checkCountdown, visible])

  return (
    <Modal
      visible={visible}
      closeModal={onCloseModal}
      {...props}
      size="small"
      contentClassName={clsx(`items-center text-center`)}
    >
      <SvgIcon name="email" className={clsx(`square-[120px]`)} />

      <div className={clsx(`mt-4 text-header-3`)}>{i18n._(t`ยืนยันอีเมลของคุณ`)}</div>
      <p className={clsx(`mt-2`)}>
        <Trans>
          คุณได้กรอกอีเมลนี้ <strong>{data?.email}</strong> ในการสมัครสมาชิกของคุณ
          โปรดยืนยันอีเมลนี้โดยคลิกที่ปุ่มด้านล่าง
        </Trans>
      </p>

      {visible && countStart > 0 ? (
        <Button variant="primary" className={clsx(`mt-6 w-full`)} disabled>
          <span>
            <Countdown
              countStart={countStart}
              onFinish={() => {
                setCountStart(0)
              }}
            />{' '}
            {i18n._(t`วินาที`)}
          </span>
        </Button>
      ) : (
        <Button variant="primary" className={clsx(`mt-6 w-full`)} onClick={onSubmit} loading={isLoading}>
          <span>{i18n._(t`ตกลง`)}</span>
        </Button>
      )}
    </Modal>
  )
}

export default ClientSettingProfileVerifyEmailModal
