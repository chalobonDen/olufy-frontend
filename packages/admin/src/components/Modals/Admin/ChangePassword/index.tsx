import type { FC } from 'react'

import clsx from 'clsx'
import { Button, Input, Modal } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'
import { Form, Formik } from 'formik'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'
import * as yup from 'yup'
import type { IModalProps } from '@olufy-frontend/shared/UI/Modal/types'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useLingui } from '@lingui/react'

import { UserService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'
import { validateFieldPassword } from '@/utils'

interface IAdminChangePasswordModalProps extends IModalProps {
  adminId: number
  onSuccess?: VoidFunction
}

const AdminChangePasswordModal: FC<IAdminChangePasswordModalProps> = ({ adminId, onSuccess, closeModal, ...props }) => {
  const { i18n } = useLingui()

  // _Events
  const handleCloseModal = () => {
    closeModal?.()
  }

  // _Mutation
  const { mutate: changePassword, isLoading: isChangePasswordLoading } = useMutation(
    (payload: { id: number; password: string }) => UserService.changePassword(payload),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        toast.success(i18n._(t`เปลี่ยนรหัสผ่านสำเร็จ`))
        onSuccess?.()
      },
    },
  )

  return (
    <Modal
      {...props}
      title={i18n._(t`แก้ไขรหัสผ่าน`)}
      closeModal={handleCloseModal}
      isLoading={isChangePasswordLoading}
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
            .required(i18n._(t`กรุณากรอกยืนยันรหัสผ่านใหม่`)),
        })}
        onSubmit={(values) => {
          changePassword?.({
            id: adminId,
            password: values.password,
          })
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
                placeholder={i18n._(t`กรอกรหัสผ่านใหม่`)}
                onChange={formik.handleChange}
                value={formik.values.password}
                error={getErrorWithTouched(formik, 'password')}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">{i18n._(t`ยืนยันรหัสผ่านใหม่`)}</label>
              <Input.Password
                id="confirmPassword"
                name="confirmPassword"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกยืนยันรหัสผ่านใหม่อีกครั้ง`)}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                error={getErrorWithTouched(formik, 'confirmPassword')}
              />
            </div>
            <Button type="submit" variant="success" className={clsx('w-full')}>
              {i18n._(t`บันทึก`)}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default AdminChangePasswordModal
