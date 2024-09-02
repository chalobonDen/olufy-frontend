import type { FC } from 'react'
import { useState, useMemo, Fragment } from 'react'

import { useFormik } from 'formik'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Button, Input } from '@olufy-frontend/shared/UI'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'
import * as yup from 'yup'
import { useQuery } from '@tanstack/react-query'

import ManagePermissionDrawer from '@/components/Drawers/ManagePermission'
import AdminChangePasswordModal from '@/components/Modals/Admin/ChangePassword'
import { RoleService } from '@/services'
import { useUserStore } from '@/stores/user'
import { validateFieldPassword } from '@/utils'

import type { IManageUser } from '@/types/modules/user'

interface IManageAdminFormProps {
  data?: IManageUser
  onSubmit?: (payload: IManageUser) => void
}

const defaultSuffixEmail = `@olufy.com`

const ManageAdminForm: FC<IManageAdminFormProps> = ({ data, onSubmit }) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const isEdit = !!data

  const defaultSchema = {
    name: yup.string().required(t`กรุณากรอกชื่อ - นามสกุล`),
    permissionId: yup.string().required(t`กรุณาเลือกตำแหน่ง`),
    email: yup
      .string()
      .matches(/^[a-z0-9\s]+$/, 'กรอกได้เฉพาะตัวอักษร a-z และตัวเลข 0-9 เท่านั้น')
      .required(t`กรุณากรอกอีเมล`),
  }

  const validationSchema = yup.object().shape({
    ...defaultSchema,
    password: validateFieldPassword,
  })

  const editValidationSchema = yup.object().shape({
    ...defaultSchema,
  })

  // _State
  const [managePermissionVisible, setManagePermissionVisible] = useState(false)
  const [changePasswordId, setChangePasswordId] = useState<number | null>(null)

  // _Query
  const { data: roles, isLoading: isRolesLoading } = useQuery(
    ['get-roles-list'],
    ({ signal }) => RoleService.list({ signal }),
    {
      enabled: !!profile,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  )

  // _Memo
  const initialValues = useMemo(() => {
    if (!data) {
      return { email: '', name: '', password: '', permissionId: '' } as IManageUser
    }

    return data
  }, [data])

  // _Formik
  const formik = useFormik({
    initialValues,
    validationSchema: isEdit ? editValidationSchema : validationSchema,
    enableReinitialize: !!data,
    onSubmit: (values) =>
      onSubmit?.({
        ...values,
        email: values.email + defaultSuffixEmail,
        permissionId: Number(values.permissionId),
      }),
  })

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        {/* ข้อมูลแอดมิน */}
        <h4 className={clsx(`text-header-4`)}>{i18n._(t`ข้อมูลแอดมิน`)}</h4>
        <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <label htmlFor="name">{i18n._(t`ชื่อ - นามสกุล`)}</label>
            <Input
              id="name"
              name="name"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอกชื่อ - นามสกุล`)}
              onChange={formik.handleChange}
              value={formik.values.name}
              error={getErrorWithTouched(formik, 'name')}
            />
          </div>

          <div>
            <div className={clsx(`flex items-center justify-between`)}>
              <label htmlFor="name">{i18n._(t`ตำแหน่ง`)}</label>
              <a
                href="#"
                className={clsx(`text-primary-500 underline`)}
                onClick={() => {
                  formik.setFieldValue('role', '')
                  setManagePermissionVisible(true)
                }}
              >
                {i18n._(t`จัดการเข้าถึง`)}
              </a>
            </div>
            <Input.Select
              id="permissionId"
              name="permissionId"
              className={clsx(`mt-2`)}
              onChange={formik.handleChange}
              value={formik.values.permissionId}
              error={getErrorWithTouched(formik, 'permissionId')}
              disabled={isRolesLoading}
            >
              <option value="" disabled>
                {i18n._(t`เลือกตำแหน่ง`)}
              </option>
              {roles?.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Input.Select>
          </div>
        </div>

        {/* ข้อมูลการเข้าสู่ระบบ */}
        <h4 className={clsx(`mt-6 text-header-4`)}>{i18n._(t`ข้อมูลการเข้าสู่ระบบ`)}</h4>
        <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <label htmlFor="email">{i18n._(t`อีเมล`)}</label>
            <Input
              id="email"
              name="email"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอกอีเมล`)}
              onChange={formik.handleChange}
              value={formik.values.email}
              error={getErrorWithTouched(formik, 'email')}
              suffix={<span>{defaultSuffixEmail}</span>}
            />
          </div>

          <div>
            <label htmlFor="password">{i18n._(t`รหัสผ่าน`)}</label>
            {isEdit ? (
              <Button
                variant="primary-solid"
                size="medium"
                className={clsx(`mt-2 flex h-[42px] w-full`)}
                onClick={() => setChangePasswordId(data?.id)}
              >
                <span>{i18n._(t`แก้ไขรหัสผ่าน`)}</span>
              </Button>
            ) : (
              <Input.Password
                id="password"
                name="password"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอกรหัสผ่าน`)}
                onChange={formik.handleChange}
                value={formik.values.password}
                error={getErrorWithTouched(formik, 'password')}
              />
            )}
          </div>
        </div>

        <div className={clsx(`mt-8 flex justify-end space-x-4`)}>
          <Button as="a" href="/app/admin" variant="danger" size="medium" type="button" className={clsx(`flex-1`)}>
            <span>{i18n._(t`ยกเลิก`)}</span>
          </Button>
          <Button variant="success" size="medium" type="submit" disabled={!formik.dirty} className={clsx(`flex-1`)}>
            <span>{isEdit ? i18n._(t`บันทึก`) : i18n._(t`เพิ่มแอดมิน`)}</span>
          </Button>
        </div>
      </form>

      <ManagePermissionDrawer
        visible={managePermissionVisible}
        currentSelectedRoleId={formik.values.permissionId}
        closeDrawer={() => {
          setManagePermissionVisible(false)
        }}
      />
      {isEdit && (
        <AdminChangePasswordModal
          adminId={changePasswordId}
          visible={!!changePasswordId}
          closeModal={() => setChangePasswordId(null)}
          onSuccess={() => setChangePasswordId(null)}
        />
      )}
    </Fragment>
  )
}

export default ManageAdminForm
