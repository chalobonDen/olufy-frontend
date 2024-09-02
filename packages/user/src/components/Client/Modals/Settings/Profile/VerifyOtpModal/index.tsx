import type { FC } from 'react'
import { useEffect, useRef, useCallback, useState, Fragment } from 'react'

import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import clsx from 'clsx'
import { Countdown, Modal, SvgIcon } from '@olufy-frontend/shared/UI'
import type { IModalProps } from '@olufy-frontend/shared/UI/Modal/types'
import { toast } from 'react-hot-toast'
import * as pinInput from '@zag-js/pin-input'
import { useMachine, normalizeProps } from '@zag-js/react'
import { range } from 'lodash-es'
import { useMutation } from '@tanstack/react-query'
import { differenceInSeconds } from 'date-fns'

import { useUserStore } from '@/stores/user'
import { UserService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'
import Button from '@/components/Button'

import { useClientSettingProfileVerifyOtpModal } from './hooks'

import type { IUserSetupInfo } from '@/types/modules/user'

interface IClientSettingProfileVerifyOtpModalProps extends IModalProps {
  data: IUserSetupInfo
  onFinish?: VoidFunction
}

const LAST_REQUEST_OTP = 'last_request_otp'
const RESEND_SEC = 60

const ClientSettingProfileVerifyOtpModal: FC<IClientSettingProfileVerifyOtpModalProps> = ({
  data,
  onFinish,
  ...props
}) => {
  const { visible, close } = useClientSettingProfileVerifyOtpModal()
  const { i18n } = useLingui()
  const requestData = useRef<{ token: string; refno: string }>({ token: '', refno: '' })

  // _State
  const [isShowPin, setIsShowPin] = useState(false)
  const [countStart, setCountStart] = useState<number>(0)

  // _Mutation
  const { mutate: requestOTP, isLoading: isRequestOTPLoading } = useMutation(() => UserService.requestOtp(), {
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
    },
    onSuccess: (res) => {
      requestData.current = {
        token: res.token,
        refno: res.refno,
      }

      toast.success(i18n._(t`โปรดตรวจสอบข้อความบนมือถือของท่าน`))
      setIsShowPin(true)
      checkCountdown()
    },
  })

  const { mutate: confirmOTP, isLoading: isConfirmOTPLoading } = useMutation(
    (payload: { otp: string; token: string }) => UserService.verifyOtp(payload),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        toast.success(i18n._(t`ยืนยันเบอร์โทรศัพท์มือถือสำเร็จ`))
        setIsShowPin(false)
        onCloseModal()
        onFinish?.()
      },
    },
  )

  // _Callback
  const handlePinInputConplete = useCallback(
    (otp: string) => {
      confirmOTP({
        otp,
        token: requestData.current.token,
      })
    },
    [confirmOTP],
  )

  const checkCountdown = useCallback(() => {
    const lastVerifyEmail = localStorage.getItem(LAST_REQUEST_OTP)
    if (lastVerifyEmail) {
      const sec = differenceInSeconds(new Date(), new Date(Number(lastVerifyEmail)))
      if (sec < RESEND_SEC) {
        setCountStart(RESEND_SEC - sec)
      } else {
        setCountStart(0)
        localStorage.removeItem(LAST_REQUEST_OTP)
      }
    }
  }, [])

  // _PIN
  const [state, send] = useMachine(
    pinInput.machine({
      id: 'pinOTP',
      value: ['', '', '', '', '', ''],
      otp: true,
      onComplete(details) {
        handlePinInputConplete(details.valueAsString)
      },
    }),
  )
  const pinApi = pinInput.connect(state, send, normalizeProps)

  // _Events
  const onCloseModal = () => {
    close()
  }

  const onSubmit = () => {
    localStorage.setItem(LAST_REQUEST_OTP, String(new Date().getTime()))
    requestOTP()
  }

  // _Effect
  useEffect(() => {
    if (visible) checkCountdown()
  }, [checkCountdown, visible])

  return (
    <Modal
      visible={visible}
      closeModal={onCloseModal}
      {...props}
      contentClassName={clsx(`items-center text-center`)}
      isLoading={isConfirmOTPLoading}
    >
      <SvgIcon name="sms" className={clsx(`square-[120px]`)} />

      {!isShowPin && (
        <Fragment>
          <div className={clsx(`mt-4 text-header-3`)}>{i18n._(t`ยืนยันเบอร์โทรศัพท์มือถือ`)}</div>
          <p className={clsx(`mt-2`)}>
            <Trans>
              คุณได้กรอกเบอร์โทรศัพท์มือถือนี้ <strong>{data?.tel}</strong> ในการสมัครสมาชิกของคุณ
              โปรดยืนยันเบอร์โทรศัพท์มือถือนี้โดยคลิกที่ปุ่มด้านล่าง
            </Trans>
          </p>

          <Button variant="primary" className={clsx(`mt-6 w-full`)} onClick={onSubmit} loading={isRequestOTPLoading}>
            <span>{i18n._(t`ยืนยันเบอร์โทรศัพท์มือถือ`)}</span>
          </Button>
        </Fragment>
      )}

      {isShowPin && (
        <Fragment>
          <div className={clsx(`mt-4 text-header-3`)}>{i18n._(t`ยืนยันเบอร์โทรศัพท์มือถือ`)}</div>
          <p className={clsx(`mt-2 text-header-5`)}>Ref: {requestData.current.refno}</p>
          <p className={clsx(`mt-2`)}>
            <Trans>
              หมายเลข OTP ได้ถูกส่งไปยังเบอร์มือถือที่ลงท้ายด้วย{' '}
              <strong>x-{data?.tel.substring(data?.tel.length - 4, data?.tel.length)}</strong> แล้ว
            </Trans>
          </p>

          <div {...pinApi.rootProps} className={clsx(`mt-6 flex space-x-2`, `se:space-x-1`)}>
            {range(0, 6).map((n) => (
              <input
                key={`pin-${n}`}
                {...pinApi.getInputProps({ index: n })}
                className={clsx(
                  `flex-1 rounded-lg border p-0 text-center text-header-3 square-[74px]`,
                  `sm:h-14 sm:w-12`,
                  `se:h-12 se:w-10`,
                )}
              />
            ))}
          </div>

          <strong className={clsx(`mt-6`)}>{i18n._(t`ขอ OTP ใหม่ใน`)}</strong>
          {countStart > 0 ? (
            <strong>
              <Countdown
                countStart={countStart}
                onFinish={() => {
                  setCountStart(0)
                }}
              />{' '}
              {i18n._(t`วินาที`)}
            </strong>
          ) : (
            <strong className={clsx(`cursor-pointer text-primary-500`)} onClick={onSubmit}>
              {i18n._(t`ส่งรหัสอีกครั้ง`)}
            </strong>
          )}
        </Fragment>
      )}
    </Modal>
  )
}

export default ClientSettingProfileVerifyOtpModal
