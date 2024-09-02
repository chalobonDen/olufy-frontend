import type { FC } from 'react'

import { useLingui } from '@lingui/react'
import type { IModalProps } from '@olufy-frontend/shared/UI/Modal/types'
import { useMutation } from '@tanstack/react-query'
import { Button, Input, Modal } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'
import { toast } from 'react-hot-toast'

import { AuthService } from '@/services'
import { useUserStore } from '@/stores/user'
import { validateFieldPassword } from '@/utils'
import { handleAxiosErrorMsg } from '@/libs/axios'

import { useClientSettingProfileCreatePasswordModal } from './hooks'

interface IClientSettingProfileCreatePasswordModalProps extends IModalProps {
  onSuccess?: VoidFunction
}

const ClientSettingProfileCreatePasswordModal: FC<IClientSettingProfileCreatePasswordModalProps> = ({
  onSuccess,
  closeModal,
  ...props
}) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { visible, close } = useClientSettingProfileCreatePasswordModal()

  // _Events
  const handleCloseModal = () => {
    close?.()
    closeModal?.()
  }

  // _Mutation
  const { mutate, isLoading } = useMutation(
    (password: string) => AuthService.linkWithEmailPassword({ email: profile?.email, password }),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        toast.success(i18n._(t`สร้างรหัสผ่านสำเร็จ`))
        onSuccess?.()
      },
    },
  )

  return (
    <Modal
      visible={visible}
      title={i18n._(t`สร้างรหัสผ่าน`)}
      closeModal={handleCloseModal}
      isLoading={isLoading}
      {...props}
    >
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={yup.object({
          password: validateFieldPassword,
          confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], i18n._(t`รหัสผ่านไม่ตรงกัน`))
            .required(i18n._(t`กรุณากรอกยืนยันรหัสผ่าน`)),
        })}
        onSubmit={(values) => {
          mutate?.(values.password)
        }}
      >
        {(formik) => (
          <Form className={clsx(`space-y-4`)}>
            <div>
              <label htmlFor="password">{i18n._(t`รหัสผ่านใหม่`)}</label>
              <Input.Password
                id="password"
                name="password"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกรหัสผ่าน`)}
                onChange={formik.handleChange}
                value={formik.values.password}
                error={getErrorWithTouched(formik, 'password')}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">{i18n._(t`ยืนยันรหัสผ่าน`)}</label>
              <Input.Password
                id="confirmPassword"
                name="confirmPassword"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกยืนยันรหัสผ่านอีกครั้ง`)}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                error={getErrorWithTouched(formik, 'confirmPassword')}
              />
            </div>
            <Button type="submit" variant="primary" className={clsx('w-full')}>
              {i18n._(t`สร้าง`)}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default ClientSettingProfileCreatePasswordModal
