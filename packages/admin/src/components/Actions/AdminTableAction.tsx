import type { FC } from 'react'
import { useMemo, useState, Fragment } from 'react'

import clsx from 'clsx'
import { ConfirmModal, SvgIcon } from '@olufy-frontend/shared/UI'
import { Menu } from '@headlessui/react'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { IoLockClosedOutline } from 'react-icons/io5'
import { DropdownDivider } from '@olufy-frontend/shared/UI/Dropdown'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { UserService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import MoreDropdown from '../Dropdowns/MoreDropdown'
import AdminChangePasswordModal from '../Modals/Admin/ChangePassword'

import type { ISimpleUser } from '@/types/modules/user'
import { UserFlag } from '@/enums'

interface IAdminTableActionProps {
  data: ISimpleUser
  onRefetch?: VoidFunction
}

const AdminTableAction: FC<IAdminTableActionProps> = ({ data: { id, nameEn, flag }, onRefetch }) => {
  const { i18n } = useLingui()

  // _State
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [banId, setBanId] = useState<number | null>(null)
  const [passwordId, setPasswordId] = useState<number | null>(null)

  // _Memo
  const isBanned = useMemo(() => flag === UserFlag.SUSPENDED, [flag])

  // _Mutation
  const { mutate: changeStatus, isLoading: isChangeStatusLoading } = useMutation(
    (payload: { id: number; flag: UserFlag }) => UserService.changeStatus(payload),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        toast.success(i18n._(t`ทำรายการสำเร็จ`))
        setBanId?.(null)
        onRefetch?.()
      },
    },
  )

  const { mutate: deleteUser, isLoading: isDeleteUserLoading } = useMutation((id: number) => UserService.delete(id), {
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
    },
    onSuccess: () => {
      toast.success(i18n._(t`ทำรายการสำเร็จ`))
      setDeleteId?.(null)
      onRefetch?.()
    },
  })

  return (
    <Fragment>
      <MoreDropdown
        items={
          <Fragment>
            <Menu.Item>
              <button className={clsx(`dropdown-dialog-item !min-h-0 !w-full`)} onClick={() => setBanId(id)}>
                <SvgIcon name="switch" className={clsx(`square-6`)} />
                <span>{isBanned ? i18n._(t`เปิดการใช้งาน`) : i18n._(t`ระงับการใช้งาน`)}</span>
              </button>
            </Menu.Item>
            {!isBanned && (
              <Menu.Item>
                <a href={`/app/admin/${id}`} className={clsx(`dropdown-dialog-item !min-h-0 !w-full`)}>
                  <SvgIcon name="edit" className={clsx(`square-6`)} />
                  <span>{i18n._(t`แก้ไข`)}</span>
                </a>
              </Menu.Item>
            )}
            {!isBanned && (
              <Menu.Item>
                <button className={clsx(`dropdown-dialog-item !min-h-0 !w-full`)} onClick={() => setPasswordId(id)}>
                  <IoLockClosedOutline className={clsx(`square-6`)} />
                  <span>{i18n._(t`แก้ไขรหัสผ่าน`)}</span>
                </button>
              </Menu.Item>
            )}
            <DropdownDivider />
            <Menu.Item>
              <button className={clsx(`dropdown-dialog-item !min-h-0 !w-full`)} onClick={() => setDeleteId(id)}>
                <SvgIcon name="delete" className={clsx(`square-6`)} />
                <span>{i18n._(t`ลบ`)}</span>
              </button>
            </Menu.Item>
          </Fragment>
        }
      />

      {/* Confirm Ban */}
      <ConfirmModal
        visible={!!banId}
        title={isBanned ? i18n._(t`ยืนยันเปิดการใช้งาน`) : i18n._(t`ยืนยันระงับการใช้งาน`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ยืนยัน`)}
        onConfirm={() => {
          if (isBanned) {
            changeStatus({
              id: banId,
              flag: UserFlag.ACTIVE,
            })
            return
          }

          changeStatus({
            id: banId,
            flag: UserFlag.SUSPENDED,
          })
        }}
        onCancel={() => {
          setBanId(null)
        }}
        closeModal={() => {
          setBanId(null)
        }}
        isLoading={isChangeStatusLoading}
      >
        <p>
          {isBanned ? (
            <Trans>
              คุณต้องการเปิดการใช้งาน <strong className={clsx(`underline`)}>{nameEn}</strong> ?
            </Trans>
          ) : (
            <Trans>
              คุณต้องการระงับการใช้งาน <strong className={clsx(`underline`)}>{nameEn}</strong> ?
            </Trans>
          )}
        </p>
      </ConfirmModal>

      {/* Confirm Delete */}
      <ConfirmModal
        visible={!!deleteId}
        title={i18n._(t`ยืนยันการลบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ลบ`)}
        onConfirm={() => {
          deleteUser(deleteId)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        isLoading={isDeleteUserLoading}
      >
        <p>
          <Trans>
            คุณต้องการลบ <strong className={clsx(`underline`)}>{nameEn}</strong> ?
          </Trans>
        </p>
      </ConfirmModal>

      <AdminChangePasswordModal
        adminId={id}
        visible={!!passwordId}
        closeModal={() => setPasswordId(null)}
        onSuccess={() => setPasswordId(null)}
      />
    </Fragment>
  )
}

export default AdminTableAction
