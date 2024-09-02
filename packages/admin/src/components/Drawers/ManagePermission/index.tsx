import type { FC } from 'react'
import { useEffect, Fragment, useMemo, useState } from 'react'

import { Button, ConfirmModal, Divider, Drawer, Input, SvgIcon, Switch } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { Form, Formik } from 'formik'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'
import type { IDrawerProps } from '@olufy-frontend/shared/UI/Drawer'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { RoleService } from '@/services'
import { useUserStore } from '@/stores/user'
import { GET_PERMISSIONS } from '@/constants/permission'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { RolePermission } from '@/enums/role'
import type { IRole, IManageRole } from '@/types/modules/role'

interface IManagePermissionDrawerProps extends IDrawerProps {
  currentSelectedRoleId?: number | string
}

const ManagePermissionDrawer: FC<IManagePermissionDrawerProps> = ({
  currentSelectedRoleId,
  closeDrawer,
  visible,
  ...props
}) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()

  // _State
  const [show, setShow] = useState(false)
  const [selectedId, setSelectedId] = useState<number | string | null>(currentSelectedRoleId ?? null)
  const [selectedDelete, setSelectedDelete] = useState<IRole | null>(null)

  // _Memo
  const isCreate = useMemo(() => selectedId === 0, [selectedId])

  // _Query
  const {
    data: roles,
    isLoading: isRolesLoading,
    refetch: rolesRefetch,
  } = useQuery(['get-roles-list'], ({ signal }) => RoleService.list({ signal }), {
    enabled: !!profile,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const {
    data: roleSelected,
    isLoading: isRoleSelectedLoading,
    refetch: roleSelectedRefetch,
  } = useQuery(
    ['get-role', selectedId],
    ({ signal }) => {
      if (!selectedId || isCreate) return null
      return RoleService.byId(selectedId, { signal })
    },
    {
      enabled: !!profile,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  )

  // _Mutation
  const { mutate: createRole, isLoading: isCreateLoading } = useMutation(
    (payload: IManageRole) => RoleService.create(payload),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: (res) => {
        toast.success(i18n._(t`ทำรายการสำเร็จ`))
        rolesRefetch()
        setSelectedId(res.id)
      },
    },
  )

  const {
    data: updateData,
    mutate: updateRole,
    isLoading: isUpdateLoading,
  } = useMutation((payload: IManageRole) => RoleService.update(payload), {
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
    },
    onSuccess: () => {
      toast.success(i18n._(t`ทำรายการสำเร็จ`))
      rolesRefetch()
    },
  })

  const { mutate: deleteRole, isLoading: isDeleteRoleLoading } = useMutation((id: number) => RoleService.delete(id), {
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
    },
    onSuccess: () => {
      toast.success(i18n._(t`ทำรายการสำเร็จ`))
      rolesRefetch()
      setSelectedDelete(null)
      setSelectedId(null)
    },
  })

  // _Events
  const onClose = () => {
    closeDrawer?.()
    setSelectedId(null)
  }

  // _Effect
  useEffect(() => {
    if (visible) setSelectedId(currentSelectedRoleId)
  }, [visible, currentSelectedRoleId])

  return (
    <Fragment>
      <Drawer
        visible={visible}
        closeDrawer={onClose}
        dialogPanelClassName={clsx(`w-[687px] p-4`)}
        isLoading={isRolesLoading || isRoleSelectedLoading || isCreateLoading || isUpdateLoading}
        {...props}
      >
        <div className={clsx(`flex items-center space-x-2`)}>
          <Button
            variant="primary-solid"
            size="medium"
            isInvert
            buttonType="icon"
            className={clsx(`!hidden`, `sm:!inline-flex`)}
            onClick={() => setShow(true)}
          >
            <SvgIcon name="menu" className={clsx(`!square-8`)} />
          </Button>
          <div className={clsx(`text-header-3`)}>{i18n._(t`จัดการเข้าถึง`)}</div>
        </div>
        <Divider className={clsx(`mt-3`)} />
        <div className={clsx(`mt-2 flex flex-1`)}>
          {/* Overlay */}
          <div
            className={clsx(`absolute inset-0 z-20 hidden bg-black/20`, {
              'sm:block': show,
            })}
            onClick={() => setShow(false)}
          ></div>

          {/* Tabs */}
          <div
            className={clsx(
              `h-full w-[194px] space-y-2 overflow-x-hidden rounded-lg bg-dark-400 p-2`,
              `sm:absolute sm:left-0 sm:top-0 sm:z-20 sm:rounded-l-none`,
              {
                'sm:hidden': !show,
              },
            )}
          >
            <Button
              variant="primary-solid"
              size="medium"
              buttonType="icon-text"
              isOutline
              className={clsx(
                `w-full !bg-transparent hover:!bg-primary-500 sm:hover:!bg-transparent sm:hover:!text-primary-500`,
                {
                  '!bg-primary-500 !text-white-900': isCreate,
                },
              )}
              onClick={() => {
                setSelectedId(0)
                roleSelectedRefetch()
              }}
            >
              <SvgIcon name="plus-circle" />
              <span>{i18n._(t`เพิ่มการเข้าถึง`)}</span>
            </Button>

            {roles?.map((role) => (
              <Button
                key={`role-${role.id}`}
                variant="primary-solid"
                size="medium"
                className={clsx(`w-full justify-start truncate text-left`)}
                isInvert={role.id !== Number(selectedId)}
                onClick={() => setSelectedId(role.id)}
              >
                <span className={clsx(`truncate`)}>{role.name}</span>
              </Button>
            ))}
          </div>

          {/* Tab Panel */}
          {(roleSelected || isCreate) && (
            <Formik
              initialValues={updateData ? updateData : roleSelected ?? { id: 0, name: '', rolePermissions: [] }}
              enableReinitialize={!!roleSelected || isCreate || !!updateData}
              onSubmit={(values) => {
                if (values.id === 0) {
                  createRole({
                    name: values.name,
                    permissions: values.rolePermissions,
                  })
                  return
                }

                updateRole({
                  id: values.id,
                  name: values.name,
                  permissions: values.rolePermissions,
                })
              }}
            >
              {(formik) => (
                <Form className={clsx(`ml-4 flex-1`, `sm:ml-0`)}>
                  <div className={clsx(`flex items-center justify-end space-x-2`)}>
                    {!isCreate && (
                      <Button
                        variant="error"
                        size="medium"
                        type="button"
                        onClick={() => setSelectedDelete(roleSelected)}
                      >
                        {i18n._(t`ลบ`)}
                      </Button>
                    )}
                    <Button variant="success" size="medium" type="submit" disabled={!formik.dirty}>
                      {isCreate ? i18n._(t`เพิ่ม`) : i18n._(t`บันทึก`)}
                    </Button>
                  </div>

                  <div className={clsx(`mt-3`)}>
                    <label htmlFor="name">{i18n._(t`ชื่อ Role`)}</label>
                    <Input
                      id="name"
                      name="name"
                      className={clsx(`mt-2`)}
                      placeholder={i18n._(t`กรอกชื่อ Role`)}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      error={getErrorWithTouched(formik, 'name')}
                    />
                  </div>

                  <div className={clsx(`mt-6 grid grid-cols-2 gap-3`)}>
                    {Object.entries(GET_PERMISSIONS())
                      .filter(([_, v]) => v.isDbAvailable)
                      .map(([key, permission]) => {
                        const permissionKey = key as RolePermission
                        return (
                          <Switch
                            key={key}
                            variant="success"
                            checked={formik.values.rolePermissions.includes(permissionKey)}
                            onChange={(e) => {
                              if (e) formik.setFieldValue('rolePermissions', [...formik.values.rolePermissions, key])
                              else
                                formik.setFieldValue(
                                  'rolePermissions',
                                  formik.values.rolePermissions.filter((p) => p !== key),
                                )
                            }}
                            label={permission?.name ?? key}
                          />
                        )
                      })}
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </Drawer>

      <ConfirmModal
        visible={!!selectedDelete}
        title={i18n._(t`ยืนยันการลบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ลบ`)}
        onConfirm={() => {
          deleteRole(selectedDelete?.id)
        }}
        onCancel={() => {
          setSelectedDelete(null)
        }}
        closeModal={() => {
          setSelectedDelete(null)
        }}
        isLoading={isDeleteRoleLoading}
      >
        <p>
          <Trans>
            คุณต้องการลบ <strong className={clsx(`underline`)}>{selectedDelete?.name}</strong> ?
          </Trans>
        </p>
      </ConfirmModal>
    </Fragment>
  )
}

export default ManagePermissionDrawer
